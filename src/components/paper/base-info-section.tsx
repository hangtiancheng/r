import { Fragment } from "react";
import { cn } from "cn";

import { PaperSection } from "@/components/paper/paper-section";
import { INK, INK_60 } from "@/components/paper/paper-tokens";
import { buildTags } from "@/lib/format";
import type { BaseInfo, ModuleKind } from "@/lib/types";

export interface BaseInfoSectionProps {
  base: BaseInfo;
  editing: boolean;
  onOpen: (kind: ModuleKind) => void;
  hidden?: boolean;
}

/** Name + QQ-style tag line + contact block at the top of the sheet. */
export function BaseInfoSection({
  base,
  editing,
  onOpen,
  hidden,
}: BaseInfoSectionProps) {
  const tags = buildTags(base);
  return (
    <PaperSection kind="base" editing={editing} onOpen={onOpen} hidden={hidden}>
      <div className="min-w-0">
        <h1 className={cn("text-lg leading-6 font-bold", INK)}>
          {base.name || "姓名"}
        </h1>
        {tags.length > 0 && (
          <div
            className={cn("mt-1 flex flex-wrap items-center leading-5", INK)}
          >
            {tags.map((tag, i) => (
              <Fragment key={i}>
                {i > 0 && <span className="mx-1.5 text-[#c9d2dc]">|</span>}
                <span>{tag}</span>
              </Fragment>
            ))}
          </div>
        )}
        <div className={cn("mt-1.5 grid gap-y-0.5 leading-5", INK_60)}>
          {(base.location || base.hometown) && (
            <div className="flex flex-wrap gap-x-6">
              {base.location && <span>所在地：{base.location}</span>}
              {base.hometown && <span>籍贯：{base.hometown}</span>}
            </div>
          )}
          <div className="flex flex-wrap gap-x-6">
            {base.email && <span>{base.email}</span>}
            {base.tel && <span>+86 {base.tel}</span>}
          </div>
        </div>
      </div>
    </PaperSection>
  );
}
