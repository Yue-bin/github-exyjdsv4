import { defineAppSetup } from '@slidev/types'

export default defineAppSetup(({ app, router }) => {
    // 注入全局 CSS
    const style = document.createElement('style')
    style.innerHTML = `
    html, body {
      background-color: #FFFFFF !important; /* 强制亮色背景 */
    }
    .slidev-code {
      max-height: 300px; /* 限制代码块最大高度 */
      overflow-y: auto; /* 垂直滚动 */
      overflow-x: auto; /* 水平滚动 */
      font-size: 0.7em; /* 缩小字体 */
    }
    .slidev-code-wrapper {
      padding: 10px;
      border-radius: 8px;
      background-color: #f8f8f8; /* 亮色背景 */
    }
  `
    document.head.appendChild(style)
})