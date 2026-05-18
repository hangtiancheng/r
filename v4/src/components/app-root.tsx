import { App as AntdApp, ConfigProvider, theme } from "antd";
import { lazy, Suspense } from "react";
import type { ReactElement } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useResumePersistence } from "@/hooks";

const EditPage = lazy(async () => {
  const module = await import("@/pages/edit-page");
  return { default: module.EditPage };
});

const ViewPage = lazy(async () => {
  const module = await import("@/pages/view-page");
  return { default: module.ViewPage };
});

function RouteFallback(): ReactElement {
  return (
    <div className="flex min-h-60 items-center justify-center text-sm text-slate-500">
      Loading resume workspace...
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/edit" replace />,
  },
  {
    path: "/edit",
    element: (
      <Suspense fallback={<RouteFallback />}>
        <EditPage />
      </Suspense>
    ),
  },
  {
    path: "/view",
    element: (
      <Suspense fallback={<RouteFallback />}>
        <ViewPage />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/edit" replace />,
  },
]);

function ResumeApplication(): ReactElement {
  useResumePersistence();
  return <RouterProvider router={router} />;
}

export function AppRoot(): ReactElement {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        components: {
          Layout: {
            headerBg: "transparent",
          },
        },
        token: {
          colorPrimary: "#4f46e5",
        },
      }}
    >
      <AntdApp>
        <ResumeApplication />
      </AntdApp>
    </ConfigProvider>
  );
}
