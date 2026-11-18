'use strict'

/**
 * Reverie 内置资源集成打包
 * 将主题本地功能脚本/样式合并为少量文件，减少请求数量：
 *   JS  → /js/reverie.bundle.js   （defer，置于页面底部一次性加载）
 *   CSS → /css/reverie.bundle.css （media=print 懒加载，不阻塞渲染）
 * 打包成员与各功能过滤器按同一「开关判断」决定，
 * 打包开启时，各功能过滤器不再单独注入对应资源。
 * 开关：asset_bundle.enable / asset_bundle.js / asset_bundle.css
 */

const path = require('path')
const { readFileSync, writeFileSync, mkdirSync } = require('fs')
const { url_for } = require('hexo-util')

hexo.extend.filter.register('after_generate', function () {
  const config = hexo.theme.config.asset_bundle
  if (!config || !config.enable) return

  const theme = hexo.theme.config
  const global = hexo.config

  // 与各功能过滤器保持一致的功能开关判断
  const getFeature = (globalKey, themeKey) => {
    const item = global[globalKey] || theme[themeKey]
    return !!(item && item.enable)
  }
  const wowEnabled = getFeature('wowjs', 'wowjs')
  const swiperEnabled = getFeature('swiper', 'swiper')
  const categoryEnabled = getFeature('categoryBar', 'categoryBar')
  const calendarEnabled = !!(theme.aside && theme.aside.card_calendar && theme.aside.card_calendar.enable)
  const copyEnabled = !!(theme.copy && theme.copy.enable)
  const musicEnabled = !!(theme.music_float && theme.music_float.enable)
  const navEnabled = !!(theme.nav && theme.nav.scroll_show_title)

  // 打包成员与依赖顺序（库在前，初始化脚本在后）
  const jsFiles = []
  if (calendarEnabled) jsFiles.push('js/jquery.min.js', 'js/languages.js', 'js/calendar.js')
  if (wowEnabled) jsFiles.push('js/wow.min.js', 'js/wow_init.js')
  if (swiperEnabled) jsFiles.push('js/swiper.min.js', 'js/swiper_init.js')
  if (copyEnabled) jsFiles.push('js/copy.js')
  if (musicEnabled) jsFiles.push('js/music_float.js')
  if (navEnabled) jsFiles.push('js/nav.js')

  const cssFiles = []
  if (categoryEnabled) cssFiles.push('css/categorybar.css')
  if (copyEnabled) cssFiles.push('css/toastr.min.css')
  if (wowEnabled) cssFiles.push('css/animate.min.css')
  if (swiperEnabled) cssFiles.push('css/swiper.min.css', 'css/swiperstyle.css')

  const sourceRoot = path.join(hexo.theme_dir, 'source')
  const readSource = rel => readFileSync(path.join(sourceRoot, rel), 'utf8')

  if (config.js && jsFiles.length) {
    const content = jsFiles
      .map(file => `/* reverie bundle: ${file} */\n${readSource(file)}`)
      .join('\n;\n')
    const outPath = path.resolve(hexo.base_dir, hexo.config.public_dir, 'js', 'reverie.bundle.js')
    mkdirSync(path.dirname(outPath), { recursive: true })
    writeFileSync(outPath, content)
    hexo.extend.injector.register(
      'body_end',
      `<script defer src="${url_for.call(hexo, '/js/reverie.bundle.js')}"></script>`,
      'default'
    )
  }

  if (config.css && cssFiles.length) {
    const content = cssFiles
      .map(file => `/* reverie bundle: ${file} */\n${readSource(file)}`)
      .join('\n')
    const outPath = path.resolve(hexo.base_dir, hexo.config.public_dir, 'css', 'reverie.bundle.css')
    mkdirSync(path.dirname(outPath), { recursive: true })
    writeFileSync(outPath, content)
    hexo.extend.injector.register(
      'head_end',
      `<link rel="stylesheet" href="${url_for.call(hexo, '/css/reverie.bundle.css')}" media="print" onload="this.media='all'">`,
      'default'
    )
  }
})