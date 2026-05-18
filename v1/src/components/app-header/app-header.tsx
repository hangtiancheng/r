import { Badge, Button, Divider, Space, Switch } from "antd";
import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import type { ResumeDensity } from "@/types";

// cSpell: words geekblue

interface AppHeaderProps {
  density: ResumeDensity;
  exporting: boolean;
  isEditRoute: boolean;
  onExportPdf: () => void;
  onReset: () => void;
  onRestoreDefault: () => void;
  onToggleDensity: (checked: boolean) => void;
}

export function AppHeader(props: AppHeaderProps): ReactElement {
  const {
    density,
    exporting,
    isEditRoute,
    onExportPdf,
    onReset,
    onRestoreDefault,
    onToggleDensity,
  } = props;

  return (
    <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-sm font-semibold text-white shadow-sm">
          CV
        </div>
        <div className="leading-none">
          <div className="text-sm font-semibold tracking-wide text-slate-900">
            Resume Editor
          </div>
          <div className="text-xs text-slate-500">
            React 19, Ant Design 6, schema validation, single-page PDF export
          </div>
        </div>
        <Badge
          count={density === "compact" ? "Compact" : "Cozy"}
          color="geekblue"
        />
      </div>
      <div className="flex items-center gap-2">
        <Space.Compact>
          <Button type={isEditRoute ? "primary" : "default"}>
            <Link to="/edit">Edit</Link>
          </Button>
          <Button type={isEditRoute ? "default" : "primary"}>
            <Link to="/view">Preview</Link>
          </Button>
        </Space.Compact>
        <Divider orientation="vertical" className="mx-1" />
        <Space size={10}>
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1">
            <span className="text-xs text-slate-600">Density</span>
            <Switch
              checked={density === "compact"}
              checkedChildren="Compact"
              unCheckedChildren="Cozy"
              onChange={onToggleDensity}
            />
          </div>
          <Button type="primary" loading={exporting} onClick={onExportPdf}>
            Export PDF
          </Button>
          <Button onClick={onRestoreDefault}>Restore Default</Button>
          <Button danger onClick={onReset}>
            Reset
          </Button>
        </Space>
      </div>
    </div>
  );
}
