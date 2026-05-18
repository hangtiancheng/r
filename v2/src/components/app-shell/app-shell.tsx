import { DeleteOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Layout, Menu, theme } from "antd";
import { useAtomValue, useSetAtom } from "jotai";
import { lazy, Suspense, useEffect, useMemo, useRef } from "react";
import {
  createBrowserRouter,
  Link,
  Navigate,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import { resetResumeAtom, resumeAtom, saveResumeToLocalStorage } from "@/store";

const { Header, Content } = Layout;

const EditPage = lazy(async () => {
  const module = await import("@/pages/edit-page");
  return { default: module.EditPage };
});

const PreviewPage = lazy(async () => {
  const module = await import("@/pages/preview-page");
  return { default: module.PreviewPage };
});

function RouteFallback(): React.ReactElement {
  return (
    <div className="flex min-h-60 items-center justify-center text-sm text-slate-500">
      Loading resume workspace...
    </div>
  );
}

function AppShell(): React.ReactElement {
  const location = useLocation();
  const resume = useAtomValue(resumeAtom);
  const resetResume = useSetAtom(resetResumeAtom);
  const saveTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (saveTimerRef.current !== null) {
      window.clearTimeout(saveTimerRef.current);
    }

    saveTimerRef.current = window.setTimeout(() => {
      saveResumeToLocalStorage(resume);
    }, 400);

    return () => {
      if (saveTimerRef.current !== null) {
        window.clearTimeout(saveTimerRef.current);
      }
    };
  }, [resume]);

  const selectedKey = useMemo((): string => {
    return location.pathname.startsWith("/preview") ? "/preview" : "/edit";
  }, [location.pathname]);

  return (
    <ConfigProvider
      theme={{
        cssVar: { prefix: "rs" },
        token: {
          colorPrimary: "#6d28d9",
        },
        algorithm: theme.defaultAlgorithm,
        components: {
          Layout: {
            headerBg: "transparent",
          },
        },
      }}
    >
      <Layout className="min-h-screen bg-linear-to-b from-slate-50 via-white to-slate-100 font-sans text-slate-900">
        <Header className="flex items-center justify-between bg-white/70 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="text-base font-semibold tracking-tight text-slate-900">
              Resume Studio
            </div>
            <Menu
              mode="horizontal"
              selectedKeys={[selectedKey]}
              items={[
                { key: "/edit", label: <Link to="/edit">Edit</Link> },
                { key: "/preview", label: <Link to="/preview">Preview</Link> },
              ]}
              style={{ background: "transparent" }}
            />
          </div>

          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => {
              resetResume();
            }}
          >
            Reset
          </Button>
        </Header>

        <Content className="bg-transparent">
          <Suspense fallback={<RouteFallback />}>
            {selectedKey === "/preview" ? <PreviewPage /> : <EditPage />}
          </Suspense>
        </Content>
      </Layout>
    </ConfigProvider>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/edit" replace />,
  },
  {
    path: "/edit",
    element: <AppShell />,
  },
  {
    path: "/preview",
    element: <AppShell />,
  },
  {
    path: "*",
    element: <Navigate to="/edit" replace />,
  },
]);

export function App(): React.ReactElement {
  return <RouterProvider router={router} />;
}
