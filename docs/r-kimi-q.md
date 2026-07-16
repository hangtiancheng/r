# 深度技术面试提问文档

> 基于候选人简历定制，覆盖项目经历、工作经历、技能点三大维度。每个问题包含主问题 + 2-3 个追问层次，旨在考察原理理解、实践细节与踩坑经验。

---

## 一、项目经历：@swifty/sentry 前端监控 SDK

### Q1. 发布订阅架构与 core+plugin 解耦设计

你在 Sentry SDK 中采用了发布订阅架构和 core+plugin 解耦设计。请详细描述这个架构的分层边界：core 层具体承担哪些职责，plugin 通过什么机制注入，事件在 core 和 plugin 之间的流转协议是怎样的？

- 追问 1：如果两个 plugin 都监听了同一个事件（比如 `error.captured`），它们的执行顺序如何保证？是否存在优先级机制或依赖声明？当某个 plugin 抛出异常时，是否会影响其他 plugin 的执行和 core 的上报流程？
- 追问 2：在实际使用中，有没有遇到过 plugin 之间状态耦合的问题？比如一个 plugin 修改了事件对象后，下游 plugin 拿到了不符合预期的数据。你是如何通过类型约束或运行时校验来解决这类问题的？
- 追问 3：这套架构如果要支持异步 plugin（比如需要远程拉取配置才能决定是否采样），你的事件流模型需要做哪些改造？

### Q2. 错误捕获的完整性与去重策略

SDK 覆盖了资源加载错误、JSError、Promise 未处理异常、XHR/Fetch 请求失败等多种错误类型。请说明每种错误的捕获入口和关键实现细节，特别是如何区分"业务代码主动抛出的 Promise reject"和"真正的未处理异常"？

- 追问 1：LRU + 去重的具体实现是什么？LRU 的容量如何确定？去重的 key 是如何生成的——是纯 stack fingerprint，还是结合了 message、filename、lineno 等多维度信息？有没有遇到过不同错误被误判为相同而丢失的情况？
- 追问 2：对于跨域脚本的错误（`Script error.`），你在 SDK 层面做了哪些处理？是否要求接入方配合 CORS 头，还是在 SDK 内部有兜底的信息补全策略？
- 追问 3：Fetch/XHR 拦截中，如何避免对 SDK 自身的上报请求产生递归捕获？你在 monkey-patch 原生 API 时做了哪些防御性编程？

### Q3. 白屏检测关键点采样与性能指标采集

你提到了白屏检测关键点采样和 LCP/FCP/CLS/INP 等 Web Vitals 指标采集。请解释白屏检测的核心算法：关键点是如何选取的，采样的时机和频率是什么，如何区分"真正的白屏"和"内容尚未渲染完成的正常状态"？

- 追问 1：PerformanceObserver 在不同浏览器版本中的兼容性差异很大，特别是 INP 指标是较新的标准。你在 SDK 中是如何做 polyfill 或降级的？对于不支持 PerformanceObserver 的环境，是否有 fallback 方案？
- 追问 2：CLS 的计算涉及 layout shift 的累积，SPA 路由切换时 CLS 是否需要重置？你在 SDK 中如何处理 SPA 场景下的指标归属问题——是按页面维度还是按会话维度聚合？
- 追问 3：这些性能指标的采集本身是否会引入性能开销？你有没有做过 benchmark，SDK 开启全部采集后对页面 FCP/LCP 的影响量级是多少？

### Q4. rrweb 屏幕录制与三级降级上报

SDK 集成了 rrweb + gzip 进行屏幕录制，并实现了 sendBeacon → Image beacon → fetch keepAlive 三级降级上报。请描述 rrweb 录制数据的体积控制策略：是全量录制还是增量快照，gzip 压缩比大约多少，单条录制数据的典型大小范围？

- 追问 1：三级降级的触发条件是什么？是运行时探测能力还是按固定顺序尝试？sendBeacon 有 64KB 的大小限制，当录制数据超过这个阈值时，你是分片发送还是直接跳到下一级？Image beacon 在实际生产中的成功率如何，有没有遇到 CSP 策略阻断的情况？
- 追问 2：localStorage 离线缓存的设计细节：缓存 key 的命名策略、容量上限、过期清理机制是什么？当用户清除 localStorage 或隐私模式下 storage 不可用时，SDK 的行为是什么？
- 追问 3：rrweb 录制会监听 DOM 变更，这在高动态页面（如无限滚动列表、实时数据刷新）上可能产生大量 mutation 事件。你在实践中是否遇到过录制导致页面卡顿的问题？做了哪些优化？

---

## 二、项目经历：@swifty/swifty CLI Coding Agent

### Q5. 五层架构与 ReAct Agent Loop 设计

CLI Coding Agent 采用了五层架构和 ReAct 范式的 Agent Loop。请从外到内描述这五层各自的职责边界，以及 ReAct 循环中 Thought → Action → Observation 的具体实现：每一轮的输出是如何解析的，工具调用的结果是如何回注到上下文中的？

- 追问 1：ReAct 范式在实践中容易出现"死循环"或"无效重复调用"的问题。你在 Agent Loop 中设置了哪些防护机制——比如最大迭代次数、重复动作检测、token 消耗预算？当 Agent 陷入循环时，用户体验层面的反馈是什么？
- 追问 2：System Prompt 的设计是这个项目的核心难点之一。你的 System Prompt 结构是怎样的，如何平衡"指令精确性"和"token 效率"？有没有做过 A/B 测试或 prompt 版本管理来量化不同 prompt 对任务完成率的影响？
- 追问 3：多 LLM provider 的支持意味着不同模型的输出格式、tool calling 协议可能有差异。你是如何做 provider 抽象层的？当某个 provider 返回了不符合预期的格式时，解析层的容错策略是什么？

### Q6. 五层权限系统与 MCP 集成

你设计了五层权限系统。请逐层说明每一层的权限粒度和校验时机，以及权限决策是在 Agent Loop 的哪个环节介入的——是在 Action 生成后立即校验，还是在工具执行前才拦截？

- 追问 1：MCP（Model Context Protocol）在你的 Agent 中扮演什么角色？它是作为工具的一种还是作为独立的上下文注入通道？当 MCP server 返回的数据量很大时，你是如何做截断或摘要的？
- 追问 2：权限系统中是否有"记忆"能力——比如用户对某个操作授权过一次后，后续相同操作是否可以自动放行？如果有，这个记忆的存储和失效策略是什么？
- 追问 3：Subagent 和 Agent Team 场景下，权限是如何继承或隔离的？父 Agent 拥有的权限是否自动传递给子 Agent，还是需要显式授权？

### Q7. 上下文压缩与会话持久化

Agent 在长对话中必然面临上下文窗口溢出的问题。你的上下文压缩策略具体是什么——是基于摘要、滑动窗口、还是重要性评分？压缩的触发时机和粒度如何控制？

- 追问 1：会话持久化和记忆提取是两个不同的概念。持久化保存的是原始对话历史还是压缩后的表示？记忆提取是从历史对话中抽取结构化知识还是保留原文片段？这两者在新一轮对话中是如何协同工作的？
- 追问 2：上下文压缩不可避免地会丢失信息。你有没有评估过压缩前后 Agent 任务完成质量的变化？是否有机制让用户感知到"之前的某些上下文已被压缩"并提供恢复手段？
- 追问 3：跨会话记忆的存储介质是什么？如果是本地文件，如何解决多实例并发写入的冲突？如果是向量数据库，embedding 模型的选择和检索召回率如何保证？

### Q8. Worktree 文件隔离与 Hook/Skill/Slash Command

Worktree 文件隔离是为了让 Agent 的操作不影响用户的工作目录。请说明 worktree 的创建、同步和清理生命周期，以及 Agent 的文件读写操作是如何被重定向到 worktree 中的？

- 追问 1：Hook 机制的生命周期钩子有哪些（pre-tool-call、post-tool-call、on-error 等）？Hook 的执行环境是什么，是否有沙箱隔离？用户编写的恶意 Hook 是否可能对 Agent 造成安全风险？
- 追问 2：Skill 和 Slash Command 的区别是什么？Skill 是否可以组合调用，是否有版本管理和依赖解析？当多个 Skill 注册了相同的命令名时，冲突如何解决？
- 追问 3：Agent Team 中多个 Subagent 并行工作时，它们各自的 worktree 之间是否需要共享文件？如果需要，同步机制是什么，如何避免写冲突？

---

## 三、工作经历深挖

### Q9. TikTok Performance：Kafka 消费链路与 ClickHouse 写入

在 TikTok Performance 团队，你负责 Kafka → Redis/MySQL/ClickHouse 的数据消费链路。请描述这条链路的数据模型：消息的 schema 是什么，消费端的并发模型是怎样的（partition 级别还是 consumer group 级别），写入 ClickHouse 时用的是批量插入还是流式写入？

- 追问 1：ClickHouse 的写入性能高度依赖于批次大小和数据排序。你在实践中如何确定最优的 batch size？写入时是否按时间或某个维度做了预排序以优化查询性能？有没有遇到过写入延迟突增的问题，根因是什么？
- 追问 2：Golang + Kitex 的技术选型背景是什么？相比直接用 Go 原生 HTTP/gRPC，Kitex 带来了哪些具体收益？你在参与 CloudWeGo Kitex 开源贡献时，解决了什么问题，PR 的 review 过程中学到了什么？
- 追问 3：Thrift npm 包的维护中，有没有遇到过 Thrift IDL 变更导致的上下游不兼容问题？你是如何做版本管理和向后兼容的？

### Q10. TikTok Performance：BFF Nest.js + React 可视化

你用 Nest.js 搭建 BFF 层，React + Semi Design + Echarts 做前端可视化。请说明 BFF 层在这个场景中的核心价值——是直接透传后端接口，还是做了数据聚合/裁剪/缓存？虚拟滚动在哪个具体场景中使用的，数据量级多大？

- 追问 1：Echarts 在大数据量渲染时的性能瓶颈通常在哪里？你做了哪些优化——是数据降采样、canvas 分层渲染、还是 web worker 离屏计算？
- 追问 2：Nest.js 的 DI 容器和模块化架构在这个 BFF 项目中是如何组织的？有没有遇到过循环依赖或模块初始化顺序的问题？
- 追问 3：coze-js 开源贡献的具体内容是什么？你在贡献过程中如何理解一个陌生代码库的架构，如何确保你的改动不破坏现有功能？

### Q11. 腾讯 IEG：React 类组件迁移与闭包陷阱

你将 React 类组件迁移到函数组件。请举一个具体的迁移案例：原类组件的状态管理模式是什么，迁移后用了哪些 hooks 替代，过程中遇到了哪些闭包相关的数据竞争问题？

- 追问 1：`useEffect` 的依赖数组遗漏是迁移中最常见的 bug 来源。你是如何系统性地排查这类问题的——是靠 code review、lint 规则、还是运行时检测？有没有遇到过"加了依赖反而导致无限循环"的情况，如何解决的？
- 追问 2：类组件的 `componentDidUpdate` 中有 prevProps/prevState 对比逻辑，迁移到函数组件后这部分逻辑如何优雅地表达？你是否封装了自定义 hook 来处理这种模式？
- 追问 3：迁移后的性能表现如何？有没有因为 hooks 的使用不当（比如在循环中调用、不必要的 re-render）导致性能反而下降的情况？

### Q12. 腾讯 IEG：TCP 连接池与 C++ 动态链接库

你负责 TCP 连接池和 C++ .so 动态链接库加解密。请描述连接池的实现：连接的生命周期管理、空闲检测、健康检查机制是什么？Node.js 侧是如何通过 addon 或 FFI 调用 C++ .so 的？

- 追问 1：C++ 加解密模块的接口设计是怎样的？密钥是如何传递和管理的——是硬编码、环境变量、还是通过安全通道注入？加解密操作的耗时对整体请求延迟的影响有多大？
- 追问 2：valgrind 排查内存泄漏时，最棘手的一个 case 是什么？泄漏的根因是什么，修复后如何验证确实解决了问题？
- 追问 3：v8 隐藏类和对象池优化的具体做法是什么？你是如何确认优化生效的——是通过 v8 profiler、`--print-opt-code`，还是业务指标的提升？GC 优化中调整了哪些参数，依据是什么？

### Q13. 字节搜索推荐：JSError 大模型自动修复与 SWR 优化

你在搜索推荐平台做了 JSError 大模型自动修复。请描述这个系统的端到端流程：错误日志如何采集和聚类，prompt 如何构造，LLM 生成的修复建议如何验证和展示给用户？

- 追问 1：JSError 的 stack trace 往往经过混淆或压缩，你在送入 LLM 之前是否做了 source map 还原或上下文补全？LLM 生成的修复代码是否有自动化验证环节（比如跑单测或 lint），还是完全依赖人工审核？
- 追问 2：SWR 在前端性能优化中的具体应用是什么？你们遇到的缓存一致性问题是什么，stale-while-revalidate 的策略参数是如何调优的？
- 追问 3：A2UI React 框架的接入体验如何？它与传统 React 开发模式的核心差异是什么，学习曲线和生态成熟度方面的痛点有哪些？

### Q14. 阿里妈妈：Server&Schema-Driven UI 与模块联邦

你在阿里妈妈做 Server&Schema-Driven UI 和 Webpack/Vite 模块联邦。请解释 Schema-Driven UI 的 schema 设计：它描述的是组件树结构、数据绑定关系，还是两者兼有？服务端下发的 schema 变更如何实现热更新而不刷新页面？

- 追问 1：Webpack Module Federation 和 Vite Module Federation 在实际使用中有什么关键差异？你在贡献 `@module-federation/vite` 时解决了什么具体问题？Vite 的 ESM 原生特性给模块联邦带来了哪些 Webpack 没有的挑战？
- 追问 2：模块联邦在生产环境中如何做版本管理和灰度发布？当远程模块加载失败时，fallback 策略是什么？
- 追问 3：Schema-Driven UI 的安全性考量：服务端下发的 schema 如果包含恶意组件引用或 XSS payload，客户端渲染层做了哪些防护？

---

## 四、技能点深度追问

### Q15. React Fiber 架构理解

你在技能中提到了 React Fiber。请从调度器的角度解释 Fiber 的工作原理：时间切片是如何实现的，优先级队列如何排序，lanes 模型相比旧的 expirationTime 模型解决了什么问题？

- 追问 1：在实际项目中，你有没有利用过 Fiber 的特性做过性能优化——比如 `useTransition`、`useDeferredValue`、或者手动调整优先级？效果如何？
- 追问 2：Concurrent Mode 下，副作用的执行时机与 Legacy Mode 有什么不同？这对 `useEffect` 的使用有什么影响？

### Q16. Zustand 状态管理与大型应用实践

你使用 Zustand 作为状态管理方案。相比 Redux/MobX，Zustand 的核心优势在你的实际项目中体现在哪里？当 store 变大时，你是如何组织 selector 以避免不必要的 re-render？

- 追问 1：Zustand 的 middleware（persist、devtools、immer 等）在你的项目中是如何组合使用的？有没有遇到过 persist middleware 与服务端状态同步的冲突？
- 追问 2：在 monorepo 多包共享状态的场景下，Zustand 的 store 是如何组织和导出的？是否有跨包状态依赖的问题？

### Q17. Node.js BFF 架构与 Hono.js/Nest.js 选型

你的技能中包含 Express/Koa/Hono.js/Nest.js 多种 Node.js 框架。请从实际项目经验出发，比较 Hono.js 和 Nest.js 的适用场景：在什么情况下你会选择 Hono.js 而不是 Nest.js，反之亦然？

- 追问 1：Hono.js 主打轻量和边缘运行时支持。你在 BFF 场景中是否利用了它的中间件生态？与 Nest.js 的 guard/interceptor/pipe 体系相比，Hono 的中间件模型有什么不足？
- 追问 2：BFF 层的可观测性你是如何建设的——日志、链路追踪、指标监控分别用了什么方案？

### Q18. Go 语言在后端服务中的实践

你在多个项目中使用了 Go。请谈谈 Go 的 goroutine 调度模型（GMP）在你的实际服务中带来的优势和需要注意的陷阱。有没有遇到过 goroutine 泄漏或 channel 死锁的问题？

- 追问 1：Go 的错误处理（显式 err check vs panic/recover）在你的项目中是如何规范的？有没有引入 error wrapping 或自定义 error type 的模式？
- 追问 2：Redis 在你的架构中主要承担什么角色——缓存、分布式锁、还是消息队列？用过哪些高级数据结构（Stream、HyperLogLog 等）？

### Q19. Zod 类型安全与 Schema 校验

你在技能中提到了 Zod。请描述 Zod 在你的项目中的典型用法：是仅用于运行时校验，还是同时作为类型推导的来源（`z.infer`）？与 TypeScript 的类型系统是如何协同的？

- 追问 1：Zod schema 在前后端共享的场景下，你是如何组织的——是放在共享包中，还是各自定义再对齐？schema 变更时的 breaking change 如何检测和通知？
- 追问 2：Zod 的 `.transform()` 和 `.refine()` 在复杂校验场景中如何使用？有没有遇到过 transform 导致类型推导断裂的问题？

### Q20. CI/CD 与工程化实践

你在多个大厂工作过，接触过不同的 CI/CD 体系。请谈谈你在前端工程化方面最有价值的一次实践：解决了什么问题，方案是什么，量化收益如何？

- 追问 1：monorepo 的构建缓存和增量构建你是如何配置的？turbo/nx/pnpm workspace 各有什么优劣？
- 追问 2：前端发布流程中，如何做灰度验证和快速回滚？有没有建设过自动化的发布质量门禁？

---

## 附录：面试评估维度参考

| 维度     | 关注点                                                     |
| -------- | ---------------------------------------------------------- |
| 原理深度 | 能否从源码/规范层面解释技术选型，而非仅停留在 API 使用     |
| 实践细节 | 能否说出具体的参数、阈值、trade-off，而非泛泛而谈          |
| 踩坑经验 | 是否有真实的问题排查和解决经历，能否复盘根因               |
| 系统设计 | 架构决策是否有清晰的理由，是否考虑了可扩展性和边界情况     |
| 开源贡献 | 贡献的质量、review 过程中的沟通、对社区的理解              |
| 学习能力 | 面对新技术（A2UI、MCP、Module Federation）的上手速度和深度 |
