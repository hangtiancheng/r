# 杭天cheng 面试问题集

## 项目: swifty-sentry (前端监控 SDK)

Q1. swifty-sentry 使用 rrweb 做故障现场重放，rrweb 的录制是基于 DOM 快照还是 MutationObserver? 录制产生的数据量级大概是多少? 你在实际项目中如何控制录制数据的体积，gzip 压缩后通过什么方式分片上传以避免阻塞主线程?

Q2. 白屏检测采用关键点采样方案，具体采样了哪些 DOM 节点或 CSS 属性? 如何区分"页面还在加载中"和"真正的白屏"? 采样频率如何设置才能兼顾检测准确性和性能开销? 如果页面使用了 SSR 或骨架屏，你的白屏检测逻辑是否需要调整，怎么调整?

Q3. 三级降级上报策略 (sendBeacon -> Image beacon -> fetch keepAlive) 的切换条件是什么? sendBeacon 在哪些浏览器或场景下会失败? Image beacon 有 URL 长度限制，你如何处理超长日志? fetch keepAlive 和 sendBeacon 在页面卸载阶段的行为有什么本质区别? 离线缓存到 localStorage 后，自动刷盘的触发时机和频率控制策略是什么?

## 项目: swifty-cli (CLI Coding Agent)

Q4. swifty-cli 的 Agent Loop 基于 ReAct 范式实现，在工具调用失败或 LLM 返回格式异常时，你的循环如何保证不进入死循环? 你设置了哪些退出条件 (例如最大步数、token 预算、超时)? 当一次 Agent 任务涉及多个文件修改时，如何实现原子性 (要么全部成功，要么全部回滚)?

Q5. 上下文压缩是 Agent 开发中的关键技术。swifty-cli 的上下文压缩策略是什么? 是在每轮对话后压缩还是在 token 超过阈值时压缩? 压缩时对历史消息做了什么处理 (摘要、截断、按角色过滤)? 如何保证压缩后不丢失关键上下文导致 LLM 做出错误决策? 压缩前后 token 数量的典型比例是多少?

Q6. swifty-cli 的 5 层架构和 5 层权限体系分别是什么? worktree 文件隔离的原理是什么，是利用 git worktree 还是其他机制? Subagent 和 Agent Team 协作时，子 agent 和父 agent 之间如何共享上下文? 如果两个 agent 同时修改同一个文件，你的冲突解决策略是什么?

## 工作经历: 字节 TikTok Performance

Q7. Kafka 转发到 Redis/MySQL/ClickHouse 的架构中，你是如何做消费端的流量分发? 为什么同一个数据流需要写入三种不同的存储引擎? Redis 在这里承担什么角色 (缓存、限流、还是其他)? ClickHouse 的写入是否有攒批 (batching) 策略，写入频率和批量大小如何决定? 在 Kafka consumer 端遇到过消息积压或重复消费的问题吗，怎么处理的?

Q8. Thrift IDL 生成 npm 包的具体流程是怎样的? 生成的代码是 TypeScript 还是 JavaScript? 如何处理 Thrift 的 union、struct 等类型到 TS 类型的映射? 在 BFF 层使用 Nest.js 时，前后端的接口契约如何保持一致? 你参与的 CloudWeGo Kitex 开源贡献具体做了什么，解决了什么问题?

## 工作经历: 腾讯 NoSQL DBMS

Q9. React 类组件迁移到函数组件时，你提到了闭包和数据竞争问题。能否具体描述一个你遇到的闭包陷阱场景? 例如在 useEffect 或 useCallback 中捕获了过期的 state 或 props。你在排查接口响应时间不稳定时发现的数据竞争，具体是什么竞争条件，最终怎么定位和修复的?

Q10. 后端 TCP 连接池的设计中，连接的最大数量、空闲超时、健康检查分别是怎么配置的? 在 Node.js 单线程模型下维护连接池，和 Go 语言的 goroutine 模型相比有什么不同的挑战? 当目标数据库宕机时，连接池如何处理积压的请求，有没有熔断或降级机制?

Q11. 用 valgrind 排查 Node.js 调用 C++ .so 的内存泄漏，具体的排查流程是怎样的? 你用的是 valgrind 的哪个工具 (Memcheck、Massif)? 如何区分内存泄漏发生在 V8 堆内还是 C++ 的 .so 内部? 对象池、V8 隐藏类、降低 GC 压力这些优化手段分别对应解决了什么性能瓶颈? 能否给出优化前后的具体数据对比?

## 工作经历: 字节 Data 架构

Q12. JSError 大模型自动修复的完整技术方案是什么? 具体流程是: 前端捕获 JS 错误后，如何将错误堆栈、源码上下文、Source Map 等信息喂给大模型? 大模型生成的修复代码如何验证其正确性 (单元测试、lint 检查、还是人工审核)? 修复的成功率和误修复率分别是多少? 如果大模型生成了看似正确但实际引入新 bug 的代码，你们有什么防护机制?

Q13. SWR (stale-while-revalidate) 策略在搜索推荐算法平台的前端是如何落地的? 你用的缓存 key 设计策略是什么? 当用户快速切换筛选条件时，如何避免产生大量的过期请求? 和传统的 useSWR hook 相比，你在架构层面做了哪些额外的优化 (例如请求去重、预取、或服务端缓存联动)?

## 工作经历: 阿里妈妈广告技术

Q14. Server&Schema-Driven UI 的核思想是什么? Schema 的格式是怎样的 (JSON Schema 变体还是自定义 DSL)? 服务端下发的 Schema 如何映射到前端组件树? 如果 Schema 中引用了一个前端尚未注册的组件，你的框架如何处理? 和传统的低代码平台相比，这种方案的可扩展性和性能有什么差异?

Q15. 你在 @module-federation/vite 中具体贡献了什么代码? Vite 基于 ESM 的模块加载方式和 Webpack 基于 chunk 的加载方式，在模块联邦场景下有什么本质差异? 远程模块的类型声明如何在构建时传递? 当远程模块的共享依赖版本和本地不一致时，模块联邦的运行时是如何做版本协商的?

## 基础知识: React/Vue/TypeScript

Q16. Zustand 和 Pinia 都是轻量级状态管理库，但它们的响应式实现有本质不同。Zustand 没有使用 Proxy，它依赖什么机制触发组件重渲染? Pinia 则基于 Vue3 的 reactive，Vue3 的 Proxy 响应式在深层嵌套对象中有哪些性能陷阱 (例如 Proxy 的 get trap 递归触发)? 如果让你设计一个同时支持 React 和 Vue 的跨框架状态管理方案，你会怎么做?

Q17. React Fiber 的调度机制中，时间切片 (time slicing) 的具体实现依赖 requestIdleCallback 还是自定义的调度器? 当一个高优先级更新 (如用户输入) 打断了一个低优先级的渲染任务时，已经开始渲染的 Fiber 节点如何处理? Vue3 没有采用 Fiber 架构，它是如何保证大列表更新的响应性的? 两者在调度策略上的根本区别是什么?

Q18. TypeScript 严格模式下，你如何处理第三方库缺少类型声明的问题? Zod 在运行时做 schema 验证时，它的 z.infer 类型推导和 TypeScript 的类型推断是如何联动的? 如果 Zod schema 中有递归类型 (例如树形结构)，z.infer 能正确推导吗，有什么限制? 在 monorepo 中你是如何组织共享类型定义的，如何避免类型包之间的循环依赖?

## 基础知识: Node/后端/架构

Q19. Hono.js 和 Express/Koa 在架构上有什么本质区别? Hono 支持 Cloudflare Workers、Bun、Deno 等多运行时，它是如何做到运行时无关的 (是否依赖 Web Standards API)? 在 BFF 场景下，你如何设计中间件链来处理鉴权、限流、日志等横切关注点? 如果请求在中间件链的某个环节抛出未捕获异常，框架层面的全局错误处理和业务层面的 try-catch 应该如何分工?

Q20. 在设计一个前端监控系统时 (类似你的 swifty-sentry)，如果日均 PV 达到千万级，上报端的数据需要经过哪些处理环节 (采样、聚合、压缩) 才能保证后端不被打垮? ClickHouse 相比 MySQL 在存储这类时序日志数据时有什么结构性优势? 如果让你从零设计这个系统的写入路径 (从 SDK 上报到最终落盘)，你会如何设计消息队列、写入缓冲、和存储层的架构?

---

本文档由面试官 Sisyphus 编写，用于考察候选人在各项目和工作经历中的技术深度。
