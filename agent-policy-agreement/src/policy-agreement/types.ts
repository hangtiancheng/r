export type AgentPolicyAgreementDecision = "agree" | "disagree";
export type AgentPolicyAgreementStatus = AgentPolicyAgreementDecision | "";

export interface AgentPolicyAgreementRecord {
  policyId: string;
  content: string;
  signedStatus: AgentPolicyAgreementStatus;
}

export interface AgentPolicyAgreementModalProps {
  visible: boolean;
  policyId: string;
  content: string;
  title?: string;
  description?: string;
  hintText?: string;
  agreeText?: string;
  disagreeText?: string;
  baseURL?: string;
  fetcher?: typeof fetch;
  onChange?: (decision: AgentPolicyAgreementDecision) => void;
  onClose?: () => void;
  onError?: (error: Error) => void;
}

export interface AgentPolicyAgreementBlockedProps {
  title?: string;
  description?: string;
  actionText?: string;
  onRetry?: () => void;
}
