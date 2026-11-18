'use strict'

/**
 * Reverie 内置本地资源装配（源自 hexo-butterfly-extjs）
 * 上游插件原作者：https://github.com/Akilarlxh/hexo-butterfly-extjs
 * 已嵌入主题核心：当 CDN.third_party_provider 为 local 时，
 * 从 plugins.yml 声明的依赖复制资源到 public/pluginsSrc/。
 * 同时支持复制 Reverie 主题自研的本地资源（位于 source/ext 下）。
 */

const path = require('path')
const yaml = require('js-yaml')
const { readFileSync, statSync, readdirSync } = require('fs')

hexo.extend.generator.register('pluginsSrc', () => {
  const { third_party_provider } = hexo.theme.config.CDN || {}
  if (third_party_provider && third_party_provider !== 'local') return

  const plugins = yaml.load(
    readFileSync(path.join(hexo.theme_dir, 'plugins.yml'))
  )

  const dataObj = []
  const errorObj = []
  const fileCache = new Map()

  /**
   * 第三方依赖本地库（复刻自 hexo-butterfly-extjs 的 getModulePath 增强版）
   * 原插件靠自身的 package.json dependencies 把所有第三方包装进 node_modules，
   * 此处改为优先从第三方依赖库查找，找不到再回落项目 node_modules，
   * 从而实现 internal_provider: local / third_party_provider: local 均正常生效。
   * 库根目录优先级：主题配置 CDN.third_party_library（若给出绝对路径）
   *  -> 默认 E:/Project/hexo-reverie-extjs/node_modules -> 项目 node_modules。
   */
  const libCandidates = [hexo.config.third_party_library].filter(Boolean)
  if (!path.isAbsolute(libCandidates[0] || '')) {
    libCandidates.unshift('E:/Project/hexo-reverie-extjs/node_modules')
  }
  const thirdPartyLibrary = libCandidates.find(p => {
    try {
      return statSync(p).isDirectory()
    } catch {
      return false
    }
  })

  const getModulePath = moduleName => {
    if (thirdPartyLibrary) {
      const libraryRoot = path.join(thirdPartyLibrary, moduleName)
      try {
        statSync(libraryRoot)
        return thirdPartyLibrary
      } catch {}
    }
    const candidates = [`${moduleName}/package.json`, moduleName]
    for (const candidate of candidates) {
      try {
        const packagePath = require.resolve(candidate)
        const match = packagePath.match(/(.*[\\/]node_modules)(?=[\\/])/)
        if (match) return match[0]
      } catch {}
    }
    return hexo.plugin_dir
  }

  const readFileCached = absPath => {
    if (!fileCache.has(absPath)) {
      fileCache.set(absPath, readFileSync(absPath))
    }
    return fileCache.get(absPath)
  }

  const pushFile = (targetPath, absPath) => {
    dataObj.push({
      path: `pluginsSrc/${targetPath}`,
      data: readFileCached(absPath)
    })
  }

  // 依据 plugins.yml 复制各依赖声明文件
  Object.values(plugins).forEach(value => {
    const relPath = `${value.name}/${value.file}`
    const absPath = path.join(getModulePath(value.name), relPath)
    try {
      pushFile(relPath, absPath)
    } catch {
      errorObj.push(`Missing file: ${relPath}`)
    }
  })

  // 复制主题自研的本地资源（放到 source/ext/，语义即“Reverie 专属扩展”）
  const extDir = path.join(hexo.theme_dir, 'source/ext')
  const lookForFiles = (dirPath, origin) => {
    readdirSync(dirPath).forEach(sub => {
      const subPath = path.join(dirPath, sub)
      const name = `${origin}/${sub}`
      const stat = statSync(subPath)
      if (stat.isDirectory()) {
        lookForFiles(subPath, name)
      } else if (stat.isFile()) {
        pushFile(name, subPath)
      }
    })
  }
  try {
    lookForFiles(extDir, 'reverie')
  } catch (e) {
    // source/ext 目录不存在则跳过，不影响生成
  }

  // webfonts 目录处理（复刻自原 hexo-butterfly-extjs）
  const mathUse = hexo.theme.config.math?.use

  // katex 也可由渲染器启用（如 hexo-renderer-markdown-it-katex），
  // 此时主题 math.use 为空但页面仍引用 katex.min.css，字体目录必须生成。
  const detectKatexRenderer = () => {
    const renderers = [
      'hexo-renderer-markdown-it-katex',
      'hexo-renderer-markdown-it-plus',
      'hexo-renderer-kramed'
    ]
    return renderers.some(name => {
      const rendererDir = path.join(hexo.base_dir, 'node_modules', name)
      try {
        return statSync(rendererDir).isDirectory()
      } catch {
        return false
      }
    })
  }

  const katexInUse = mathUse === 'katex' || detectKatexRenderer()

  const folders = {
    fontawesome_free: {
      name: '@fortawesome/fontawesome-free',
      path: 'webfonts'
    },
    social_share: {
      name: 'butterfly-extsrc',
      path: 'sharejs/dist/fonts'
    },
    mathjax: {
      name: 'mathjax',
      path: '.',
      enable: mathUse === 'mathjax'
    },
    mathjax_font: {
      name: '@mathjax/mathjax-newcm-font',
      path: '.',
      enable: mathUse === 'mathjax'
    },
    mathjax_bbm_font: {
      name: '@mathjax/mathjax-mhchem-font-extension',
      path: '.',
      enable: mathUse === 'mathjax'
    },
    katex_font: {
      name: 'katex',
      path: 'dist/fonts',
      enable: katexInUse
    }
  }

  Object.values(folders)
    .filter(f => f.enable !== false)
    .forEach(f => {
      const routeName = path.posix.join(f.name, f.path)
      try {
        const absDir = path.join(getModulePath(f.name), f.name)
        const basePath = path.join(absDir, f.path)
        const stat = statSync(basePath)
        if (stat.isDirectory()) {
          lookForFiles(basePath, routeName)
        } else if (stat.isFile()) {
          pushFile(routeName, basePath)
        }
      } catch {
        errorObj.push(`Missing folder: ${routeName}`)
      }
    })

  if (errorObj.length) {
    hexo.log.warn('Resolve failed in reverie local assets:')
    errorObj.forEach(msg => hexo.log.warn(msg))
    process.exit(-1)
  }

  return dataObj
})