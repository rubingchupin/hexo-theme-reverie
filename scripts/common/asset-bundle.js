'use strict'

/**
 * Reverie 资源集成打包开关判断
 * 供各功能注入过滤器与打包过滤器共用，保证两处开关判断完全一致。
 * 开关：asset_bundle.enable / asset_bundle.js / asset_bundle.css
 */

const bundleEnabled = (hexo, type) => {
  const config = hexo.theme.config.asset_bundle
  if (!config || !config.enable) return false
  if (type === 'js' || type === 'css') return !!config[type]
  return true
}

module.exports = { bundleEnabled }