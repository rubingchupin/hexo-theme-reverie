'use strict'

/**
 * Reverie 内置侧边栏文章写作日历
 * 由主题核心注入（原为 _config.reverie.yml inject 手动导入）
 * 资源：/js/jquery.min.js → /js/languages.js → /js/calendar.js（按依赖顺序）
 * 开关：aside.card_calendar.enable
 */

const urlFor = (hexo, str) => require('hexo-util').url_for.call(hexo, str)

hexo.extend.filter.register('after_generate', function () {
  const cardCalendar = hexo.theme.config.aside && hexo.theme.config.aside.card_calendar
  if (!cardCalendar || !cardCalendar.enable) return

  const jquery_js = cardCalendar.jquery_js ? urlFor(hexo, cardCalendar.jquery_js) : '/js/jquery.min.js'
  const languages_js = cardCalendar.languages_js ? urlFor(hexo, cardCalendar.languages_js) : '/js/languages.js'
  const calendar_js = cardCalendar.calendar_js ? urlFor(hexo, cardCalendar.calendar_js) : '/js/calendar.js'

  const scripts = [
    `<script src="${jquery_js}" defer></script>`,
    `<script src="${languages_js}" defer></script>`,
    `<script src="${calendar_js}" defer></script>`
  ].join('')

  hexo.extend.injector.register('body_end', scripts, 'default')
})