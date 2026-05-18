import type { PropsWithChildren, ReactNode } from "react";

interface IProps {
  header: ReactNode;
}

function Index(props: PropsWithChildren<IProps>) {
  const { header, children } = props;
  return (
    <section className="card border-base-300 bg-base-100 border shadow-sm">
      <div className="card-body gap-2 p-4">
        <div className="text-base font-semibold">{header}</div>
        <div className="divider my-0" />
        <div className="space-y-1">{children}</div>
      </div>
    </section>
  );
}

export default Index;
