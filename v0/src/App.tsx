import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type MouseEvent,
} from "react";
import Base from "./components/base";
import List from "./components/list";
import { resumeSchema, type THeaders, type TEduExperience } from "./schemas";

type TEduExperienceList = TEduExperience[];

function App() {
  const [headers, setHeaders] = useState<THeaders>({
    eduExperience: "教育经历",
    devAbilities: "开发能力",
    jobExperience: "职业经历",
    projectExperience: "项目经历",
    researchExperience: "科研经历",
  });

  const [isChanging, setIsChanging] = useState(false);
  const [name, setName] = useState("杭天铖");
  const [tel, setTel] = useState("15395377789");

  const telHref = useMemo(() => `tel:${tel}`, [tel]);

  const [email, setEmail] = useState("161043261@qq.com");
  const emailHref = useMemo(() => `mailto:${email}`, [email]);

  const [github, setGithub] = useState("hangtiancheng");
  const githubHref = useMemo(() => `https://github.com/${github}`, [github]);

  const [myInfo, setMyInfo] = useState("男, 23, 硕士, 前端/全栈工程师");

  const [eduExperienceList, setEduExperienceList] =
    useState<TEduExperienceList>([
      ["高中: 2016-2019", "安徽省南陵中学", "理科"],
      ["本科: 2019-2023", "西安电子科技大学", "微电子科学与工程"],
      ["硕士: 2024-2027", "南京邮电大学", "计算机技术"],
    ]);

  const [devAbilitiesList, setDevAbilitiesList] = useState<string[]>([
    "了解大模型的多模态, 提示词增强, 会话记忆, 结构化输出, 检索增强生成 (RAG), topK 最相关文档切片, mcp 模型上下文协议, mcp 工具调用与开发, 大模型护轨 (guardrail), SSE 流式响应",
    "熟悉 CSS, 熟悉 CSS 预处理器, 模块化, 原子化, CSS-in-JS",
    "熟悉 JS/TS, 了解 monorepo, Rush.js",
    "熟悉 Node.js, 熟悉 Express.js, Nest.js; 有 BFF 层, Node.js 后端开发经验",
    "熟悉 JSX/TSX, 熟悉 React, Zustand, react-router; 了解 React Fiber 架构",
    "熟悉 Vue3, Pinia, vue-router, 了解 Vue3 响应式原理",
    "熟悉数据结构, 计算机网络, 设计模式",
    "熟悉 Git, CI/CD",
    "熟悉 Vite, 了解 Webpack",
    "了解 Go, MySQL, Redis 等后端技术栈",
    "了解 Web 性能指标, 性能优化, 前端监控",
    "了解 SSR, Next.js",
  ]);

  const [jobExperienceList, setJobExperienceList] = useState<string[]>([
    "字节跳动: 2025-06 ~ 2025-09, 产品研发与工程架构部门, TikTok 安卓性能优化团队, 负责对安卓设备性能数据进行数据处理, 可视化渲染; 安卓设备性能数据使用 Kafka 转发入库到 MySQL, ClickHouse 和 Redis; 后端使用 Golang 和字节后端框架 Kitex, 编写 Thrift 生成 Node.js API, 提供给 BFF 层调用 RPC 方法, 编写 LRU 内存缓存减轻数据库压力; BFF 层使用 Nest.js, 调用后端提供的 RPC 方法, 暴露 HTTP 接口给前端; 前端使用 React, Zustand, react-router 文件路由, 抖音组件库 Semi Design, Echarts; 使用 React 性能优化 Hooks, 编写虚拟滚动列表; 实习中参与 CloudWeGo Kitex 和扣子 coze-js 的开源工作",
    "腾讯: 2025-10 ~ 2026-2, IEG 互动娱乐事业群, 基础技术产品部, 负责腾讯 NoSQL 数据库 TcaplusDB 管理系统; 前端负责迁移 React 类组件到函数组件, 使用性能优化 hooks 避免重复请求, 优化组件性能, 排查闭包引用和接口响应时间过长导致的数据竞争问题; 后端负责编写 TCP 连接池; 编写 ffi-napi 绑定 C++ 函数, 维护进程池调用 C++ 动态链接库以加解密, 解析表文件; 使用 valgrind 排查 Node.js 和 C++ 动态链接库的内存泄漏问题, 复用大数组和大结构体降低 Node.js 侧 GC 压力",
    "字节跳动: 2026-02 至今, Data-架构部门, ByteRec 搜索推荐算法平台开发, ByteRec 是面向字节跳动全业务的搜索推荐算法解决方案",
  ]);
  const [projectExperienceList, setProjectExperienceList] = useState<string[]>([
    "前端埋点/性能监控, 仓库链接: https://github.com/hangtiancheng/lark-sentry; lark-sentry 是一个使用 monorepo 的前端监控 SDK, 支持异常捕获、性能指标采集、白屏检测及用户行为重放。异常捕获模块支持捕获 js 运行时错误、资源加载错误、未捕获的 promise 异常、xhr 和 fetch 请求错误, 监控点击事件、路由跳转等用户行为。性能指标采集模块计算 LCP/FCP/CLS/INP 等 web-vitals 指标, 使用 Observer API 计算首屏渲染时间。SDK 支持白屏检测, 实现基于关键点采样的白屏检测算法, 以区分骨架屏与真实白屏。为重放故障现场, SDK 支持屏幕录制, 故障发生时使用 rrweb + gzip 记录现场, 使用 navigator.sendBeacon 作为首选数据上报方式, 并提供 fetch 降级方案。整体架构使用发布订阅, 实现 core 模块和多个监控字模块的解耦, 具有高扩展性与可维护性",
    "AI Agent 项目, 仓库链接: https://github.com/hangtiancheng/ai-agent; ai-agent 是一个使用 react 和 koa 的 AI Agent 全栈项目; 前端使用 vite, react, tailwindcss 和 jotai, 通过 tanstack-query 管理异步状态, 缓存请求数据; 使用 zod + react-hook-form 保证端到端类型安全; 使用 SSE 流式响应和虚拟滚动列表, 保证长对话的渲染性能; 后端使用 koa, jwt, lru-cache, redis 和 mysql, 使用 knex 参数化查询器避免 sql 注入; 使用工厂模式实现 OpenAI/Ollama 可插拔模型, 使用内存向量存储实现 RAG 检索查询增强",
  ]);
  const [researchExperienceList, setResearchExperienceList] = useState<
    string[]
  >(["科研方向: 强化学习辅助计算机网络拥塞控制, 多核并行化网络仿真"]);

  const handleContextMenu = <T,>(e: MouseEvent<T>) => {
    e.preventDefault();
    if (isChanging) {
      setLocalStorageResume();
    } else {
      getLocalStorageResume();
    }
    setIsChanging(!isChanging);
  };

  const handleClearEduExperience = (idx: number) => {
    const newEduExperienceList = [...eduExperienceList];
    newEduExperienceList[idx] = ["", "", ""];
    setEduExperienceList(newEduExperienceList);
  };

  const setLocalStorageResume = useCallback(() => {
    localStorage.setItem(
      "resume",
      JSON.stringify({
        headers,
        name,
        tel,
        email,
        github,
        myInfo,
        eduExperienceList,
        devAbilitiesList,
        jobExperienceList,
        projectExperienceList,
        researchExperienceList,
      }),
    );
  }, [
    headers,
    name,
    tel,
    email,
    github,
    myInfo,
    eduExperienceList,
    devAbilitiesList,
    jobExperienceList,
    projectExperienceList,
    researchExperienceList,
  ]);

  const getLocalStorageResume = () => {
    const resumeStr = localStorage.getItem("resume");
    if (resumeStr) {
      const res = resumeSchema.safeParse(JSON.parse(resumeStr));
      if (!res.success) {
        console.error("Invalid resume:", res.error);
        return;
      }
      const resume = res.data;
      setHeaders(resume.headers);
      setName(resume.name);
      setTel(resume.tel);
      setEmail(resume.email);
      setGithub(resume.github);
      setMyInfo(resume.myInfo);
      setEduExperienceList(resume.eduExperienceList);
      setDevAbilitiesList(resume.devAbilitiesList);
      setJobExperienceList(resume.jobExperienceList);
      setProjectExperienceList(resume.projectExperienceList);
      setResearchExperienceList(resume.researchExperienceList);
    }
  };

  useEffect(() => {
    return setLocalStorageResume;
  }, [setLocalStorageResume]);

  return (
    <div className="bg-base-200 text-base-content min-h-dvh w-full">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-4 py-5">
        {isChanging ? (
          <div className="card border-base-300 bg-base-100 border shadow-sm">
            <div className="card-body gap-2 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className="badge badge-ghost cursor-pointer"
                    onContextMenu={handleContextMenu}
                  >
                    Edit Mode
                  </span>
                </div>
                <button
                  className="btn btn-sm btn-outline btn-secondary"
                  onClick={() => {
                    localStorage.removeItem("resume");
                  }}
                >
                  clear localStorage
                </button>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <label className="flex flex-col gap-1.5">
                  <span className="text-base-content/80 text-sm font-medium">
                    姓名
                  </span>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Input your name"
                    className="input input-ghost input-sm w-full"
                  />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-base-content/80 text-sm font-medium">
                    基本信息
                  </span>
                  <input
                    value={myInfo}
                    onChange={(e) => setMyInfo(e.target.value)}
                    placeholder="Input your gender, age, education, expected job"
                    className="input input-ghost input-sm w-full"
                  />
                </label>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                <label className="flex flex-col gap-1.5">
                  <span className="text-base-content/80 text-sm font-medium">
                    Tel
                  </span>
                  <input
                    value={tel}
                    onChange={(e) => setTel(e.target.value)}
                    className="input input-ghost input-sm w-full"
                  />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-base-content/80 text-sm font-medium">
                    Email
                  </span>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input input-ghost input-sm w-full"
                  />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-base-content/80 text-sm font-medium">
                    GitHub
                  </span>
                  <input
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    className="input input-ghost input-sm w-full"
                  />
                </label>
              </div>
            </div>
          </div>
        ) : (
          <div className="card border-base-300 bg-base-100 border shadow-sm">
            <div className="card-body gap-2 p-4">
              <div
                className="flex flex-wrap items-center gap-2"
                onContextMenu={handleContextMenu}
              >
                <h1 className="cursor-pointer text-2xl font-bold">{name}</h1>
              </div>
              <p className="text-base-content/80">{myInfo}</p>
              <div className="flex flex-wrap gap-3 text-sm">
                <div className="flex items-center gap-1.5">
                  <span className="badge badge-outline">Tel</span>
                  <a href={telHref} className="link link-primary">
                    {tel}
                  </a>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="badge badge-outline">Email</span>
                  <a href={emailHref} className="link link-primary">
                    {email}
                  </a>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="badge badge-outline">Github</span>
                  <a
                    href={githubHref}
                    className="link link-primary"
                    target="_blank"
                    rel="noopener"
                  >
                    {githubHref}
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        <Base
          header={
            isChanging ? (
              <input
                value={headers.eduExperience}
                onChange={(e) =>
                  setHeaders((headers) => ({
                    ...headers,
                    eduExperience: e.target.value,
                  }))
                }
                placeholder="Education Experience"
                className="input input-ghost input-sm w-full max-w-xs"
              />
            ) : (
              headers.eduExperience
            )
          }
        >
          {isChanging ? (
            <ul className="space-y-2">
              {eduExperienceList.map(([fromTo, university, major], idx) => (
                <li
                  className="grid items-start gap-2 md:grid-cols-[1.1fr_1.6fr_1fr_auto]"
                  key={idx}
                >
                  <input
                    value={fromTo}
                    placeholder="From to"
                    onChange={(e) => {
                      const newEduExperienceList = [...eduExperienceList];
                      newEduExperienceList[idx][0] = e.target.value;
                      setEduExperienceList(newEduExperienceList);
                    }}
                    className="input input-ghost input-sm w-full"
                  />

                  <input
                    value={university}
                    placeholder="University"
                    onChange={(e) => {
                      const newEduExperienceList = [...eduExperienceList];
                      newEduExperienceList[idx][1] = e.target.value;
                      setEduExperienceList(newEduExperienceList);
                    }}
                    className="input input-ghost input-sm w-full"
                  />

                  <input
                    value={major}
                    placeholder="Major"
                    onChange={(e) => {
                      const newEduExperienceList = [...eduExperienceList];
                      newEduExperienceList[idx][2] = e.target.value;
                      setEduExperienceList(newEduExperienceList);
                    }}
                    className="input input-ghost input-sm w-full"
                  />

                  <button
                    onClick={() => handleClearEduExperience(idx)}
                    className="btn btn-outline btn-secondary btn-sm w-full md:w-20"
                  >
                    clear
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="space-y-1 text-sm">
              {eduExperienceList.map(([fromTo, university, major], idx) => (
                <li className="grid gap-1.5 md:grid-cols-3" key={idx}>
                  <div>{fromTo}</div>
                  <div>{university}</div>
                  <div>{major}</div>
                </li>
              ))}
            </ul>
          )}
        </Base>

        <List
          isChanging={isChanging}
          header={
            isChanging ? (
              <input
                value={headers.devAbilities}
                onChange={(e) =>
                  setHeaders((headers) => ({
                    ...headers,
                    devAbilities: e.target.value,
                  }))
                }
                placeholder="Development Abilities"
                className="input input-ghost input-sm w-full max-w-xs"
              />
            ) : (
              headers.devAbilities
            )
          }
          itemList={devAbilitiesList}
          setItemList={setDevAbilitiesList}
        />

        <List
          isChanging={isChanging}
          header={
            isChanging ? (
              <input
                value={headers.jobExperience}
                onChange={(e) =>
                  setHeaders((headers) => ({
                    ...headers,
                    jobExperience: e.target.value,
                  }))
                }
                placeholder="Job Experience"
                className="input input-ghost input-sm w-full max-w-xs"
              />
            ) : (
              headers.jobExperience
            )
          }
          itemList={jobExperienceList}
          setItemList={setJobExperienceList}
        />

        <List
          isChanging={isChanging}
          header={
            isChanging ? (
              <input
                value={headers.projectExperience}
                onChange={(e) =>
                  setHeaders((headers) => ({
                    ...headers,
                    projectExperience: e.target.value,
                  }))
                }
                placeholder="Project Experience"
                className="input input-ghost input-sm w-full max-w-xs"
              />
            ) : (
              headers.projectExperience
            )
          }
          itemList={projectExperienceList}
          setItemList={setProjectExperienceList}
        />

        <List
          isChanging={isChanging}
          header={
            isChanging ? (
              <input
                value={headers.researchExperience}
                onChange={(e) =>
                  setHeaders((headers) => ({
                    ...headers,
                    researchExperience: e.target.value,
                  }))
                }
                placeholder="Research Experience"
                className="input input-ghost input-sm w-full max-w-xs"
              />
            ) : (
              headers.researchExperience
            )
          }
          itemList={researchExperienceList}
          setItemList={setResearchExperienceList}
        />
      </div>
    </div>
  );
}

export default App;
