'use strict'

/**
 * Reverie 内置分类卡片（源自 hexo-butterfly-categories-card）
 * 上游插件原作者：https://github.com/Akilarlxh/hexo-butterfly-categories-card
 * 已嵌入主题核心，逻辑与上游一致，资源由主题本地/CDN 提供。
 */

const urlFor = (hexo, str) => require('hexo-util').url_for.call(hexo, str)

hexo.extend.filter.register('after_generate', function () {
  const config = hexo.config.categoryBar || hexo.theme.config.categoryBar
  if (!(config && config.enable)) return

  const categories_list = hexo.locals.get('categories').data
  const categories_message = config.message
  const new_categories_list = []
  for (let i = 0; i < categories_list.length; i++) {
    const a = categories_list[i]
    const b = categories_message[i]
    new_categories_list[i] = Object.assign(a, b)
  }

  const data = {
    pjaxenable: hexo.theme.config.pjax.enable,
    enable_page: config.enable_page || '/',
    layout_type: config.layout.type,
    layout_name: config.layout.name,
    layout_index: config.layout.index || 0,
    categories_list: new_categories_list,
    column: config.column || 'odd',
    row: config.row || 2,
    custom_css: config.custom_css ? urlFor(hexo, config.custom_css) : '/css/categorybar.css'
  }

  const prow = 190 * data.row + 'px'
  const mrow = 160 * data.row + 'px'
  const colWidth = data.column === 'even' ? '24%' : '32.3%'

  function renderItem (cl) {
    const target = data.pjaxenable
      ? `pjax.loadUrl("${cl.path}")`
      : `location.href='${cl.path}'`
    return `
      <li class="categoryBar-list-item" style="background:url(${cl.cover});" onclick="${target}">
        <a class="categoryBar-list-link" href="javascript:void(0);" style="pointer-events:none;">${cl.name}</a>
        <span class="categoryBar-list-count">${cl.length}</span>
        <span class="categoryBar-list-descr">${cl.descr}</span>
      </li>`
  }

  const items_html = data.categories_list.map(renderItem).join('\n')
  const temple_html = `
    <style>
      li.categoryBar-list-item{width:${colWidth};}.categoryBar-list{max-height: ${prow};overflow:auto;}.categoryBar-list::-webkit-scrollbar{width:0!important}@media screen and (max-width: 650px){.categoryBar-list{max-height: ${mrow};}}
    </style>
    <div class="recent-post-item" style="height:auto;width:100%;padding:0px;">
      <div id="categoryBar">
        <ul class="categoryBar-list">
          ${items_html}
        </ul>
      </div>
    </div>`

  const css_text = `<link rel="stylesheet" href="${data.custom_css}">`

  let get_layout
  if (data.layout_type === 'class') {
    get_layout = `document.getElementsByClassName('${data.layout_name}')[${data.layout_index}]`
  } else if (data.layout_type === 'id') {
    get_layout = `document.getElementById('${data.layout_name}')`
  } else {
    get_layout = `document.getElementById('${data.layout_name}')`
  }

  const user_info_js = `<script data-pjax>
    function butterfly_categories_card_injector_config(){
      var parent_div = ${get_layout};
      if(!parent_div) return;
      var item_html = \`${temple_html}\`;
      console.log('已挂载butterfly_categories_card');
      parent_div.insertAdjacentHTML("afterbegin", item_html);
    }
    if( ${get_layout} && (location.pathname ==='${data.enable_page}'|| '${data.enable_page}' ==='all') ){
      butterfly_categories_card_injector_config()
    }
  </script>`

  hexo.extend.injector.register('body_end', user_info_js, 'default')
  hexo.extend.injector.register('head_end', css_text, 'default')
})

hexo.extend.helper.register('priority', function () {
  const pre_priority = (hexo.config.categoryBar && hexo.config.categoryBar.priority) || (hexo.theme.config.categoryBar && hexo.theme.config.categoryBar.priority)
  return pre_priority || 10
})