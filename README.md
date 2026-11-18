<div align="right">
  <a title="中文" href="/README_CN.md">中文</a>
</div>

<div align="center">

<img src="https://assets.rubing.us.kg/shared/img/avatar.png" width="150" height="150" alt="Reverie Logo" />

# hexo-theme-reverie

A modern, elegant and feature-rich theme for Hexo

![hexo version](https://img.shields.io/badge/hexo-5.3.0+-0e83cd)
![license](https://img.shields.io/github/license/rubingchupin/hexo-theme-reverie?color=FF5531)
![GitHub stars](https://img.shields.io/github/stars/rubingchupin/hexo-theme-reverie?style=social)

📖 **Documentation**: [官方文档](https://butterfly.js.org/)（基于 Butterfly 定制）

</div>

> **Notice**: This theme is a fork of [hexo-theme-butterfly](https://github.com/jerryc127/hexo-theme-butterfly), customized for personal use.

---

## 🚀 Quick Start

### 💾 Installation

#### Method: Git Installation (Recommended)

Execute in your Hexo blog root directory:

```bash
git clone https://github.com/rubingchupin/hexo-theme-reverie.git themes/reverie
```

### ⚙️ Theme Configuration

1. **Enable Theme**: Modify your Hexo configuration file `_config.yml`:

```yaml
theme: reverie
```

2. **Install Dependencies**: If you haven't installed pug and stylus renderers, please run:

```bash
npm install hexo-renderer-pug hexo-renderer-stylus --save
```

## ✨ Theme Features

### 🎨 Design Style
- [x] **Card-based Design** - Modern card-style layout
- [x] **Rounded/Square Design** - Customizable border styles
- [x] **Responsive Design** - Perfect adaptation to all screen sizes
- [x] **Two-column Layout** - Optimized reading experience
- [x] **Dark Mode** - Eye-friendly night mode
- [x] **Custom Style** - Beautified page icons, fonts and colors via custom stylus

### 🎵 Reverie Custom Features
- [x] **Floating Music Player** - Site-wide floating player that auto-plays on every page (non-repeating playlist, mute-then-unmute fallback for autoplay restrictions)
- [x] **Post Calendar** - A calendar widget linking to posts published on each day
- [x] **Smart Navbar** - Navbar shows the article title while scrolling down and restores the menu on pause/scroll-up
- [x] **Top Loading Bar** - Elegant top progress bar during page loads
- [x] **Copy Enhancements** - Convenient copy functionality

### 📝 Content Features
- [x] **Multi-level Menu** - Support for secondary navigation menus
- [x] **Reading Mode** - Focused article reading experience
- [x] **TOC Navigation** - Desktop and mobile TOC support
- [x] **Word Count** - Display article word count and reading time
- [x] **Related Articles** - Smart recommendation of related content
- [x] **Outdated Reminder** - Automatic article update status alerts
- [x] **Traditional/Simplified Chinese** - Support for Traditional and Simplified Chinese switching
- [x] **Tag Plugins** - Rich tag plugin support

### 🔍 Search & Navigation
- [x] **Multiple Search Options** - Algolia Search / Local Search / Docsearch
- [x] **Built-in 404** - Beautiful 404 error page
- [x] **Pjax Support** - Smooth page transition experience

### 🎨 Code Display
- [x] **Syntax Highlighting** - Built-in multiple themes (darker/pale night/light/ocean)
- [x] **Code Features** - Language display/fold expand/copy button/auto-wrap
- [x] **Math Formulas** - Support for Mathjax and Katex

### 💬 Social Interaction
- [x] **Multiple Comment Systems** - Disqus/Gitalk/Valine/Waline/Twikoo/Giscus/Artalk etc.
- [x] **Dual Comments Support** - Enable two comment systems simultaneously
- [x] **Share Features** - Sharejs/Addtoany sharing components
- [x] **Live Chat** - Chatra/Tidio/Crisp instant messaging

### 📊 Analytics & Statistics
- [x] **Visit Statistics** - Busuanzi counter
- [x] **Site Analytics** - Google Analytics/Baidu Analytics/Cloudflare Analytics/Microsoft Clarity/Umami
- [x] **Webmaster Verification** - Major search engine verification
- [x] **Ad Support** - Google AdSense/custom ad slots

### 🎪 Visual Effects
- [x] **Typing Effects** - activate_power_mode animations
- [x] **Background Effects** - Static ribbons/dynamic ribbons/floating ribbons/Canvas Nest
- [x] **Mouse Effects** - Fireworks/hearts/text click effects
- [x] **Loading Animations** - Preloader and pace.js progress bars
- [x] **Image Effects** - Medium Zoom/Fancybox image lightbox
- [x] **Lazy Loading** - Image lazy loading optimization

### 🛠️ Advanced Features
- [x] **PWA Support** - Progressive Web App
- [x] **Copy Protection** - Disable text copying/copyright info append
- [x] **Theme Customization** - Custom site color schemes
- [x] **Chart Support** - Mermaid flowcharts/Chart.js data charts
- [x] **Music Notation** - ABCJS music notation support
- [x] **Article Series** - Series article organization
- [x] **Instantpage** - Page preloading acceleration
- [x] **Snackbar** - Elegant notification messages

## 🤝 Contributing

Feel free to report issues or submit pull requests if you find any bug or have an idea:

- 🐛 **Found a bug?** → [GitHub Issues](https://github.com/rubingchupin/hexo-theme-reverie/issues)

## 📄 License

This project is licensed under the [Apache 2.0](LICENSE) License.

## 🙏 Acknowledgments

This theme is a fork of [hexo-theme-butterfly](https://github.com/jerryc127/hexo-theme-butterfly). Thanks to the original author Jerry for the excellent work!

The following features' logic layers have been embedded into the theme core (dependencies are managed via CDN or local assets):

- **Homepage Swiper Carousel** — adapted from [hexo-butterfly-swiper](https://github.com/Akilarlxh/hexo-butterfly-swiper) by [Akilarlxh](https://github.com/Akilarlxh)
- **Scroll Animation (Wow.js)** — adapted from [hexo-butterfly-wowjs](https://github.com/Akilarlxh/hexo-butterfly-wowjs) by [Akilarlxh](https://github.com/Akilarlxh)
- **Category Cards** — adapted from [hexo-butterfly-categories-card](https://github.com/Akilarlxh/hexo-butterfly-categories-card) by [Akilarlxh](https://github.com/Akilarlxh)
- **Local Asset Assembler** — adapted from [hexo-butterfly-extjs](https://github.com/Akilarlxh/hexo-butterfly-extjs) by [Akilarlxh](https://github.com/Akilarlxh)

Special thanks to all the upstream authors for their excellent work!

---

<div align="center">

**✨ If this theme helps you, please give us a ⭐ Star! ✨**
</div>