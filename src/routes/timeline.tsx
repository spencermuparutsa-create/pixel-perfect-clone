import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { PageHeader } from "@/components/Shell";
import { EVENTS, fmtYa, logPos, type Cat } from "@/lib/data";
import { useMode, useT } from "@/lib/mode";

export const Route = createFileRoute("/timeline")({
  head: () => ({
    meta: [
      { title: "The River of Time — EVOCHRON" },
      { name: "description", content: "An interactive timeline from Earth's formation 4.54 billion years ago to today." },
      { property: "og:title", content: "The River of Time — EVOCHRON" },
      { property: "og:description", content: "Drag, zoom and filter 4.5 billion years of Earth, animal and human history." },
    ],
  }),
  component: Timeline,
});

const CATS: { id: Cat; label: string; cls: string }[] = [
  { id: "earth", label: "Earth history", cls: "bg-primary" },
  { id: "animal", label: "Animal evolution", cls: "bg-life" },
  { id: "human", label: "Human evolution", cls: "bg-accent" },
  { id: "extinction", label: "Extinctions", cls: "bg-destructive" },
];

function Timeline() {
  const [cats, setCats] = useState<Cat[]>(CATS.map((c) => c.id));
  const [zoom, setZoom] = useState(1);
  const [sel, setSel] = useState(EVENTS[0].id);
  const [celebrate, setCelebrate] = useState(false);
  const { visit, visited, favs, toggleFav } = useMode();
  const t = useT();
  const scroller = useRef<HTMLDivElement>(null);
  useEffect(() => { visit("timeline"); }, [visit]);
  const list = EVENTS.filter((e) => cats.includes(e.cat));
  const ev = EVENTS.find((e) => e.id === sel)!;
  const width = 1400 * zoom;

  const choose = (id: string) => {
    setSel(id);
    if (!visited.includes("ev:" + id)) { visit("ev:" + id); setCelebrate(true); setTimeout(() => setCelebrate(false), 1200); }
  };
  const zoomTo = (z: number, focus?: number) => {
    setZoom(z);
    requestAnimationFrame(() => { const el = scroller.current; if (el && focus !== undefined) el.scrollLeft = focus * 1400 * z - el.clientWidth / 2; });
  };
  const found = visited.filter((v) => v.startsWith("ev:")).length;

  return (
    <>
      <PageHeader kicker="The Ultimate Timeline" title="The River of Time" sub="A logarithmic scale: each step to the right covers less time, so the tiny slice of human history stays explorable. All dates are approximate." />
      <div className="mx-auto max-w-7xl px-4 pb-24">
        <div className="glass flex flex-wrap items-center gap-3 p-4">
          {CATS.map((c) => (
            <button key={c.id} onClick={() => setCats((x) => (x.includes(c.id) ? x.filter((y) => y !== c.id) : [...x, c.id]))}
              className={`flex items-center gap-2 rounded-full border px-3 py-1 text-xs ${cats.includes(c.id) ? "" : "opacity-40"}`}><span className={`h-2.5 w-2.5 rounded-full ${c.cls}`} />{c.label}</button>
          ))}
          <div className="ml-auto flex flex-wrap gap-1 text-xs">
            {[["Billions", 1, 0], ["Millions", 3, 0.55], ["Thousands", 6, 0.85], ["Recent years", 10, 0.97]].map(([l, z, f]) => (
              <button key={l as string} onClick={() => zoomTo(z as number, f as number)} className={`rounded-full border px-3 py-1 ${zoom === z ? "bg-primary text-primary-foreground" : ""}`}>{l as string}</button>
            ))}
          </div>
        </div>
        <div className="mt-2 text-right text-xs text-muted-foreground">Milestones discovered: <b className="text-life">{found}/{EVENTS.length}</b></div>

        <div ref={scroller} className="glass mt-3 overflow-x-auto p-0" style={{ cursor: "grab" }}
          onPointerDown={(e) => { const el = scroller.current!; const sx = e.clientX, sl = el.scrollLeft; const mv = (m: PointerEvent) => (el.scrollLeft = sl - (m.clientX - sx)); const up = () => { window.removeEventListener("pointermove", mv); window.removeEventListener("pointerup", up); }; window.addEventListener("pointermove", mv); window.addEventListener("pointerup", up); }}>
          <div className="relative h-72" style={{ width }}>
            <div className="absolute inset-x-6 top-1/2 h-1.5 -translate-y-1/2 rounded-full" style={{ background: "linear-gradient(90deg, oklch(0.55 0.2 35), var(--primary), var(--life), var(--accent))" }} />
            {[4e9, 1e9, 1e8, 1e7, 1e6, 1e5, 1e4, 1e3, 100].map((y) => (
              <div key={y} className="absolute bottom-2 -translate-x-1/2 text-[10px] text-muted-foreground" style={{ left: 24 + logPos(y) * (width - 48) }}>{fmtYa(y).replace(" years ago", "")}</div>
            ))}
            {list.map((e, i) => {
              const c = CATS.find((x) => x.id === e.cat)!;
              const left = 24 + logPos(e.ya) * (width - 48);
              const up = i % 2 === 0;
              return (
                <button key={e.id} onClick={() => choose(e.id)} className="group absolute -translate-x-1/2" style={{ left, top: up ? 40 : 150 }}>
                  <div className={`mx-auto mb-1 max-w-28 truncate text-[11px] ${sel === e.id ? "font-bold text-foreground" : "text-muted-foreground"} ${up ? "" : "order-2"}`}>{e.title}</div>
                  <div className={`mx-auto h-[52px] w-px bg-border ${up ? "" : "-mt-[60px] mb-2"}`} style={up ? {} : { position: "absolute", top: -56, left: "50%" }} />
                  <span className={`mx-auto block h-4 w-4 rounded-full ring-2 ring-background ${c.cls} ${sel === e.id ? "anim-pulse scale-150" : "group-hover:scale-125"} transition`}
                    style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", top: up ? 82 : -38 }} />
                </button>
              );
            })}
            <div className="absolute top-4 bottom-8 w-0.5 bg-foreground/60 transition-all" style={{ left: 24 + logPos(ev.ya) * (width - 48) }}>
              <span className="absolute -top-1 -translate-x-1/2 rounded-full bg-foreground px-2 text-[10px] font-bold text-background whitespace-nowrap">YOU ARE HERE</span>
            </div>
          </div>
        </div>

        <div className="relative mt-6 grid gap-6 lg:grid-cols-[1fr_300px]">
          {celebrate && <div className="pointer-events-none absolute -top-4 left-1/2 z-10 -translate-x-1/2 animate-in fade-in zoom-in rounded-full bg-life px-4 py-1 text-sm font-bold text-life-foreground">✨ New milestone discovered!</div>}
          <div className="glass p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-accent">{ev.date}</p>
                <h2 className="mt-2 text-3xl font-extrabold">{ev.title}</h2>
              </div>
              <button onClick={() => toggleFav(ev.id)} aria-label="Bookmark" className="text-2xl">{favs.includes(ev.id) ? "★" : "☆"}</button>
            </div>
            <p className="mt-4">{t(ev.simple, ev.detail)}</p>
            {ev.chapter && <Link to="/journey" hash={ev.chapter} className="mt-4 inline-block text-sm font-bold text-primary hover:underline">Explore this chapter →</Link>}
          </div>
          <div className="glass max-h-80 overflow-y-auto p-3">
            {list.map((e) => (
              <button key={e.id} onClick={() => choose(e.id)} className={`block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-secondary ${sel === e.id ? "bg-secondary text-primary" : ""}`}>
                {e.title}<div className="text-[11px] text-muted-foreground">{e.date}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
