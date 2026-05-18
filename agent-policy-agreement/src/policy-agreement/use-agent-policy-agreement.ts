import { useCallback, useEffect, useMemo, useState } from "react";
import { queryAgentPolicyAgreement } from "./api";
import type { AgentPolicyAgreementRecord } from "./types";

interface UseAgentPolicyAgreementOptions {
  baseURL?: string;
  fetcher?: typeof fetch;
  enabled?: boolean;
}

interface UseAgentPolicyAgreementResult {
  loading: boolean;
  error: Error | null;
  record: AgentPolicyAgreementRecord | null;
  needAgreement: boolean;
  refresh: () => Promise<void>;
}

function normalizeError(error: unknown): Error {
  return error instanceof Error
    ? error
    : new Error("queryAgentPolicyAgreement failed");
}

export const useAgentPolicyAgreement = (
  tenant: string | undefined,
  options?: UseAgentPolicyAgreementOptions,
): UseAgentPolicyAgreementResult => {
  const baseURL = options?.baseURL;
  const fetcher = options?.fetcher;
  const enabled = options?.enabled ?? true;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [record, setRecord] = useState<AgentPolicyAgreementRecord | null>(null);

  const refresh = useCallback(async (): Promise<void> => {
    if (!tenant) {
      setRecord(null);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const result = await queryAgentPolicyAgreement(tenant, {
        baseURL,
        fetcher,
      });
      setRecord(result);
    } catch (error: unknown) {
      setError(normalizeError(error));
    } finally {
      setLoading(false);
    }
  }, [baseURL, fetcher, tenant]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const timerId = window.setTimeout(() => {
      void refresh();
    }, 0);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [enabled, refresh]);

  const needAgreement = useMemo(() => {
    if (!record) {
      return false;
    }
    return record.signedStatus !== "agree";
  }, [record]);

  return {
    loading,
    error,
    record,
    needAgreement,
    refresh,
  };
};
