'use strict'

/**
 * Reverie 内置导航栏滚动标题
 * 由主题核心注入（原为 _config.reverie.yml inject 手动导入）
 * 资源：/js/nav.js（依赖导航栏 #page-name 元素）
 * 开关：nav.scroll_show_title
 */

const urlFor = (hexo, str) => require('hexo-util').url_for.call(hexo, str)
const { bundleEnabled } = require('../common/asset-bundle')

hexo.extend.filter.register('after_generate', function () {
  const config = hexo.theme.config.nav
  if (!config || !config.scroll_show_title) return

  if (bundleEnabled(hexo, 'js')) return

  const js = config.nav_js ? urlFor(hexo, config.nav_js) : '/js/nav.js'

  hexo.extend.injector.register('body_end', `<script src="${js}" defer></script>`, 'default')
})