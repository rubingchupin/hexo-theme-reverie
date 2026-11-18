'use strict'

/**
 * Reverie 内置字体预加载
 * 由主题核心注入（原为 _config.reverie.yml inject 手动导入）
 * 依据 font.preload 声明的字体文件 URL 自动生成 <link rel="preload">
 */

hexo.extend.filter.register('after_generate', function () {
  const font = hexo.theme.config.font
  const preloads = font && font.preload
  if (!preloads || !preloads.length) return

  const links = preloads
    .map(url => `<link rel="preload" href="${url}" as="font" type="font/woff2" crossorigin>`)
    .join('')

  hexo.extend.injector.register('head_end', links, 'default')
})