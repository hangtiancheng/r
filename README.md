[What is @lark.js/mvc?](https://github.com/hangtiancheng/h/tree/main/lark)

[What is @lark.js/sentry?](https://github.com/hangtiancheng/lark-sentry)

本项目是一个使用 @lark.js/mvc 前端框架的简历项目, dev/build 时期望:

- 初始读取 src/resume.json 中的简历默认值
- 支持用户在预览模式下, 鼠标右键点击姓名切换到编辑模式退出简历编辑
- 支持用户在编辑模式下, 点击 Edit Mode 按钮退出简历编辑

你可以调用 lark-mvc 技能以更好的使用 @lark.js/mvc 前端框架

目前存在的缺陷和 bug 有:

- 鼠标右键点击姓名切换到编辑模式没有用户友好的提示, 形式可以是 daisyUI 的 popover
- 点击 Edit Mode 按钮退出简历编辑也没有用户友好的提示, 形式可以是 daisyUI 的 popover
- 编辑模式的 UI 太丑, 你可以调用 frontend-design 技能美化 UI
- 编辑模式下, 点击 Edit Mode 按钮后用户编辑的内容无法保存

```bash
pnpm add @lark.js/mvc@0.0.5
pnpm add @lark.js/sentry@0.0.4

pnpm dlx skills add git@github.com:hangtiancheng/h.git
pnpm dlx skills add git@github.com:hangtiancheng/lark-sentry.git
```
