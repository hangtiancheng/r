import {
  DeleteOutlined,
  DownloadOutlined,
  FileTextOutlined,
  FormOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { Button, Modal, Segmented, Space, Tag, Typography } from "antd";
import { useMemo } from "react";
import type { ReactElement } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { ResumeHydrationState } from "@/store";

interface ResumeTopBarProps {
  hydration: ResumeHydrationState;
  onClearLocal: () => void;
  onExportPdf: () => void;
  onResetSample: () => void;
}

function HydrationTag(props: {
  hydration: ResumeHydrationState;
}): ReactElement {
  const { hydration } = props;

  if (!hydration.hydrated) {
    return <Tag color="default">Loading</Tag>;
  }

  if (hydration.source === "storage") {
    return <Tag color="green">Restored</Tag>;
  }

  return <Tag color="blue">Default</Tag>;
}

export function ResumeTopBar(props: ResumeTopBarProps): ReactElement {
  const { hydration, onClearLocal, onExportPdf, onResetSample } = props;
  const location = useLocation();
  const navigate = useNavigate();
  const currentRoute = useMemo(
    (): string => (location.pathname.startsWith("/view") ? "view" : "edit"),
    [location.pathname],
  );

  return (
    <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/75 backdrop-blur print:hidden">
      <div className="mx-auto flex max-w-350 items-center justify-between gap-4 px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
            <FileTextOutlined />
          </div>
          <div className="min-w-0">
            <Typography.Text className="block truncate text-[13px] font-semibold text-slate-900">
              Resume Editor And Exporter
            </Typography.Text>
            <div className="mt-0.5 flex items-center gap-2">
              <HydrationTag hydration={hydration} />
              {hydration.message ? (
                <Typography.Text type="secondary" className="truncate text-xs">
                  {hydration.message}
                </Typography.Text>
              ) : null}
            </div>
          </div>
        </div>

        <Segmented
          value={currentRoute}
          options={[
            {
              label: (
                <span className="inline-flex items-center gap-2">
                  <FormOutlined /> Edit
                </span>
              ),
              value: "edit",
            },
            {
              label: (
                <span className="inline-flex items-center gap-2">
                  <ReloadOutlined /> Preview
                </span>
              ),
              value: "view",
            },
          ]}
          onChange={(value): void => {
            void navigate(value === "view" ? "/view" : "/edit");
          }}
        />

        <Space wrap>
          <Button
            icon={<DownloadOutlined />}
            type="primary"
            onClick={onExportPdf}
          >
            Export PDF
          </Button>
          <Button icon={<ReloadOutlined />} onClick={onResetSample}>
            Sample
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={(): void => {
              Modal.confirm({
                title: "Clear local resume data?",
                content: "This resets the draft and overwrites localStorage.",
                okText: "Clear",
                cancelText: "Cancel",
                okButtonProps: { danger: true },
                onOk: onClearLocal,
              });
            }}
          >
            Clear
          </Button>
        </Space>
      </div>
    </div>
  );
}
