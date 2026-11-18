'use strict'

/**
 * Reverie 内置全站悬浮播放器
 * 由主题核心注入（原为 _config.reverie.yml inject 手动导入）
 * 资源：/js/music_float.js
 * 开关：music_float.enable
 */

const urlFor = (hexo, str) => require('hexo-util').url_for.call(hexo, str)
const { bundleEnabled } = require('../common/asset-bundle')

hexo.extend.filter.register('after_generate', function () {
  const config = hexo.theme.config.music_float
  if (!config || !config.enable) return

  if (bundleEnabled(hexo, 'js')) return

  const js = config.js ? urlFor(hexo, config.js) : '/js/music_float.js'

  hexo.extend.injector.register('body_end', `<script src="${js}" defer></script>`, 'default')
})