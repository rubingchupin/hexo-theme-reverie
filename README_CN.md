<div align="right">
  <a title="English" href="/README.md">English</a>
</div>

<div align="center">

<img src="https://assets.rubing.us.kg/shared/img/avatar.png" width="150" height="150" alt="Reverie Logo" />

# hexo-theme-reverie

一个适用于 Hexo 的现代化、美观且功能丰富的主题

![hexo version](https://img.shields.io/badge/hexo-5.3.0+-0e83cd)
![license](https://img.shields.io/github/license/rubingchupin/hexo-theme-reverie?color=FF5531)
![GitHub stars](https://img.shields.io/github/stars/rubingchupin/hexo-theme-reverie?style=social)

📖 **完整文档**: [官方文档](https://butterfly.js.org/)（基于 Butterfly 定制）

</div>

> **注意**: 本主题是 [hexo-theme-butterfly](https://github.com/jerryc127/hexo-theme-butterfly) 的 fork，为个人使用而定制。

---

## 🚀 快速开始

### 💾 安装方式

#### 方式：Git 安装（推荐）

在您的 Hexo 博客根目录下执行：

```bash
git clone https://github.com/rubingchupin/hexo-theme-reverie.git themes/reverie
```

### ⚙️ 主题配置

1. **启用主题**: 修改您的 Hexo 配置文件 `_config.yml`：

```yaml
theme: reverie
```

2. **安装依赖**: 如果您尚未安装 pug 和 stylus 渲染器，请执行：

```bash
npm install hexo-renderer-pug hexo-renderer-stylus --save
```

## ✨ 主题特色

### 🎨 设计风格
- [x] **卡片化设计** - 现代化的卡片式布局
- [x] **圆角/直角设计** - 支持自订边框样式
- [x] **响应式设计** - 完美适配各种屏幕尺寸
- [x] **双栏布局** - 优化的阅读体验
- [x] **深色模式** - 护眼的夜间模式
- [x] **自定义样式** - 通过自定义 stylus 美化了页面图标、字体和配色

### 🎵 Reverie 自定义特色
- [x] **悬浮播放器** - 全站悬浮播放器，进入任意页面自动播放（不重复歌单，自动播放受限时先静音再自动恢复）
- [x] **文章日历** - 日历组件，将每日发布的文章以链接形式展示
- [x] **智能导航栏** - 下滑时显示文章标题、上滑或停顿时恢复菜单
- [x] **顶部加载条** - 页面加载时的优雅顶部进度条
- [x] **复制增强** - 便捷的复制功能

### 📝 内容功能
- [x] **多级菜单** - 支持二级导航菜单
- [x] **阅读模式** - 专注的文章阅读体验
- [x] **目录导航** - 电脑和手机双端支持 TOC
- [x] **字数统计** - 显示文章字数和阅读时间
- [x] **相关文章** - 智能推荐相关内容
- [x] **过期提醒** - 自动提示文章更新状态
- [x] **简繁转换** - 支持繁体中文和简体中文切换
- [x] **标签外挂** - 丰富的标签插件支持

### 🔍 搜索与导航
- [x] **多种搜索** - Algolia 搜索 / 本地搜索 / Docsearch
- [x] **内置 404** - 美观的 404 错误页面
- [x] **Pjax 支持** - 流畅的页面切换体验

### 🎨 代码展示
- [x] **语法高亮** - 内置多种主题（darker/pale night/light/ocean）
- [x] **代码功能** - 语言显示/折叠展开/复制按钮/自动换行
- [x] **数学公式** - 支持 Mathjax 和 Katex

### 💬 社交互动
- [x] **多元评论系统** - Disqus/Gitalk/Valine/Waline/Twikoo/Giscus/Artalk 等
- [x] **双评论支持** - 可同时启用两套评论系统
- [x] **分享功能** - Sharejs/Addtoany 分享组件
- [x] **在线客服** - Chatra/Tidio/Crisp 即时聊天

### 📊 数据分析
- [x] **访问统计** - 不蒜子计数器
- [x] **网站分析** - Google Analytics/百度统计/Cloudflare Analytics/Microsoft Clarity/Umami
- [x] **站长验证** - 各大搜索引擎验证
- [x] **广告支持** - Google AdSense/自定义广告位

### 🎪 视觉效果
- [x] **打字特效** - activate_power_mode 动画
- [x] **背景特效** - 静态彩带/动态彩带/飘带效果/Canvas Nest
- [x] **鼠标特效** - 烟花/爱心/文字点击效果
- [x] **加载动画** - Preloader 和 pace.js 进度条
- [x] **图片效果** - Medium Zoom/Fancybox 图片灯箱
- [x] **懒加载** - 图片延迟加载优化

### 🛠️ 进阶功能
- [x] **PWA 支持** - 渐进式网页应用
- [x] **复制保护** - 可关闭文字复制/版权信息追加
- [x] **主题定制** - 自定义网站配色方案
- [x] **图表支持** - Mermaid 流程图/Chart.js 数据图表
- [x] **音乐符号** - ABCJS 音乐记谱法支持
- [x] **系列文章** - 系列文章组织功能
- [x] **Instantpage** - 页面预加载加速
- [x] **Snackbar** - 优雅的提示消息

## 🤝 参与贡献

如果您发现任何问题或有好的想法，欢迎反馈 Issue 或提交 Pull Request：

- 🐛 **发现问题？** → [GitHub Issues](https://github.com/rubingchupin/hexo-theme-reverie/issues)

## 📄 授权条款

本项目采用 [Apache 2.0](LICENSE) 授权条款。

## 🙏 致敬与感谢

本主题是 [hexo-theme-butterfly](https://github.com/jerryc127/hexo-theme-butterfly) 的 fork，感谢原作者 Jerry 的优秀作品！

---

<div align="center">

**✨ 如果这个主题对您有帮助，请给我们一个 ⭐ Star！✨**
</div>