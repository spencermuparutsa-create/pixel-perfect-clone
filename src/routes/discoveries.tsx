import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/Shell";
import { EVENTS, GLOSSARY, HOMININS } from "@/lib/data";
import { useMode } from "@/lib/mode";

export const Route = createFileRoute("/discoveries")({
  head: () => ({
    meta: [
      { title: "Discoveries, Search & Glossary — EVOCHRON" },
      { name: "description", content: "Search species, events and geological periods, browse the glossary, and see your bookmarks." },
      { property: "og:title", content: "Discoveries — EVOCHRON" },
      { property: "og:description", content: "Search the story of life and learn key science words." },
    ],
  }),
  component: Discoveries,
});

const PERIODS = ["Hadean", "Archean", "Proterozoic", "Paleozoic", "Cambrian", "Permian", "Mesozoic", "Triassic", "Jurassic", "Cretaceous", "Cenozoic"];

function Discoveries() {
  const [q, setQ] = useState("");
  const { favs, toggleFav, visit } = useMode();
  useEffect(() => { visit("discoveries"); }, [visit]);
  const s = q.trim().toLowerCase();
  const results = s.length < 2 ? [] : [
    ...EVENTS.filter((e) => (e.title + e.simple + e.detail).toLowerCase().includes(s)).map((e) => ({ k: "Event", t: e.title, d: `${e.date} — ${e.simple}`, id: e.id })),
    ...HOMININS.filter((h) => (h.name + h.simple).toLowerCase().includes(s)).map((h) => ({ k: "Species", t: h.name, d: h.simple, id: "" })),
    ...PERIODS.filter((p) => p.toLowerCase().includes(s)).map((p) => ({ k: "Period", t: p, d: "Geological time unit — explore it in Earth Through Time.", id: "" })),
    ...GLOSSARY.filter((g) => (g.term + g.def).toLowerCase().includes(s)).map((g) => ({ k: "Glossary", t: g.term, d: g.def, id: "" })),
  ];
  const saved = EVENTS.filter((e) => favs.includes(e.id));
  return (
    <>
      <PageHeader kicker="Discoveries" title="Search the story of life" sub="Find species, events, periods and science words." />
      <div className="mx-auto max-w-5xl px-4 pb-24">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Try 'dinosaur', 'oxygen', 'Homo', 'Cretaceous'…" aria-label="Search"
          className="glass w-full px-5 py-4 text-lg outline-none focus:ring-2 focus:ring-ring" />
        {s.length >= 2 && (
          <div className="mt-4 space-y-2">
            {results.length === 0 && <p className="text-muted-foreground">No results — try another word.</p>}
            {results.map((r, i) => (
              <div key={i} className="glass lift flex items-start gap-3 p-4">
                <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold uppercase text-accent">{r.k}</span>
                <div className="flex-1"><div className="font-bold">{r.t}</div><div className="text-sm text-muted-foreground">{r.d}</div></div>
                {r.id && <button onClick={() => toggleFav(r.id)} aria-label="Bookmark">{favs.includes(r.id) ? "★" : "☆"}</button>}
              </div>
            ))}
          </div>
        )}

        <h2 className="mt-16 text-2xl font-extrabold">★ Your bookmarks</h2>
        {saved.length === 0 ? <p className="mt-2 text-sm text-muted-foreground">Star events in search or on the <Link to="/timeline" className="text-primary underline">timeline</Link> to save them here.</p>
          : <div className="mt-4 grid gap-3 sm:grid-cols-2">{saved.map((e) => <div key={e.id} className="glass p-4"><div className="font-bold">{e.title}</div><div className="text-xs text-muted-foreground">{e.date}</div></div>)}</div>}

        <h2 id="glossary" className="mt-16 text-2xl font-extrabold">Glossary</h2>
        <dl className="mt-4 grid gap-3 sm:grid-cols-2">
          {GLOSSARY.map((g) => (
            <div key={g.term} className="glass p-4"><dt className="font-bold text-primary">{g.term}</dt><dd className="mt-1 text-sm text-muted-foreground">{g.def}</dd></div>
          ))}
        </dl>
      </div>
    </>
  );
}
