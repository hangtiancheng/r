# 面试问题 - 杭天铖

## 一、技能相关问题

### 1.1 React Fiber 架构

你提到了解 React Fiber 架构，请详细说明 Fiber 的设计动机是什么? 它解决了 Stack Reconciler 的什么问题? Fiber 节点的数据结构是怎样的，它是如何实现可中断渲染和任务优先级调度的?

### 1.2 React 性能优化 Hooks

你在多个工作经历中提到了 React 性能优化 Hooks，请对比 useMemo、useCallback、React.memo 的使用场景和区别。在什么情况下使用这些优化反而会导致性能下降? 请举例说明你在实际项目中如何判断是否需要使用这些 Hooks。

### 1.3 虚拟滚动

你在字节跳动 TikTok Performance 团队编写过虚拟滚动列表，请说明虚拟滚动的核心原理。如何处理动态高度的列表项? 快速滚动时白屏问题如何解决? 你实现的虚拟滚动和 react-window、react-virtualized 这类库相比有什么异同?

### 1.4 SWR 数据请求策略

你在字节跳动 Data-架构部门使用过 SWR 进行前端性能优化，请解释 SWR 的 stale-while-revalidate 策略的工作原理。它和 React Query 相比有什么区别? 你是如何利用 SWR 的缓存、轮询、条件请求等特性的?

### 1.5 Zod 类型校验

你提到偏好严格类型并熟悉 Zod，请说明 Zod 和 TypeScript 类型系统的关系。Zod 的 schema 如何实现运行时校验和类型推导的统一? 在你的项目中，Zod 是如何和 API 数据校验、表单校验结合的?

### 1.6 Vue3 响应式原理

你提到熟悉 Vue3 并了解其响应式原理，请详细说明 Vue3 的 Proxy 响应式系统和 Vue2 的 Object.defineProperty 相比有哪些改进? reactive 和 ref 的区别是什么? effect、track、trigger 的依赖收集流程是怎样的?

### 1.7 Go 后端开发

你熟悉 Go 并在字节跳动使用 Kitex 框架，请说明 Go 的 goroutine 和 channel 的调度模型 (GMP 模型)。Kitex 作为 RPC 框架，它的 Thrift 协议序列化原理是什么? 你编写的 Thrift 生成 npm 包的具体工作流程是怎样的?

### 1.8 模块联邦

你在阿里巴巴接入了 Webpack/Vite 模块联邦，请解释 Module Federation 的核心概念: host、remote、shared 的含义。Webpack 模块联邦和 Vite 模块联邦在实现上有什么区别? 你是如何处理共享依赖版本冲突和远程模块加载失败的?

### 1.9 Agent 开发

你提到了解 Agent 开发的多个方面，请说明 ReAct 范式中 Reasoning 和 Acting 是如何交替进行的? 你实现的 Agent Loop 和简单的 LLM 调用链有什么本质区别? MCP (Model Context Protocol) 解决了什么问题?

### 1.10 Node.js 性能调优

你在腾讯使用 valgrind 排查内存泄漏、维护对象池、利用 v8 隐藏类降低 GC 压力，请详细说明: v8 隐藏类 (Hidden Class) 的原理是什么? 你是如何构造对象以利用隐藏类优化 JIT 编译的? Node.js 中常见的内存泄漏场景有哪些，你是如何定位的?

## 二、工作经历相关问题

### 2.1 字节 TikTok Performance - 数据架构

你在 TikTok Performance 团队使用了 Kafka -> Redis/MySQL/ClickHouse 的数据架构。为什么选择 ClickHouse 做终端设备性能数据的存储，它和 MySQL 的适用场景有什么区别? 多层缓存是如何设计的，缓存一致性如何保证?

### 2.2 字节 TikTok Performance - BFF 层设计

你提到 BFF 层使用 Nest.js 调用后端 RPC 方法并暴露 HTTP 接口给前端。BFF 层的数据清洗具体做了什么? 为什么需要一个独立的 BFF 层而不是让前端直接调用后端 RPC? 这种架构的优缺点是什么?

### 2.3 腾讯 IEG - React 组件迁移

你负责将 React 类组件迁移到函数组件，请详细说明迁移过程中遇到了哪些挑战? 类组件的生命周期方法是如何映射到 Hooks 的? 迁移过程中如何保证功能的向后兼容性? 如何验证迁移后组件的正确性?

### 2.4 腾讯 IEG - 数据竞争排查

你提到排查闭包和接口响应时间不稳定导致的数据竞争，请详细描述这个问题的现象、定位过程和解决方案。React Hooks 中的闭包陷阱是如何产生的? 你使用了什么手段来定位这个异步竞态问题?

### 2.5 腾讯 IEG - TCP 连接池与 ffi-napi 调用 C++ .so

你提到后端编写 TCP 连接池和使用 ffi-napi 调用 C++ .so 动态链接库，请说明 TCP 连接池的设计要点 (最大连接数、空闲回收、心跳检测)。ffi-napi 调用 C++ .so 的架构是怎样的? 为什么选择 ffi-napi 而不是 N-API addon 或 child_process?

### 2.6 腾讯 IEG - Node.js 与 C++ 互操作

Node.js 调用 C++ .so 动态链接库有几种方式 (N-API, FFI, child_process)? 你们选择 ffi-napi 的原因是什么? ffi-napi 在使用中遇到过哪些坑 (内存管理、类型对齐、回调函数)?

### 2.7 字节 Data-架构 - JSError LLM 自动修复

你在字节跳动 Data-架构部门做了前端 JSError 大模型自动修复，请详细说明这个系统的工作流程: 如何从 JSError 中提取上下文信息? 如何构造 Prompt 让 LLM 理解并修复错误? 修复方案如何验证正确性? 实际修复率和收益是什么?

### 2.8 字节 Data-架构 - A2UI React 框架

你提到接入 A2UI React 框架，请解释 A2UI (Agent to UI) 的概念是什么? 它和传统的 Server-Driven UI 有什么区别? 在搜索推荐算法平台和抖音 Debug 平台中是如何应用的?

### 2.9 阿里巴巴 - Server & Schema-Driven UI

你在阿里妈妈负责 Server & Schema-Driven UI 开发，请说明什么是 Schema-Driven UI? Schema 是如何定义和解析的? 这种架构在广告投放场景中的优势是什么? 如何处理复杂交互和自定义组件?

### 2.10 阿里巴巴 - 模块联邦开源贡献

你贡献了 @module-federation/vite 开源项目，请说明你做了哪些具体贡献? Vite 和 Webpack 在模块联邦实现上的核心差异是什么 (基于 ESM vs 基于 bundle)? 遇到了哪些技术挑战?

## 三、项目经历相关问题

### 3.1 Sentry SDK - 架构设计

你的 swifty-sentry SDK 采用发布订阅架构，core 模块和 plugin 子模块解耦。请详细说明这个架构是如何设计的? core 模块提供了哪些核心能力? plugin 是如何注册和生命周期管理的? 这种架构相比直接集成所有功能有什么优势?

### 3.2 Sentry SDK - JSError 捕获与 Source Map

你的 SDK 支持 JSError 捕获，请说明前端 JSError 的捕获方式有哪些 (window.onerror, window.addEventListener, try-catch)? 如何获取错误的堆栈信息? JSError 上报后如何通过 Source Map 还原故障现场? 生产环境中 Source Map 文件如何安全管理?

### 3.3 Sentry SDK - 错误去重与 LRU

你提到 SDK 支持 LRU 和错误去重，请说明错误去重的策略是什么 (基于消息、堆栈、还是指纹)? LRU 缓存在这里的作用是什么? 如何控制上报频率，防止错误风暴导致服务端压力过大?

### 3.4 Sentry SDK - 白屏检测

你的 SDK 支持白屏检测，使用关键点采样方式。请详细说明关键点采样的原理是什么? 如何判断页面是否白屏? 这种方法有什么局限性? 有没有更可靠的白屏检测方案?

### 3.5 Sentry SDK - 性能指标采集

你的 SDK 计算 LCP/FCP/CLS/INP 等 Web Vitals 指标，请分别说明每个指标的含义和计算方式。你是使用哪些 Observer API (PerformanceObserver) 来采集这些指标的? longTask 长任务的检测阈值是多少，如何关联到具体的性能瓶颈?

### 3.6 Sentry SDK - rrweb 故障现场重放

你使用 rrweb + gzip 进行屏幕录制以重放故障现场，请说明 rrweb 的录制原理是什么 (DOM 快照 + Mutation Observer 增量记录)? 它对页面性能的影响有多大? 你是如何平衡录制精度和性能开销的? gzip 压缩比大约是多少?

### 3.7 Sentry SDK - 数据上报降级策略

你的 SDK 实现了 3 级降级上报: sendBeacon -> Image beacon -> fetch keepAlive。请说明每种方式的特点和适用场景。为什么 sendBeacon 是首选? 离线场景下 localStorage 的容量限制是多少? 网络恢复后的刷盘策略是什么，如何避免瞬间大量请求?

### 3.8 Sentry SDK - 包体积优化

作为一个前端监控 SDK，包体积对首屏加载有直接影响。你的 SDK 打包后体积是多少? 你做了哪些优化来控制包体积 (tree-shaking, 按需加载, 动态 import)? 如果 SDK 体积仍然过大影响首屏加载，你会如何处理?

### 3.9 CLI Coding Agent - 架构设计

你的 swifty-cli 采用 5 层架构，请详细说明这 5 层分别是什么? 每层的职责是什么? 层与层之间是如何通信的? 这种分层架构带来了什么好处?

### 3.10 CLI Coding Agent - Agent Loop 与 ReAct

请详细说明你实现的 Agent Loop 的工作流程: 一次完整的推理-行动循环是怎样进行的? LLM 的输出如何解析为工具调用? 工具调用结果如何反馈给 LLM? 如何处理 LLM 输出格式错误、工具调用失败等异常情况?

### 3.11 CLI Coding Agent - 权限系统

你实现了 5 层权限系统，请详细说明这 5 层权限分别是什么? 权限是如何定义和校验的? 对于文件系统操作、Shell 命令执行、网络请求等不同类型的能力，权限粒度如何控制? 用户在运行时如何授权?

### 3.12 CLI Coding Agent - 上下文压缩

你提到实现了安全、高质量的上下文压缩，请说明上下文压缩的必要性是什么? 压缩算法是什么 (摘要式、截断式、还是混合)? 如何确保压缩后不会丢失关键信息? 压缩的触发条件是什么 (token 数阈值)?

### 3.13 CLI Coding Agent - 记忆系统

你实现了 LLM 自动记忆提取和定期记忆整理，请说明记忆是如何自动提取的 (在什么时机、提取什么内容)? 记忆整理 (定期 consolidation) 的策略是什么? 记忆如何影响后续会话的行为? 如何避免记忆膨胀?

### 3.14 CLI Coding Agent - Subagent 与 Agent Team

你实现了 worktree 文件隔离、预定义/fork 的 Subagent 和多 teammate 协作的 Agent Team，请说明: Subagent 和主 Agent 的通信机制是什么? worktree 隔离解决了什么问题? Agent Team 中的任务分配和协调是如何实现的?

### 3.15 CLI Coding Agent - MCP 接入

你提到支持 MCP (Model Context Protocol) 接入，请说明 MCP 的协议规范是什么? 你是如何实现 MCP client 的? MCP server 提供的工具是如何被发现和调用的? MCP 和直接定义工具函数相比有什么优势?
