import type {
  AgentPolicyAgreementDecision,
  AgentPolicyAgreementRecord,
} from "./types";

interface ApiResponse<T> {
  code: number;
  message?: string;
  data: T;
}

interface AgentPolicyAgreeDataWire {
  signed_status?: string;
  policy_id?: string;
  content?: string;
}

const normalizeRecord = (
  data: AgentPolicyAgreeDataWire,
): AgentPolicyAgreementRecord => ({
  signedStatus: (data.signed_status ??
    "") as AgentPolicyAgreementRecord["signedStatus"],
  policyId: data.policy_id ?? "",
  content: data.content ?? "",
});

const normalizeBaseURL = (baseURL?: string) => {
  if (!baseURL) {
    return "";
  }
  return baseURL.endsWith("/") ? baseURL.slice(0, -1) : baseURL;
};

export const queryAgentPolicyAgreement = async (
  tenant: string,
  options?: {
    baseURL?: string;
    fetcher?: typeof fetch;
  },
): Promise<AgentPolicyAgreementRecord> => {
  const baseURL = normalizeBaseURL(options?.baseURL);
  const fetcher = options?.fetcher ?? fetch;

  const res = await fetcher(
    `${baseURL}/api/v1/agent/policy_agree?tenant=${encodeURIComponent(tenant)}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
    },
  );

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `queryAgentPolicyAgreement failed: ${res.status} ${res.statusText}${text ? `: ${text}` : ""}`,
    );
  }

  const json = (await res.json()) as ApiResponse<AgentPolicyAgreeDataWire>;
  if (!json || json.code !== 0) {
    throw new Error(json?.message || "queryAgentPolicyAgreement failed");
  }

  return normalizeRecord(json.data);
};

export const updateAgentPolicyAgreement = async (
  input: {
    policyId: string;
    decision: AgentPolicyAgreementDecision;
  },
  options?: {
    baseURL?: string;
    fetcher?: typeof fetch;
  },
): Promise<AgentPolicyAgreementRecord> => {
  const baseURL = normalizeBaseURL(options?.baseURL);
  const fetcher = options?.fetcher ?? fetch;

  const res = await fetcher(`${baseURL}/api/v1/agent/policy_agree`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      policy_id: input.policyId,
      signed_status: input.decision,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `updateAgentPolicyAgreement failed: ${res.status} ${res.statusText}${text ? `: ${text}` : ""}`,
    );
  }

  const json = (await res.json()) as ApiResponse<AgentPolicyAgreeDataWire>;
  if (!json || json.code !== 0) {
    throw new Error(json?.message || "updateAgentPolicyAgreement failed");
  }

  return normalizeRecord(json.data);
};
