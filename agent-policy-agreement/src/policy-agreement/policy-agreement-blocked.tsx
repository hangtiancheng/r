import { CloseCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import type { AgentPolicyAgreementBlockedProps } from "./types";

export const AgentPolicyAgreementBlocked = (
  props: AgentPolicyAgreementBlockedProps,
) => {
  const {
    title = "Access Restricted",
    description = "You declined the policy agreement, so access to this AI capability is currently restricted for security and compliance reasons.",
    actionText = "Request Signature Again",
    onRetry,
  } = props;

  return (
    <div className="w-full max-w-[360px] rounded-[24px] border border-black/6 bg-white px-6 py-7 text-center shadow-sm">
      <div className="mx-auto mb-3 inline-flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 text-2xl text-red-500">
        <CloseCircleOutlined />
      </div>
      <div className="mb-2 text-xl leading-7 font-semibold text-slate-900">
        {title}
      </div>
      <div className="mb-5 text-sm leading-6 text-slate-500">{description}</div>
      <Button type="primary" block onClick={() => onRetry?.()}>
        {actionText}
      </Button>
    </div>
  );
};
