# 杭天铖 - 面试深度提问

## 字节跳动 (TikTok Performance)

### 1. Kitex 是什么? 在 TikTok Performance 团队中如何与 Thrift 配合使用?

- Kitex 相比 gRPC-Go 的核心优势是什么? 为什么字节内部选择 Kitex 而不是 gRPC?
- Thrift IDL 定义 service 和 struct 后, 生成的 Go 桩代码内部如何完成编解码? 性能瓶颈在哪里?
- 你们的 Kitex 服务单机 QPS 大概是多少? 做过哪些性能调优?

### 2. Kafka 转发数据到 Redis/MySQL/ClickHouse 的整体数据链路如何设计?

- 三种存储各承担什么职责? 为什么不用一种存储解决所有问题?
- Kafka consumer group 的消费延迟 (lag) 如何监控? 消费积压时怎么处理?
- ClickHouse 写入用的是 batch insert 还是单条 insert? batch 大小怎么定的?
- 数据在 Kafka 到存储之间有没有做重试? exactly-once 还是 at-least-once?

### 3. 多层缓存设计具体是哪些层? 各级命中率如何?

- 缓存一致性如何保证? 用的是 cache-aside 还是 write-through?
- Redis 集群缓存的 key 设计是什么? 有没有热点 key 问题?
- 如果 Redis 挂了, 你的 fallback 策略是什么?
- 缓存穿透/击穿/雪崩分别怎么防?

### 4. Thrift 生成 npm 包给 BFF 消费, 这解决了什么问题?

- 跨团队协作收益如何? 节省了多少联调时间?
- CI 流程中 Thrift 文件变更如何自动触发 npm 包发布?
- 如果后端字段重命名了但前端还没升级, 怎么兼容?
- 生成的 TypeScript 类型定义和 Go 的 struct 之间如何做版本对齐?

### 5. 你参与的 CloudWeGo Kitex 开源项目贡献了什么?

- 具体改了哪些文件? PR 合入 main 了吗?
- 你优化的连接池回收逻辑, 之前的 O(n) 瓶颈在什么场景下暴露?
- generic call 的 benchmark 结果是什么? 比生成桩代码慢多少?
- connection pool 在 context cancel 时未归还连接的 bug 是怎么发现的?

### 6. 虚拟滚动列表的具体实现原理是什么?

- 你是用现有库 (react-virtualized/react-window) 还是自己实现的? 为什么?
- 动态行高场景下, 二分查找定位行索引的具体逻辑是什么?
- 滚动到底部加载更多的场景, 如何预加载?
- 如果列表项高度差异很大 (比如 48px 到 200px), 性能优化有什么额外的考量?

## 腾讯 (IEG)

### 7. React 类组件迁移到函数组件的具体步骤和难点是什么?

- 迁移过程中如何保证功能的正确性? 有什么回归测试策略?
- componentDidMount 拆成多个 useEffect 时, 如何避免副作用重复执行?
- getDerivedStateFromProps 在函数组件中怎么替代?
- 有没有遇到过迁移后行为不一致的 case? 具体是什么?

### 8. 什么是"未捕获的闭包"问题? 你的项目里具体是什么场景?

- useEffect 的依赖数组遗漏时, 除了行为异常, ESLint 能完全拦住吗?
- useRef 存值和 useState 存值在闭包捕获上有什么本质区别?
- 如果业务逻辑真的需要读"旧的" state 值, 你怎么办?
- 从类组件迁移过来后, 这类问题为什么在函数组件中更常见?

### 9. 接口响应时间不稳定导致的数据竞争是什么问题?

- AbortController 方案中, 如果 abort 后服务端已经处理完了, 是不是浪费了?
- 请求序号方案和 AbortController 方案怎么选? 各自的 tradeoff 是什么?
- 你用的 SWR 方案能覆盖所有竞态场景吗? SWR 内部的去重机制原理是什么?
- 如果用户快速切换 5 个 Tab, 同时有 5 个 in-flight 请求, 怎么保证状态正确?

### 10. TCP 连接池的实现要考虑哪些问题?

- 你的池化策略中, 为什么用 Go channel 做队列而不是 sync.Pool?
- 连接健康检查用 SetReadDeadline(1ms) 探测, 1ms 够用吗? 网络抖动会不会误判?
- 池满了之后, 除了返回 ErrPoolExhausted, 有没有做连接扩容?
- 空闲回收的 goroutine 和主业务 goroutine 之间有竞争吗? 怎么处理的?

### 11. 进程池调用 C++ .so 动态链接库的具体方式是什么?

- 为什么不用 N-API 直接写 Node addon? 技术选型决策的 tradeoff 是什么?
- ffi-napi 的 JS 与 C++ 之间的类型映射是怎么做的? Buffer 参数怎么传?
- C++ 侧 crash 的话, worker 进程退出后 cluster 重启的延迟有多大?
- 进程间 IPC 用的是什么序列化? JSON 还是 Protobuf? 序列化开销占比多大?

### 12. valgrind 排查 Node + C++ .so 内存泄漏的具体流程是什么?

- valgrind 在 macOS 上不好用 (不支持 macOS 14+), 你是怎么绕过的? Linux 虚拟机?
- 除了 valgrind 还用了什么工具? heaptrack 和 AddressSanitizer 各有什么优势?
- 三处泄漏点中, C++ 侧全局缓存 map 的 LRU 淘汰策略具体怎么实现的?
- ffi-napi 分配的 Buffer 为什么没被 GC 回收? 这个和 V8 的 Buffer pool 有关系吗?

### 13. 对象池、v8 隐藏类在 Node 中如何优化 GC?

- V8 的 Scavenge 和 Mark-Sweep 的触发条件分别是什么?
- 你维护的对象池大小 (1000) 是怎么定的? 为什么不是 500 或 5000?
- 隐藏类 transition 的具体过程是什么? 为什么 delete 属性会导致退化为字典模式?
- GC 停顿降低的指标是 P50 还是 P99? 怎么验证的?

## 字节跳动 (Data-架构部门)

### 14. JSError 大模型自动修复的整体架构是什么?

- LLM 是通过哪个具体的模型做修复的? GPT-4o 还是内部的豆包?
- prompt 中除了错误信息和源码, 还注入了哪些上下文? 有没有检索相关的修复案例?
- patch 的格式是 unified diff 还是直接的代码替换? 为什么选这个格式?
- 如果 LLM 返回的 patch 语法错误, 有没有自动重试? 重试时 prompt 怎么调整?

### 15. 自动修复的准确率是多少? 如何衡量收益?

- 62% 通过单测和 45% 人工 review 合入, 中间差距的 17% 主要是什么原因?
- MTTR 从 4.2 天降到 0.8 天, 这个是端到端指标还是只算了 LLM 修复的时间?
- 有没有对比过自动修复和人工修复的代码质量? 比如 lint 通过率?
- 长尾错误覆盖率的提升, 有没有一个具体的量化数据?

### 16. SWR 前端性能优化具体做了什么?

- SWR (stale-while-revalidate) 的核心原理是什么? 和 React Query 区别在哪?
- 你提到的 prefetch, 在用户没有 hover 的情况下怎么做预取?
- optimistic update 失败 rollback 时, 如果用户已经看到了乐观更新的结果, UI 怎么处理?
- SWR 的全局 cache 有没有 size 限制? 内存泄漏怎么防?

### 17. A2UI 是什么框架? 接入过程有什么难点?

- A2UI (Agent to UI) 的具体应用场景是什么? 是给内部 AI 助手用的还是面向客户的?
- Schema 到 React 组件树的映射, 是动态 import 组件还是全部预加载?
- 流式渲染的中间态处理, 你用了哪些 ErrorBoundary 策略?
- action bridge 回调 Agent 时, 如果网络断了, 用户体验怎么处理?

## 阿里巴巴 (阿里妈妈)

### 18. Server&Schema-Driven UI 的理念是什么?

- 和传统的 low-code 平台 (如 OutSystems、Mendix) 有什么本质区别?
- Schema 中 data 绑定表达式用 safe-eval 引擎, 安全性怎么保证?
- Schema 灰度下发的机制是什么? CDN 缓存还是服务端控制?
- 运营配置错误的 Schema 有没有校验? 怎么防止把线上搞崩?

### 19. 模块联邦是什么?

- 模块联邦和微前端 (qiankun、Module Federation) 本质区别在哪?
- shared scope 配置 singleton: true 时, 如果有两个应用需要的 React 版本不一样怎么办?
- 模块联邦的 remoteEntry.js 加载失败时, fallback 策略是什么?
- 子应用之间共享状态是怎么做的? 有没有跨应用的 store?

### 20. @module-federation/vite 相比 Webpack 模块联邦有什么差异?

- 你修复的 HMR 不生效问题, 具体的 root cause 是什么?
- Vite 的 ESM 原生加载模式下, remote 模块的依赖解析是怎么做的?
- Rollup 的 manualChunks 和 Webpack 的 splitChunks 对模块联邦的影响有什么不同?
- 你的 PR 中测试用例是怎么写的? 覆盖了哪些场景?

### 21. Webpack 和 Vite 模块联邦接入的区别和难点是什么?

- 迁移一个项目从 Webpack 到 Vite 并且保持模块联邦功能, 最大的坑是什么?
- shared 依赖的版本协商, Webpack 和 Vite 在运行时行为有什么不同?
- 有没有遇到过 federated 模块的 CSS 样式冲突? 怎么隔离的?

## 项目: @swifty/sentry SDK

### 22. 发布订阅架构如何设计?

- EventBus 的实现有没有考虑内存泄漏? handler 引用没被解除的情况怎么处理?
- plugin 之间依赖图如果有环怎么办? 有没有做拓扑排序检测?
- Transport 接口抽象的粒度是什么? 是单个事件上报还是批量上报?
- 为什么不用标准的中间件 (middleware) 模式, 而选了 pub-sub?

### 23. JSError 上报后如何通过 source map 还原故障现场?

- 上报时使用 sendBeacon, 如果 sendBeacon 失败怎么办?
- source map 上传到 OSS 的时机是什么? 构建时还是部署时?
- mozilla/source-map 库的 originalPositionFor 的时间复杂度是多少? 大量错误还原时会不会慢?
- 错误 stack 的 fingerprint 归一化具体怎么做? 如何处理动态路由参数 (如 /user/:id)?

### 24. rrweb 的原理是什么?

- rrweb 全量快照序列化为什么不用 innerHTML? 逐节点序列化的优势是什么?
- 对 canvas 的 toDataURL 捕获, 有没有隐私安全问题? 用户输入会不会被录进去?
- rrweb 的 MutationObserver 回调中, 高频 mutation 的 merge 算法是什么?
- 对性能影响多大? 有没有做过 A/B 测试验证?

### 25. 白屏检测的关键点采样是什么?

- 关键点采样对 SPA 路由切换的页面怎么处理? 会不会误判?
- 如果页面主要内容在首屏以下 (需要滚动才能看到), 白屏检测会不会误报?
- 阈值 30% 是怎么定的? 有没有做过调优实验?
- 有没有遇到过假阳性 (误报白屏) 或假阴性 (漏报真实白屏) 的 case?

### 26. LCP/FCP/CLS/INP 这些指标是如何采集的?

- PerformanceObserver 注册晚了可能错过事件, 你怎么处理 buffered: true?
- CLS 中的 hadRecentInput 排除逻辑, 500ms 的阈值是 Google 定义的吗? 可以自定义吗?
- INP 指标的 P98 取值为什么排除最慢的 2%? 如果只有 5 次交互怎么取?
- 你的 SDK 在采集这些指标时, 有没有遇到过和 Chrome 的 Web Vitals 扩展数值不一致的情况?

### 27. 三级降级上报策略的具体逻辑是什么?

- 有限状态机的状态转换图是什么? 怎么防止状态机在极端情况下卡在某个中间状态?
- localStorage 的 5MB 容量限制, 如果用户的浏览器已经存了很多其他站的数据, 写入失败怎么办?
- exponential backoff 最大 30s, 如果用户一直不开新 Tab, 离线数据永远不上报吗?
- gzip 压缩后的数据, 服务端怎么知道要用 gzip 解压? 通过 Content-Encoding header?

### 28. SDK 包体积太大影响首屏加载怎么办?

- 你的主包从 52KB 降到 8KB gzip, 具体每个 plugin 各占多少?
- fflate 替换 pako, 压缩率和速度对比是什么?
- requestIdleCallback 延迟加载非关键部分, 如果 idle 一直不来怎么办? fallback 是什么?
- terser 的 pure_getters 配置有什么副作用? 什么时候不能用?

## 项目: @swifty/swifty CLI Agent

### 29. 5 层架构具体是哪 5 层?

- 为什么是 5 层? 4 层或 6 层行不行?
- CLI 交互层用 Ink 渲染, 有没有考虑过 blessed/ink 的性能限制?
- 上下文压缩引擎放在基础设施层而不是 Agent 编排层, 是怎么考虑的?
- 层间的接口隔离具体怎么做到? 用 TypeScript interface 还是抽象类?

### 30. ReAct 范式的 Agent Loop 具体实现是什么?

- Agent Loop 的最大迭代次数 30 轮是怎么定的? 为什么不是 20 或 50?
- tool_call 的 JSON 解析用的是什么方案? 有没有处理过 LLM 输出格式错误的 case?
- 和 Chain-of-Thought 的区别, 你能不能用一个具体例子说明?
- token 用量追踪是在 Provider 层还是 Agent 编排层? 怎么做到精确统计?

### 31. 5 层权限系统每一层是什么?

- 如果用户在 dangerous 模式下执行了危险操作 (rm -rf), 你的系统能阻止吗?
- 目录范围层 (worktree 配置) 和全局策略层的关系是什么?
- 权限系统的配置格式是什么? 是 TOML 还是 YAML?
- 为什么不用更简单的 3 层权限? 5 层的复杂度是不是过度设计?

### 32. 上下文压缩的具体算法是什么?

- 用 summarizer 小模型压缩, 会不会丢失关键信息? 怎么保证压缩质量?
- 动态裁剪时截断 tool_result, 如果被截断的部分是修复错误的关键代码行怎么办?
- tiktoken 的精度怎么样? 不同模型的 tokenizer 需要分别处理吗?
- 100 轮对话的 benchmark 任务中, 78% 的成功率是怎么测出来的?

### 33. MCP 接入的具体方式是什么?

- MCP 的 JSON-RPC 协议, tools/list 和 tools/call 的响应格式是什么?
- stdio transport 和 HTTP SSE transport 的选择依据是什么?
- 如果 MCP server crash 了, Agent 的恢复策略是什么?
- 多个 MCP server 暴露的同名工具怎么处理冲突?

### 34. 会话持久化和跨会话记忆提取如何设计?

- SQLite 存储 JSON 消息, 为什么不用专门的向量数据库做记忆检索?
- embedding 模型用的什么? dim 维度多少? 检索延迟多大?
- 记忆整理中"30 天未引用降权", 降权的具体算法是什么? 线性衰减还是指数衰减?
- 有没有遇到过记忆污染 (错误记忆影响后续任务) 的情况? 怎么处理?

### 35. worktree、Subagent、Agent Teams 的设计参考了 Claude Code, 有什么异同?

- Claude Code 的实现细节你是怎么了解到的? 有没有源码级的对照?
- message broker 的 EventBus 实现, 如果两个 subagent 同时 publish 相同 topic 会不会冲突?
- worktree 自动 merge 时, 如果两个 subagent 修改了同一个文件的同一行, 怎么处理?
- subagent 崩溃后从 SQLite 恢复进度, 恢复到什么粒度? 恢复工具调用的中间结果吗?

## 技能深度提问

### 36. React Fiber 架构了解多少?

- 时间切片中每个时间片 5ms 是怎么定的? 为什么不用 3ms 或 8ms?
- Lane 模型用 32 位 bitmask, SyncLane 和 IdleLane 的二进制表示是什么? 为什么要用位运算?
- Concurrent Mode 下 transition 的实现原理是什么? startTransition 做了什么?
- 你说"了解 Fib er 架构", 能具体到 reconciler 的 beginWork 和 completeWork 吗?

### 37. Vue3 响应式原理和 Vue2 的区别是什么?

- Vue3 的 lazy proxy 在大对象场景下的性能提升, 有没有量化数据?
- effect 和 watch 的区别是什么? computed 是怎么基于 effect 实现的?
- Vue3 的 reactivity 模块可以脱离 Vue 单独使用, 为什么?
- 你知道 Vue3 的 compiler 优化 (静态提升、补丁标记) 吗? 和响应式原理有什么关系?

### 38. Zustand 和 Redux 相比优势是什么?

- Zustand 的 selector 是怎么实现细粒度订阅的? immer middleware 的原理是什么?
- useState 的 batch 更新在 React 18 后有什么变化? Automatic Batching 的原理是什么?
- useReducer 在性能敏感场景下, 和 useSyncExternalStore 怎么选?
- Zustand 有没有 SSR 支持问题? 服务端渲染时的状态怎么初始化的?

### 39. Vite 相比 Webpack 快的根本原因是什么?

- esbuild 为什么比 babel/swc 快 10-100x? 底层优化手段是什么?
- Vite 的依赖预构建 (optimizeDeps) 具体做了什么? 什么时候会重新预构建?
- Webpack 5 的 persistent cache 能弥补 Vite 的快吗? 什么情况下 Webpack 可能更快?
- Vite 的 dev server 和 Rollup plugin 生态兼容性, 你遇到过什么问题?

### 40. Go 的 goroutine 调度和 Node 的事件循环有何不同?

- GMP 模型中 P 的数量默认等于 CPU 核心数, 为什么不能更多?
- goroutine 的 2KB 初始栈, 在什么场景下会触发扩容? 扩容到什么大小?
- channel 的底层实现是什么? 和 sync.Mutex 相比, 什么时候用哪个?
- 在 TikTok Performance 团队选 Go 而不是 Node 做后端, 有没有做过技术对比方案?
- Go 的 GC 和 Node (V8) 的 GC 有什么区别? STW 时间对比如何?
