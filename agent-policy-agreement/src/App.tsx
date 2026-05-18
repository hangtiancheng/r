import { useCallback, useMemo, useState } from "react";
import {
  Alert,
  App as AntdApp,
  Button,
  Card,
  ConfigProvider,
  Flex,
  Tag,
  Typography,
} from "antd";
import {
  AgentPolicyAgreementBlocked,
  AgentPolicyAgreementModal,
  type AgentPolicyAgreementDecision,
  type AgentPolicyAgreementRecord,
  type AgentPolicyAgreementStatus,
  useAgentPolicyAgreement,
} from "./policy-agreement";

const POLICY_CONTENT = `Policy Notice and Responsible Use

1. AI-generated content may be incomplete, outdated, or inaccurate and should always be reviewed against the relevant business context.
2. Do not submit secrets, production credentials, regulated personal data, or any other confidential information.
3. Require human review for production changes, finance, legal, security, and any other high-risk workflows.
4. By acknowledging this notice, you confirm that you understand and accept the operational responsibilities above.`;

// cSpell: words hangtiancheng
const POLICY_ID = "agent-policy";
const TENANT = "github.com/hangtiancheng";

interface MockPolicyFetcherOptions {
  initialAgree?: AgentPolicyAgreementStatus;
  failQuery?: boolean;
  delay?: number;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const createJsonResponse = (body: unknown, init?: ResponseInit) =>
  new Response(JSON.stringify(body), {
    status: 200,
    headers: { "Content-Type": "application/json" },
    ...init,
  });

const createMockPolicyFetcher = (
  options: MockPolicyFetcherOptions = {},
): typeof fetch => {
  let signedStatus = options.initialAgree ?? "";

  return async (_input, init) => {
    if (options.delay) {
      await sleep(options.delay);
    }

    const method = init?.method ?? "GET";
    if (method === "GET") {
      if (options.failQuery) {
        return createJsonResponse({
          code: 500,
          message: "mock query policy agreement failed",
          data: null,
        });
      }

      return createJsonResponse({
        code: 0,
        message: "",
        data: {
          signed_status: signedStatus,
          policy_id: POLICY_ID,
          content: POLICY_CONTENT,
        },
      });
    }

    if (method === "PUT") {
      const body = JSON.parse((init?.body as string | undefined) ?? "{}") as {
        signed_status?: AgentPolicyAgreementDecision;
      };
      signedStatus = body.signed_status ?? signedStatus;

      return createJsonResponse({
        code: 0,
        message: "",
        data: {
          signed_status: signedStatus,
          policy_id: POLICY_ID,
          content: POLICY_CONTENT,
        },
      });
    }

    return createJsonResponse(
      {
        code: 405,
        message: `Unsupported method: ${method}`,
        data: null,
      },
      { status: 405, statusText: "Method Not Allowed" },
    );
  };
};

const statusColorMap: Record<AgentPolicyAgreementStatus | "error", string> = {
  "": "gold",
  agree: "green",
  disagree: "red",
  error: "volcano",
};

const statusTextMap: Record<AgentPolicyAgreementStatus | "error", string> = {
  "": "Pending Review",
  agree: "Accepted",
  disagree: "Declined",
  error: "Request Failed",
};

const StateCard = (props: {
  title: string;
  description: string;
  record: AgentPolicyAgreementRecord | null;
  loading: boolean;
  error: Error | null;
  needAgreement: boolean;
  onRefresh: () => void;
}) => {
  const {
    title,
    description,
    record,
    loading,
    error,
    needAgreement,
    onRefresh,
  } = props;
  const status = error ? "error" : (record?.signedStatus ?? "");

  return (
    <Card
      className="demo-card"
      title={title}
      extra={<Tag color={statusColorMap[status]}>{statusTextMap[status]}</Tag>}
    >
      <Flex vertical gap={12}>
        <Typography.Paragraph type="secondary">
          {description}
        </Typography.Paragraph>
        <Typography.Text>Loading: {String(loading)}</Typography.Text>
        <Typography.Text>
          Needs agreement: {String(needAgreement)}
        </Typography.Text>
        <Typography.Text>
          Decision: {record?.signedStatus || "unavailable"}
        </Typography.Text>
        <Typography.Text>Policy ID: {record?.policyId || "-"}</Typography.Text>
        {error ? (
          <Alert type="error" showIcon description={error.message} />
        ) : null}
        <Button onClick={onRefresh}>Refresh</Button>
      </Flex>
    </Card>
  );
};

const PolicyAgreementDemo = (
  props: MockPolicyFetcherOptions & {
    title: string;
    description: string;
  },
) => {
  const app = AntdApp.useApp();
  const { title, description, failQuery, initialAgree, delay } = props;
  const fetcher = useMemo(
    () => createMockPolicyFetcher({ failQuery, initialAgree, delay }),
    [delay, failQuery, initialAgree],
  );
  const { loading, error, record, needAgreement, refresh } =
    useAgentPolicyAgreement(TENANT, { fetcher });
  const [visible, setVisible] = useState(initialAgree !== "disagree");

  const handleChange = useCallback(
    (decision: AgentPolicyAgreementDecision) => {
      void app.message.success(`Mock submission completed: ${decision}`);
      void refresh();
    },
    [app, refresh],
  );

  if (record?.signedStatus === "disagree" && !visible) {
    return (
      <div className="w-full">
        <StateCard
          title={title}
          description={description}
          record={record}
          loading={loading}
          error={error}
          needAgreement={needAgreement}
          onRefresh={refresh}
        />
        <div className="mt-4 flex justify-center">
          <AgentPolicyAgreementBlocked onRetry={() => setVisible(true)} />
        </div>
      </div>
    );
  }

  return (
    <>
      <StateCard
        title={title}
        description={description}
        record={record}
        loading={loading}
        error={error}
        needAgreement={needAgreement}
        onRefresh={refresh}
      />
      <AgentPolicyAgreementModal
        visible={Boolean(record && needAgreement && visible)}
        policyId={record?.policyId ?? ""}
        content={record?.content ?? ""}
        fetcher={fetcher}
        onChange={handleChange}
        onClose={() => setVisible(false)}
        onError={(err) => void app.message.error(err.message)}
      />
    </>
  );
};

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#7c3aed",
          borderRadius: 12,
        },
      }}
    >
      <AntdApp>
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.08),transparent_30%),linear-gradient(180deg,#f7f5ff_0%,#ffffff_40%)]">
          <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
            <section className="mb-8 text-left">
              <Typography.Text className="mb-3 inline-block text-sm font-semibold tracking-[0.12em] text-violet-600 uppercase">
                Agent Policy Agreement
              </Typography.Text>
            </section>

            <section className="grid gap-4 md:grid-cols-2">
              <PolicyAgreementDemo
                title="Pending Signature"
                description="The service returns an empty decision, so the agreement modal opens immediately."
                initialAgree=""
              />
              <PolicyAgreementDemo
                title="Already Accepted"
                description="The service returns an accepted decision, so the page stays in a ready state."
                initialAgree="agree"
              />
              <PolicyAgreementDemo
                title="Restricted After Decline"
                description="A declined decision shows the restricted state and allows the signature flow to be reopened."
                initialAgree="disagree"
              />
              <PolicyAgreementDemo
                title="Query Failure"
                description="A non-zero response code demonstrates the error state and retry behavior."
                failQuery
              />
            </section>
          </div>
        </div>
      </AntdApp>
    </ConfigProvider>
  );
}

export default App;
