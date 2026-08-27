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
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Eye, EyeOff, GripVertical, Save, Copy, Check } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { yachts, parties, fishingTrips, packages } from "@/data/site";
import { applyOverrides, type ProductOverrides, type Category } from "@/lib/overrides-types";

type SaveState = { tone: "idle" | "saving" | "ok" | "err"; text: string };

type SourceItem = { title: string; label: string; page: string; image: string; price?: string };

const SOURCES: Record<Category, SourceItem[]> = {
  home: yachts.slice(0, 6).map((p) => ({ title: p.title, label: p.title, page: "/", image: p.image, price: p.price })),
  yachts: yachts.map((p) => ({ title: p.title, label: p.title, page: "/yacht-rental-dubai/", image: p.image, price: p.price })),
  parties: parties.map((p) => ({ title: p.title, label: p.title, page: "/yacht-party-dubai/", image: p.image, price: p.price })),
  fishing: fishingTrips.map((p) => ({ title: p.title, label: p.title, page: "/fishing-trip-dubai/", image: p.image, price: p.price })),
  packages: packages.map((p) => ({ title: p.title, label: p.title, page: "/yacht-packages-dubai/", image: p.image, price: p.price })),
};

const CAT_LABELS: Record<Category, string> = {
  home: "Home Page",
  yachts: "Yacht Rental",
  parties: "Yacht Party",
  fishing: "Fishing Trip",
  packages: "Packages",
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

  // Native category for a product = the category whose SOURCES contains it.
  function nativeCatOf(title: string): Category | null {
    for (const c of Object.keys(SOURCES) as Category[]) {
      if (SOURCES[c].some((p) => p.title === title)) return c;
    }
    return null;
  }

  // Toggle a product's presence in a target category (via overrides.copies).
  // No-op if target = native category (product lives there anyway).
  function toggleCopy(title: string, targetCat: Category) {
    setOverrides((prev) => {
      const nat = nativeCatOf(title);
      if (nat === targetCat) return prev;
      const list = prev.copies?.[targetCat] ?? [];
      const nextList = list.includes(title) ? list.filter((t) => t !== title) : [...list, title];
      return { ...prev, copies: { ...prev.copies, [targetCat]: nextList } };
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
            Grid mirrors the frontend layout. Drag any image to reorder. Click <strong>Visible / Hidden</strong> to
            toggle a card's visibility on its category page. Save when done.
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

      {/* Category tabs — RTL so the category order matches the frontend nav. */}
      <div dir="rtl" className="mb-4 flex flex-wrap gap-2">
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
          <SortableContext items={ordered.map((p) => p.title)} strategy={rectSortingStrategy}>
            {/* RTL mirrors the frontend so position 1 lands on the right in both places. */}
            <ul dir="rtl" className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {ordered.map((p) => {
                const hidden = overrides.hidden[activeCat].includes(p.title);
                const nativeCat = nativeCatOf(p.title);
                const copiedTo: Category[] = (Object.keys(overrides.copies ?? {}) as Category[])
                  .filter((c) => (overrides.copies?.[c] ?? []).includes(p.title));
                return (
                  <SortableCard
                    key={p.title}
                    id={p.title}
                    label={p.label}
                    image={p.image}
                    price={p.price}
                    hidden={hidden}
                    onToggle={() => toggleHidden(p.title)}
                    nativeCat={nativeCat}
                    copiedTo={copiedTo}
                    onToggleCopy={(cat) => toggleCopy(p.title, cat)}
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

function SortableCard({
  id,
  label,
  image,
  price,
  hidden,
  onToggle,
  nativeCat,
  copiedTo,
  onToggleCopy,
}: {
  id: string;
  label: string;
  image: string;
  price: string | undefined;
  hidden: boolean;
  onToggle: () => void;
  nativeCat: Category | null;
  copiedTo: Category[];
  onToggleCopy: (cat: Category) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const [copyOpen, setCopyOpen] = useState(false);
  const popRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!copyOpen) return;
    function onDoc(e: MouseEvent) {
      if (popRef.current && !popRef.current.contains(e.target as Node)) setCopyOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [copyOpen]);
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
  };
  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`group relative flex flex-col overflow-hidden rounded-xl border shadow-sm transition-shadow hover:shadow-md ${
        hidden ? "border-red-300 bg-red-50/40" : "border-border bg-background"
      }`}
    >
      {/* Drag handle: full image is the grab target — matches how visual reorder feels on frontend. */}
      <button
        type="button"
        {...attributes}
        {...listeners}
        aria-label="Drag to reorder"
        className="relative block aspect-[4/3] cursor-grab touch-none overflow-hidden bg-slate-100 active:cursor-grabbing"
      >
        <img
          src={image}
          alt=""
          loading="lazy"
          className={`h-full w-full object-cover transition-transform group-hover:scale-105 ${
            hidden ? "grayscale" : ""
          }`}
        />
        <span className="absolute start-2 top-2 inline-flex items-center gap-1 rounded-md bg-slate-900/70 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur">
          <GripVertical className="h-3 w-3" /> Drag
        </span>
      </button>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <p
          dir="rtl"
          title={label}
          className={`line-clamp-2 min-h-[2.4rem] text-xs font-semibold leading-tight ${
            hidden ? "text-muted-foreground line-through" : "text-foreground"
          }`}
        >
          {label}
        </p>
        {price ? (
          <p dir="rtl" className="text-[11px] font-bold text-gold-deep">
            {price}
          </p>
        ) : null}
        <div className="mt-auto flex flex-col gap-1.5">
          <button
            type="button"
            onClick={onToggle}
            aria-label={hidden ? "Show product" : "Hide product"}
            className={`inline-flex w-full items-center justify-center gap-1.5 rounded-md px-2.5 py-1.5 text-[11px] font-bold transition-colors ${
              hidden
                ? "bg-red-500/15 text-red-600 hover:bg-red-500/25"
                : "bg-muted text-muted-foreground hover:bg-gold/15 hover:text-gold-deep"
            }`}
          >
            {hidden ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
            {hidden ? "Hidden" : "Visible"}
          </button>
          <div ref={popRef} className="relative">
            <button
              type="button"
              onClick={() => setCopyOpen((v) => !v)}
              className={`inline-flex w-full items-center justify-center gap-1.5 rounded-md border px-2.5 py-1.5 text-[11px] font-bold transition-colors ${
                copiedTo.length > 0
                  ? "border-gold/60 bg-gold/15 text-gold-deep"
                  : "border-border bg-background text-muted-foreground hover:bg-muted"
              }`}
            >
              <Copy className="h-3.5 w-3.5" />
              Copy to
              {copiedTo.length > 0 ? <span className="ml-1 rounded-full bg-gold px-1.5 text-[10px] text-primary-deep">{copiedTo.length}</span> : null}
            </button>
            {copyOpen ? (
              <div className="absolute end-0 top-full z-30 mt-1 w-44 rounded-lg border border-border bg-popover p-1.5 text-xs shadow-lg">
                {(Object.keys(CAT_LABELS) as Category[]).map((c) => {
                  const isNative = c === nativeCat;
                  const isCopied = copiedTo.includes(c);
                  return (
                    <button
                      key={c}
                      type="button"
                      disabled={isNative}
                      onClick={() => onToggleCopy(c)}
                      className={`flex w-full items-center justify-between gap-2 rounded-md px-2 py-1.5 text-start font-semibold transition-colors ${
                        isNative
                          ? "cursor-not-allowed bg-muted/50 text-muted-foreground/60"
                          : isCopied
                            ? "bg-gold/20 text-gold-deep hover:bg-gold/30"
                            : "text-foreground hover:bg-muted"
                      }`}
                    >
                      <span>{CAT_LABELS[c]}</span>
                      {isNative ? <span className="text-[9px] font-bold uppercase">native</span> : isCopied ? <Check className="h-3.5 w-3.5" /> : null}
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </li>
  );
}
