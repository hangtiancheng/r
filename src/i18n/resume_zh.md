# 杭天铖

电话: 15395377789 | 邮箱: 161043261@qq.com | GitHub: hangtiancheng

男, 24, 硕士, AI Agent 工程师

## 教育经历

- 本科: 2019-2023 · 西安电子科技大学 · 微电子科学与工程
- 硕士: 2024-2027 · 南京邮电大学 · 计算机技术

## 开发技能

- 了解 Agent 开发的 SSE 流式输出、ReAct 和 Agent Loop、System Prompt、工具调用、权限、会话持久化、上下文压缩、指令文件、Auto-Dream 自动记忆、MCP、Slash Command、Skill、Hook、Worktree、Subagent、Agent Teams
- 熟悉 CSS, 熟悉 CSS 预处理器, 模块化, 原子化, PostCSS, CSS-in-JS
- 熟悉 JS/TS/Go
- 熟悉数据结构, 计算机网络
- 熟悉 Node.js, 熟悉 Express/Koa; 有 BFF 层, Node.js/Go 后端开发经验
- 熟悉 Go, MySQL, Redis, 了解 ClickHouse
- 熟悉 JSX/TSX, 熟悉 React, Zustand, React-Router; 了解 React Fiber 架构, 熟悉 React 性能优化 Hooks/虚拟滚动/SWR
- 熟悉 Vite, 了解 Webpack
- 了解 SSR, Next.js, open-graph, sitemap.xml, robots.txt, llms.txt
- 了解 Web 性能优化, 前端监控、埋点
- 熟悉 Vue3, Pinia, Vue-Router, 了解 Vue3 响应式原理

## 职业经历

### 字节跳动

2025-06 ~ 2025-09, 产品研发与工程架构, TikTok Performance 团队; Perfetto 采集的性能数据使用 Kafka 转发到 Hive, ClickHouse, MySQL, Redis; 后端使用 Golang 和 Kitex, BFF 层清洗数据, 前端可视化渲染; BFF 层调用后端提供的 RPC 方法, 暴露 HTTP 接口给前端; 使用性能优化 Hooks, 编写虚拟滚动列表; 修复开源 coze-dev/coze-js: Android 环境 User-Agent 缺失导致 TypeError (pull/257)

### 腾讯

2025-10 ~ 2026-2, IEG 互动娱乐事业群, 基础技术产品部; 负责腾讯 TcaplusDB NoSQL 数据库管理端; 前端负责迁移 React 类组件到函数组件, 使用性能优化 hooks 避免重复请求, 优化渲染性能, 排查接口响应时间不稳定导致的数据竞争; 后端使用通用池，同时池化多个场景: NoSQL 数据库连接使用 TCP 连接池; ffi-napi 调用 C++ .so 动态链接库加解密, 解析表文件使用进程池; 使用 Valgrind 排查 ffi-napi 调用 .so 动态链接库时的内存泄漏, 利用 V8 隐藏类, 维护对象池以降低 Node.js 侧 GC 压力

### 字节跳动

2026-02 ~ 2026-05, Data-架构部门; 搜索推荐算法平台、抖音 Debug 平台开发; 对于搜索推荐算法平台, 前端 Slardar 监控 SDK 上报 JSError 携带错误信息, 还原故障现场; 建设项目的 Harness 工程, 将错误信息提供给 LLM 自动修复、提交 MR, 自动触发 E2E 测试, 向量库模块接入 SWR 前端性能优化, 以提高页面秒开率; 对于抖音 Debug 平台, 迁移旧平台能力, 支持对长视频/直播间 ID, 调用下游 RPC 方法切片、打标生成聚类标签, 并使用 Redis 缓存

### 阿里巴巴

为降低淘宝商家经营成本, 基于 LangChain/LangGraph/LangFuse 构建的商家 Agent, 架构是确定性 workflow 加商家经营托管 Agent, 支持指代消解、query 扩写、意图识别与分流、RAG + BM25 混合检索双路召回、工具调用、上下文压缩、数据飞轮持续迭代, 已在淘宝商家端落地

- 为提高商家经营托管 Agent 用户渗透率, 负责接入 A2UI 能力, 提高 LLM A2UI json 部分场景下的生成速率和准确率, 服务端支持失败重试、客户端支持失败降级
- 参与确定性 workflow 建设、LLM 幻觉治理, RAG + BM25 混合检索前的置信度闸; 实测误放率 0%, 误拦率 17%
- 参与数据飞轮持续迭代建设, 提升系统可用性
- 参与前端 Webpack/Vite 模块联邦接入, 修复开源 module-federation/vite workspace 包通过 exports 同时提供 CJS/ESM 入口时崩溃问题 (pull/860)
- AI 聊天全栈建站平台建设，通过边缘函数实现后端热部署

## 项目经历

### CLI Coding Agent

仓库链接: [hangtiancheng/yukino-code](https://github.com/hangtiancheng/yukino-code)

- 5 层架构, 支持多 LLM 协议 (OpenAI Chat Completions/OpenAI Response/Anthropic Messages)、多 LLM providers、支持会话内切换 provider
- 支持 Slash Commands、Skills、Hooks
- 支持 MCP 工具延迟加载、MCP reload 的 reconcile
- 通过动态指令注入等手段, 尽可能命中 Prompt Cache 前缀缓存, 缓存命中率实测 >90% (不同场景下数值不同)
- 权限系统: 权限模式、权限规则配置文件、路径沙箱、OS 级沙箱、Human-in-the-Loop
- 两层上下文压缩, 基于自动上下文压缩、subagent 实现长期 loop 的 Goal 模式
- 支持 Auto-Dream 自动记忆提取、定期记忆整理
- 支持预定义的 subagent (Definition-based) 和 fork 的 subagent (Fork-based), subagent 支持前台同步和后台异步
- 支持 Worktree 文件隔离; 支持 Agent Team, 通过文件邮箱、p2p/broadcast 实现主 agent 编排、teammates 通信和合作
- 支持多模态消息 (例如图片)、对于图片, 支持二进制格式嗅探和 sharp 压缩
- 使用 SWE-bench-Live 数据集进行自动化评测, 通过真实使用和自动化评测持续优化 prompts、descriptions 等...

### 前端监控/埋点

仓库链接: [hangtiancheng/yukino-sentry](https://github.com/hangtiancheng/yukino-sentry)

框架无关的前端监控 SDK, 发布订阅架构, core 模块 (事件总线、生命周期、数据上报) 和 plugin 子模块 (性能采集、屏幕录制) 解耦, 支持错误捕获、白屏检测、性能指标采集、故障现场重放; 错误捕获覆盖: 资源加载错误、JSError、未捕获的 Promise 错误、xhr 和 fetch 请求错误, 支持错误去重和 LRU 队列, 支持声明式属性 trace 点击事件、监听 hashchange 和 history 导航; 白屏检测使用关键点采样; 性能采集插件计算 LCP/FCP/CLS/INP/TTFB 等指标, 使用 MutationObserver + rAF 计算 FSP 首屏渲染时间、检测 longtask 长任务; 使用 rrweb + gzip 屏幕录制以重放故障现场, 数据上报使用 3 级降级: navigator.sendBeacon -> Image beacon (可选) -> fetch keepalive, 离线使用 localStorage, 网络恢复自动 flush 上报队列, 提供 React16+/Vue3+ 框架集成

## 科研经历

- 科研方向: 计算机网络拥塞控制, 多核并行化网络仿真
- 专利: 多信号融合的启发式网络拥塞控制方法及系统
