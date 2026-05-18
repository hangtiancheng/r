import type { ReactElement } from "react";
import { ResumeShell } from "./resume-shell";
import { App as AntdApp, ConfigProvider } from "antd";

export function AppRoot(): ReactElement {
  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            headerBg: "transparent",
          },
        },
      }}
    >
      <AntdApp>
        <ResumeShell />
      </AntdApp>
    </ConfigProvider>
  );
}
