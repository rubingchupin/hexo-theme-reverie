'use strict'

/**
 * Reverie 内置复制版权提示
 * 由主题核心注入（原为 _config.reverie.yml inject 手动导入）
 * 资源：/css/toastr.min.css、/js/copy.js
 * 开关：copy.enable
 */

const urlFor = (hexo, str) => require('hexo-util').url_for.call(hexo, str)
const { bundleEnabled } = require('../common/asset-bundle')

hexo.extend.filter.register('after_generate', function () {
  const config = hexo.theme.config.copy
  if (!config || !config.enable) return

  const toastr_css = config.toastr_css ? urlFor(hexo, config.toastr_css) : '/css/toastr.min.css'
  const copy_js = config.copy_js ? urlFor(hexo, config.copy_js) : '/js/copy.js'

  if (!bundleEnabled(hexo, 'css')) {
    hexo.extend.injector.register('head_end', `<link rel="stylesheet" href="${toastr_css}">`, 'default')
  }
  if (!bundleEnabled(hexo, 'js')) {
    hexo.extend.injector.register('body_end', `<script src="${copy_js}" defer></script>`, 'default')
  }
})