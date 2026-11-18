'use strict'

/**
 * Reverie 内置滚动动画（源自 hexo-butterfly-wowjs）
 * 上游插件原作者：https://github.com/Akilarlxh/hexo-butterfly-wowjs
 * 已嵌入主题核心，逻辑与上游一致，资源由主题本地/CDN 提供。
 */

const urlFor = (hexo, str) => require('hexo-util').url_for.call(hexo, str)
const util = require('hexo-util')
const { bundleEnabled } = require('../common/asset-bundle')

hexo.extend.filter.register('after_generate', function () {
  const config = hexo.config.wowjs || hexo.theme.config.wowjs
  if (!(config && config.enable)) return

  const bundleJs = bundleEnabled(hexo, 'js')
  const bundleCss = bundleEnabled(hexo, 'css')

  const animateitem = config.animateitem || []
  let animate_script = ''
  animateitem.forEach(item => {
    animate_script += `
      var arr = document.getElementsByClassName('${item.class}');
      for(var i = 0;i<arr.length;i++){
        arr[i].classList.add('wow');
        arr[i].classList.add('${item.style}');
        arr[i].setAttribute('data-wow-duration', '${item.duration}');
        arr[i].setAttribute('data-wow-delay', '${item.delay}');
        arr[i].setAttribute('data-wow-offset', '${item.offset}');
        arr[i].setAttribute('data-wow-iteration', '${item.iteration}');
      }`
  })

  const animate_css = config.animate_css ? urlFor(hexo, config.animate_css) : '/css/animate.min.css'
  const wow_js = config.wow_js ? urlFor(hexo, config.wow_js) : '/js/wow.min.js'
  const wow_init_js = config.wow_init_js ? urlFor(hexo, config.wow_init_js) : '/js/wow_init.js'

  const wow_css = `<link rel="stylesheet" href="${animate_css}" media="print" onload="this.media='all'">`
  const wow_js_head = `<script src="${wow_js}"></script>`
  // 移动端是否启用
  const mobile = config.mobile
  let wow_script
  if (mobile === false || mobile === undefined) {
    wow_script = `<script>
      if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        ${animate_script}
      }
    </script>`
  } else {
    wow_script = `<script>${animate_script}</script>`
  }
  const wow_js_bottom = `<script src="${wow_init_js}"></script>`

  const headContent = [bundleCss ? '' : wow_css, bundleJs ? '' : wow_js_head].join('')
  const bottomContent = [wow_script, bundleJs ? '' : wow_js_bottom].join('')
  if (headContent) hexo.extend.injector.register('head_end', headContent, 'default')
  if (bottomContent) hexo.extend.injector.register('body_end', bottomContent, 'default')
})

// wow 标签外挂
hexo.extend.tag.register('wow', (args, content) => {
  const p0 = args[0] ? args[0].trim() : ''
  const p1 = args[1] ? args[1].trim() : ''
  const p2 = args[2] ? args[2].trim() : ''
  const p3 = args[3] ? args[3].trim() : ''
  const p4 = args[4] ? args[4].trim() : ''
  return `<div class='wow ${p0}' data-wow-duration='${p1}' data-wow-delay='${p2}' data-wow-offset='${p3}' data-wow-iteration='${p4}'>${hexo.render.renderSync({ text: content, engine: 'markdown' })}</div>`
}, { ends: true })