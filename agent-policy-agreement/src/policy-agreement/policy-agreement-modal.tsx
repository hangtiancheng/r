import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Spin, Typography, message } from "antd";
import { useMemo, useState } from "react";
import { updateAgentPolicyAgreement } from "./api";
import type {
  AgentPolicyAgreementDecision,
  AgentPolicyAgreementModalProps,
} from "./types";

const DEFAULT_TITLE = "Usage Risk Notice";
const DEFAULT_DESCRIPTION =
  "Please review the following policy notice carefully before enabling this advanced AI capability.";
const DEFAULT_HINT =
  "Only proceed after you fully understand and accept the policy terms above.";

export const AgentPolicyAgreementModal = (
  props: AgentPolicyAgreementModalProps,
) => {
  const {
    visible,
    policyId,
    content,
    title = DEFAULT_TITLE,
    description = DEFAULT_DESCRIPTION,
    hintText = DEFAULT_HINT,
    agreeText = "Acknowledge and Continue",
    disagreeText = "Decline",
    baseURL,
    fetcher,
    onChange,
    onClose,
    onError,
  } = props;
  const [submitting, setSubmitting] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const contentNode = useMemo(() => {
    if (!content) {
      return (
        <div className="flex items-center justify-center py-8 text-slate-400">
          <Spin />
        </div>
      );
    }

    const normalized = content.replace(/<br\s*\/>|<br\s*>/gi, "\n");
    return (
      <Typography.Paragraph className="mb-0 text-sm leading-6 whitespace-pre-wrap text-slate-600">
        {normalized}
      </Typography.Paragraph>
    );
  }, [content]);

  const handleSubmit = async (decision: AgentPolicyAgreementDecision) => {
    if (submitting) {
      return;
    }

    setSubmitting(true);
    try {
      await updateAgentPolicyAgreement(
        {
          policyId,
          decision,
        },
        { baseURL, fetcher },
      );
      onChange?.(decision);
      onClose?.();
    } catch (err) {
      const error = err as Error;
      if (onError) {
        onError(error);
      } else {
        void messageApi.error(error.message || "Signature submission failed");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {contextHolder}
      <Modal
        open={visible}
        title={null}
        footer={
          <div className="flex items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 text-sm text-slate-400">
              <InfoCircleOutlined />
              <span>{hintText}</span>
            </div>
            <div className="inline-flex gap-3">
              <Button
                disabled={submitting}
                onClick={() => void handleSubmit("disagree")}
              >
                {disagreeText}
              </Button>
              <Button
                type="primary"
                loading={submitting}
                onClick={() => void handleSubmit("agree")}
              >
                {agreeText}
              </Button>
            </div>
          </div>
        }
        closable={false}
        mask={{ closable: false }}
        keyboard={false}
        destroyOnHidden={false}
        width={720}
        onCancel={onClose}
      >
        <div className="space-y-4">
          <div>
            <div className="mb-2 text-xl leading-7 font-semibold text-slate-900">
              {title}
            </div>
            <div className="text-sm leading-6 text-slate-500">
              {description}
            </div>
          </div>
          <div className="max-h-[280px] overflow-auto rounded-xl border border-black/6 bg-amber-50 p-4">
            {contentNode}
          </div>
        </div>
      </Modal>
    </>
  );
};
