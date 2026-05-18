import {
  Button,
  ConfigProvider,
  Layout,
  Modal,
  Spin,
  Typography,
  message,
} from "antd";
import dayjs from "dayjs";
import type { ReactElement } from "react";
import { lazy, Suspense, useRef, useState } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import { AppHeader } from "@/components/app-header";
import { useResume } from "@/hooks";
import type { ResumeDensity } from "@/types";
import { exportElementToSinglePagePdf } from "@/utils";

const EditPage = lazy(async () => {
  const module = await import("./edit-page");
  return { default: module.EditPage };
});

const ViewPage = lazy(async () => {
  const module = await import("./view-page");
  return { default: module.ViewPage };
});

function RouteLoadingFallback(): ReactElement {
  return (
    <div className="flex min-h-96 items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <Spin size="large" />
        <span className="text-sm text-slate-500">Loading page...</span>
      </div>
    </div>
  );
}

function ResumeWorkspace(): ReactElement {
  const location = useLocation();
  const previewRef = useRef<HTMLDivElement | null>(null);
  const [density, setDensity] = useState<ResumeDensity>("compact");
  const [exporting, setExporting] = useState<boolean>(false);
  const [resetModalOpen, setResetModalOpen] = useState<boolean>(false);
  const { doc, resetToEmpty, restoreDefault, updateDoc } = useResume();
  const isEditRoute = location.pathname.startsWith("/edit");

  async function handleExportPdf(): Promise<void> {
    const previewElement = previewRef.current;
    if (previewElement === null) return;
    try {
      setExporting(true);
      await exportElementToSinglePagePdf({
        element: previewElement,
        fileName: `${doc.resume.basics.name.trim() || "resume"}.pdf`,
      });
      message.success("Exported the PDF.");
    } catch (error) {
      console.error(error);
      message.error("Failed to export the PDF. Please try again.");
    } finally {
      setExporting(false);
    }
  }

  return (
    <ConfigProvider
      theme={{ token: { colorPrimary: "#4f46e5", borderRadius: 10 } }}
    >
      <Layout className="min-h-screen bg-linear-to-br from-slate-50 via-white to-indigo-50 text-slate-900">
        <Layout.Header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 px-5 backdrop-blur">
          <AppHeader
            density={density}
            exporting={exporting}
            isEditRoute={isEditRoute}
            onExportPdf={(): void => {
              void handleExportPdf();
            }}
            onReset={(): void => setResetModalOpen(true)}
            onRestoreDefault={restoreDefault}
            onToggleDensity={(checked): void =>
              setDensity(checked ? "compact" : "cozy")
            }
          />
        </Layout.Header>
        <Layout.Content className="mx-auto w-full max-w-7xl flex-1 px-5 py-6">
          <Suspense fallback={<RouteLoadingFallback />}>
            {isEditRoute ? (
              <EditPage
                density={density}
                doc={doc}
                onChange={updateDoc}
                previewRef={previewRef}
              />
            ) : (
              <ViewPage density={density} doc={doc} previewRef={previewRef} />
            )}
          </Suspense>
        </Layout.Content>
        <Layout.Footer className="border-t border-slate-200 bg-white/70 text-center text-xs text-slate-500">
          Data is stored only in local storage. Last saved at{" "}
          {dayjs(doc.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
        </Layout.Footer>
      </Layout>
      <Modal
        title="Reset resume?"
        open={resetModalOpen}
        onCancel={(): void => setResetModalOpen(false)}
        okText="Reset"
        okButtonProps={{ danger: true }}
        cancelText="Cancel"
        onOk={(): void => {
          setResetModalOpen(false);
          resetToEmpty();
        }}
      >
        <Typography.Paragraph className="mb-0 text-sm text-slate-600">
          This clears the current local draft and starts from a blank document.
        </Typography.Paragraph>
        <div className="mt-3">
          <Button
            type="link"
            className="p-0"
            onClick={(): void => {
              setResetModalOpen(false);
              restoreDefault();
            }}
          >
            Use the default resume instead
          </Button>
        </div>
      </Modal>
    </ConfigProvider>
  );
}

const router = createBrowserRouter([
  {
    path: "/edit",
    element: <ResumeWorkspace />,
  },
  {
    path: "/view",
    element: <ResumeWorkspace />,
  },
  {
    path: "*",
    element: <Navigate replace to="/edit" />,
  },
]);

export function ResumeShell(): ReactElement {
  return <RouterProvider router={router} />;
}
