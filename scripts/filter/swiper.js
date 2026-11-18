'use strict'

/**
 * Reverie 内置首页轮播（源自 hexo-butterfly-swiper）
 * 上游插件原作者：https://github.com/Akilarlxh/hexo-butterfly-swiper
 * 已嵌入主题核心，逻辑与上游一致，资源由主题本地/CDN 提供。
 */

const urlFor = (hexo, str) => require('hexo-util').url_for.call(hexo, str)
const { bundleEnabled } = require('../common/asset-bundle')

hexo.extend.filter.register('after_generate', function () {
  const posts_list = hexo.locals.get('posts').data
  const swiper_list = []
  for (const item of posts_list) {
    if (item.swiper_index) swiper_list.push(item)
  }
  function sortNumber (a, b) { return a.swiper_index - b.swiper_index }
  swiper_list.sort(sortNumber).reverse()

  const config = hexo.config.swiper || hexo.theme.config.swiper
  if (!(config && config.enable)) return

  const data = {
    pjaxenable: hexo.theme.config.pjax.enable,
    enable_page: config.enable_page || 'all',
    exclude: config.exclude,
    timemode: config.timemode || 'date',
    layout_type: config.layout.type,
    layout_name: config.layout.name,
    layout_index: config.layout.index || 0,
    error_img: config.error_img ? urlFor(hexo, config.error_img) : 'https://unpkg.zhimg.com/akilar-candyassets/image/loading.gif',
    insertposition: config.insertposition || 'afterbegin',
    swiper_list,
    default_descr: config.default_descr || '再怎么看我也不知道怎么描述它的啦！',
    swiper_css: config.swiper_css ? urlFor(hexo, config.swiper_css) : '/css/swiper.min.css',
    swiper_js: config.swiper_js ? urlFor(hexo, config.swiper_js) : '/js/swiper.min.js',
    custom_css: config.custom_css ? urlFor(hexo, config.custom_css) : '/css/swiperstyle.css',
    custom_js: config.custom_js ? urlFor(hexo, config.custom_js) : '/js/swiper_init.js'
  }

  function renderItem (item) {
    const target = data.pjaxenable
      ? `pjax.loadUrl("${item.path}")`
      : `location.href='${item.path}'`
    const href = data.pjaxenable ? 'javascript:void(0);' : item.path
    const code = data.timemode === 'updated'
      ? item.updated.format('YYYY-MM-DD')
      : item.date.format('YYYY-MM-DD')
    const text = item.description ? item.description : data.default_descr
    return `
      <div class="blog-slider__item swiper-slide" style="width: 750px; opacity: 1; transform: translate3d(0px, 0px, 0px); transition-duration: 0ms;">
        <a class="blog-slider__img" onclick="${target}" href="${href}" alt="">
          <img width="48" height="48" src="${item.cover}" alt="" onerror="this.src=${data.error_img}; this.onerror = null;">
        </a>
        <div class="blog-slider__content">
          <span class="blog-slider__code">${code}</span>
          <a class="blog-slider__title" onclick="${target}" href="${href}" alt="">${item.title}</a>
          <div class="blog-slider__text">${text}</div>
          <a class="blog-slider__button" onclick="${target}" href="${href}" alt="">详情</a>
        </div>
      </div>`
  }

  const items_html = data.swiper_list.map(renderItem).join('\n')
  const temple_html = `
    <div class="recent-post-item" style="height: auto;width: 100%">
      <div id="swiper_container" class="blog-slider swiper-container-fade swiper-container-horizontal">
        <div class="blog-slider__wrp swiper-wrapper" style="transition-duration: 0ms;">
          ${items_html}
        </div>
        <div class="blog-slider__pagination swiper-pagination-clickable swiper-pagination-bullets"></div>
      </div>
    </div>`

  const css_text = `<link rel="stylesheet" href="${data.swiper_css}" media="print" onload="this.media='all'"><link rel="stylesheet" href="${data.custom_css}" media="print" onload="this.media='all'">`
  const js_text = `<script src="${data.swiper_js}"></script><script src="${data.custom_js}"></script>`

  const bundleCss = bundleEnabled(hexo, 'css')
  const bundleJs = bundleEnabled(hexo, 'js')

  let get_layout
  if (data.layout_type === 'class') {
    get_layout = `document.getElementsByClassName('${data.layout_name}')[${data.layout_index}]`
  } else {
    get_layout = `document.getElementById('${data.layout_name}')`
  }

  if (data.enable_page === 'all') {
    const mount_js = `<script data-pjax>
      function butterfly_swiper_injector_config(){
        var parent_div = ${get_layout};
        if(!parent_div) return;
        var item_html = \`${temple_html}\`;
        parent_div.insertAdjacentHTML("${data.insertposition}", item_html);
      }
      if(${get_layout}){ butterfly_swiper_injector_config(); }
    </script>`
    hexo.extend.injector.register('body_end', mount_js, 'default')
  } else {
    const mount_js = `<script data-pjax>
      function butterfly_swiper_injector_config(){
        var parent_div = ${get_layout};
        if(!parent_div) return;
        var item_html = \`${temple_html}\`;
        parent_div.insertAdjacentHTML("${data.insertposition}", item_html);
      }
      if( ${get_layout} && (location.pathname ==='${data.enable_page}') ){ butterfly_swiper_injector_config(); }
    </script>`
    hexo.extend.injector.register('body_end', mount_js, 'default')
  }

  if (!bundleCss) hexo.extend.injector.register('head_end', css_text, 'default')
  if (!bundleJs) hexo.extend.injector.register('body_end', js_text, 'default')
})