import { Layout, Tag } from "antd";
import { NavLink, Outlet } from "react-router-dom";

// cSpell: words geekblue

interface NavItemProps {
  to: string;
  label: string;
}

function NavItem(props: NavItemProps): React.ReactElement {
  return (
    <NavLink
      to={props.to}
      className={({ isActive }) =>
        [
          "rounded-lg px-3 py-1.5 text-sm font-medium transition",
          isActive
            ? "shadow-soft bg-white text-slate-900"
            : "text-slate-600 hover:bg-white/70 hover:text-slate-900",
        ].join(" ")
      }
    >
      {props.label}
    </NavLink>
  );
}

export function AppFrame(): React.ReactElement {
  return (
    <Layout className="min-h-screen bg-linear-to-b from-slate-50 via-white to-slate-100 font-sans text-slate-900">
      <div className="sticky top-0 z-20 border-b border-white/40 bg-white/70 backdrop-blur print:hidden">
        <div className="mx-auto flex max-w-350 items-center gap-4 px-4 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="shadow-soft h-9 w-9 rounded-xl bg-linear-to-br from-indigo-500 to-sky-400" />
            <div className="min-w-0">
              <div className="text-sm leading-tight font-semibold text-slate-900">
                Resume Studio
              </div>
              <div className="text-xs leading-tight text-slate-500">
                Local draft with single-page PDF export
              </div>
            </div>
          </div>

          <div className="shadow-soft flex items-center gap-2 rounded-xl bg-white/60 p-1">
            <NavItem to="/edit" label="Edit" />
            <NavItem to="/view" label="Preview" />
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Tag bordered={false} color="geekblue">
              localStorage
            </Tag>
          </div>
        </div>
      </div>

      <Layout.Content className="mx-auto w-full max-w-350 px-4 py-6">
        <Outlet />
      </Layout.Content>
    </Layout>
  );
}
