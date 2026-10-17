import { Suspense, lazy } from "react";
import { LightbulbIcon } from "lucide-react";
import type { ComponentProps } from "react";
import type { LucideIcon } from "lucide-react";

const LazyModuleIcon = lazy(async () => {
  const { resolveModuleIcon } = await import("@/lib/icons-registry");
  function ModuleIconComponent({
    name,
    ...props
  }: { name: string } & ComponentProps<LucideIcon>) {
    const Icon = resolveModuleIcon(name);
    return <Icon {...props} />;
  }
  return { default: ModuleIconComponent };
});

export function ModuleIcon(
  props: { name: string } & ComponentProps<LucideIcon>,
) {
  return (
    <Suspense
      fallback={<LightbulbIcon className={props.className} aria-hidden />}
    >
      <LazyModuleIcon {...props} />
    </Suspense>
  );
}
