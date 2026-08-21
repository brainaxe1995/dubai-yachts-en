import { useMemo } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Eye, EyeOff, GripVertical, Save } from "lucide-react";
import { useState } from "react";
import { yachts, parties, fishingTrips, packages } from "@/data/site";
import { applyOverrides, type ProductOverrides, type Category } from "@/lib/overrides-types";

type SaveState = { tone: "idle" | "saving" | "ok" | "err"; text: string };

const SOURCES: Record<Category, { title: string; label: string; page: string }[]> = {
  yachts: yachts.map((p) => ({ title: p.title, label: p.title, page: "/تأجير-يخوت-في-دبي/" })),
  parties: parties.map((p) => ({ title: p.title, label: p.title, page: "/حفلات-اليخوت-في-دبي/" })),
  fishing: fishingTrips.map((p) => ({ title: p.title, label: p.title, page: "/رحلات-صيد-السمك-في-دبي/" })),
  packages: packages.map((p) => ({ title: p.title, label: p.title, page: "/باقات-تأجير-اليخوت-في-دبي/" })),
};

const CAT_LABELS: Record<Category, string> = {
  yachts: "اليخوت",
  parties: "الحفلات",
  fishing: "الصيد",
  packages: "الباقات",
};

type Props = {
  overrides: ProductOverrides;
  setOverrides: React.Dispatch<React.SetStateAction<ProductOverrides>>;
  loading: boolean;
  onSave: () => void;
  saveState: SaveState;
};

export function ProductManager({ overrides, setOverrides, loading, onSave, saveState }: Props) {
  const [activeCat, setActiveCat] = useState<Category>("yachts");

  const ordered = useMemo(() => {
    // Show every source item in admin regardless of hidden state — the eye toggle
    // reflects hidden state, but the row must remain visible so the admin can
    // unhide it. We strip the hidden filter for display, then apply order only.
    const source = SOURCES[activeCat];
    return applyOverrides(source, { ...overrides, hidden: { ...overrides.hidden, [activeCat]: [] } }, activeCat);
  }, [overrides, activeCat]);

  function toggleHidden(title: string) {
    setOverrides((prev) => {
      const list = prev.hidden[activeCat];
      const nextList = list.includes(title) ? list.filter((t) => t !== title) : [...list, title];
      return { ...prev, hidden: { ...prev.hidden, [activeCat]: nextList } };
    });
  }

  function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const oldIdx = ordered.findIndex((p) => p.title === active.id);
    const newIdx = ordered.findIndex((p) => p.title === over.id);
    if (oldIdx < 0 || newIdx < 0) return;
    const reordered = arrayMove(ordered, oldIdx, newIdx);
    setOverrides((prev) => ({
      ...prev,
      order: { ...prev.order, [activeCat]: reordered.map((p) => p.title) },
    }));
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-luxe">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-foreground">Product Manager</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Drag to reorder. Toggle eye to hide/show a card on its category page. Changes go live once saved.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onSave}
            disabled={saveState.tone === "saving" || loading}
            className="inline-flex items-center gap-2 rounded-lg bg-gold px-4 py-2 text-sm font-bold text-primary-deep hover:bg-gold-deep disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save className="h-4 w-4" /> {saveState.tone === "saving" ? "Saving…" : "Save changes"}
          </button>
          {saveState.text ? (
            <span
              className={`text-sm font-semibold ${
                saveState.tone === "ok"
                  ? "text-emerald-600"
                  : saveState.tone === "err"
                    ? "text-red-600"
                    : "text-muted-foreground"
              }`}
            >
              {saveState.text}
            </span>
          ) : null}
        </div>
      </div>

      {/* Category tabs */}
      <div className="mb-4 flex flex-wrap gap-2">
        {(Object.keys(CAT_LABELS) as Category[]).map((c) => {
          const active = c === activeCat;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setActiveCat(c)}
              className={`rounded-lg border px-3 py-1.5 text-xs font-bold transition-colors ${
                active
                  ? "border-gold bg-gold/15 text-gold-deep"
                  : "border-border text-muted-foreground hover:bg-muted"
              }`}
            >
              {CAT_LABELS[c]} <span className="opacity-70">({SOURCES[c].length})</span>
            </button>
          );
        })}
      </div>

      {loading ? (
        <div className="py-8 text-center text-sm text-muted-foreground">Loading...</div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={ordered.map((p) => p.title)} strategy={verticalListSortingStrategy}>
            <ul className="space-y-2">
              {ordered.map((p) => {
                const hidden = overrides.hidden[activeCat].includes(p.title);
                return (
                  <SortableRow
                    key={p.title}
                    id={p.title}
                    label={p.label}
                    hidden={hidden}
                    onToggle={() => toggleHidden(p.title)}
                  />
                );
              })}
            </ul>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}

function SortableRow({
  id,
  label,
  hidden,
  onToggle,
}: {
  id: string;
  label: string;
  hidden: boolean;
  onToggle: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
  };
  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 rounded-lg border p-3 ${
        hidden ? "border-red-300 bg-red-50/40" : "border-border bg-background"
      }`}
    >
      <button
        type="button"
        {...attributes}
        {...listeners}
        aria-label="Drag to reorder"
        className="cursor-grab touch-none rounded p-1 text-muted-foreground hover:bg-muted active:cursor-grabbing"
      >
        <GripVertical className="h-4 w-4" />
      </button>
      <span dir="rtl" className={`flex-1 text-sm ${hidden ? "text-muted-foreground line-through" : "text-foreground"}`}>
        {label}
      </span>
      <button
        type="button"
        onClick={onToggle}
        aria-label={hidden ? "Show product" : "Hide product"}
        className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-bold transition-colors ${
          hidden
            ? "bg-red-500/15 text-red-600 hover:bg-red-500/25"
            : "bg-muted text-muted-foreground hover:bg-gold/15 hover:text-gold-deep"
        }`}
      >
        {hidden ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
        {hidden ? "Hidden" : "Visible"}
      </button>
    </li>
  );
}
