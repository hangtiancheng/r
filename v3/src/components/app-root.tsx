import { ConfigProvider, theme } from "antd";
import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { AppFrame } from "@/components/app-frame";
import { useResumePersistence } from "@/hooks";

const EditPage = lazy(async () => {
  const module = await import("@/pages/edit-page");
  return { default: module.EditPage };
});
const ViewPage = lazy(async () => {
  const module = await import("@/pages/view-page");
  return { default: module.ViewPage };
});

function RouteFallback(): React.ReactElement {
  return (
    <div className="flex min-h-60 items-center justify-center text-sm text-slate-500">
      Loading workspace...
    </div>
  );
}

const router = createBrowserRouter([
  {
    element: <AppFrame />,
    children: [
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
    ],
  },
]);

export function AppRoot(): React.ReactElement {
  useResumePersistence();

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: "#6366f1",
          borderRadius: 10,
          fontFamily:
            "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}
