import type { ReactNode } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "cn";

export function SortableModule({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: ReactNode;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      data-module-key={id}
      className={cn(
        "relative rounded-lg pl-7",
        isDragging && "bg-accent ring-primary/25 z-10 shadow-md ring-1",
      )}
      style={{ transform: CSS.Transform.toString(transform), transition }}
    >
      <button
        ref={setActivatorNodeRef}
        type="button"
        {...attributes}
        {...listeners}
        aria-label={`拖动${label}排序`}
        title="拖动排序，也可按空格和方向键调整"
        className="text-muted-foreground/50 hover:bg-muted hover:text-foreground focus-visible:ring-ring absolute top-1 left-0 flex size-7 cursor-grab touch-none items-center justify-center rounded-md outline-none focus-visible:ring-2 active:cursor-grabbing"
      >
        <span className="grid grid-cols-2 gap-0.5" aria-hidden>
          {Array.from({ length: 6 }, (_, i) => (
            <span key={i} className="size-0.75 rounded-full bg-current" />
          ))}
        </span>
      </button>
      {children}
    </div>
  );
}
