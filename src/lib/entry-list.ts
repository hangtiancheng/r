/** Immutable helpers for editing an id-keyed entry list. */
export interface EntryListActions<T extends { id: string }> {
  add: (item: T) => void;
  remove: (id: string) => void;
  update: (id: string, patch: Partial<T>) => void;
  toggleHidden: (id: string) => void;
}

export function entryListActions<T extends { id: string; hidden?: boolean }>(
  items: T[],
  onChange: (next: T[]) => void,
): EntryListActions<T> {
  return {
    add: (item) => onChange([...items, item]),
    remove: (id) => onChange(items.filter((it) => it.id !== id)),
    update: (id, patch) =>
      onChange(items.map((it) => (it.id === id ? { ...it, ...patch } : it))),
    toggleHidden: (id) =>
      onChange(
        items.map((it) => (it.id === id ? { ...it, hidden: !it.hidden } : it)),
      ),
  };
}
