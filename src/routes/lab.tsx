import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { PageHeader } from "@/components/Shell";
import { HOMININS } from "@/lib/data";
import { useMode } from "@/lib/mode";

export const Route = createFileRoute("/lab")({
  head: () => ({
    meta: [
      { title: "The Evolution Lab — EVOCHRON" },
      { name: "description", content: "Four interactive simulations: human evolution tree, natural selection, Earth through time and ecosystem builder." },
      { property: "og:title", content: "The Evolution Lab — EVOCHRON" },
      { property: "og:description", content: "Run natural selection, explore the human family bush, and build a prehistoric ecosystem." },
    ],
  }),
  component: Lab,
});

const TABS = ["Human Evolution Explorer", "Animal Evolution Simulator", "Earth Through Time", "Build an Ecosystem"];

function Lab() {
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const { visit } = useMode();
  useEffect(() => { visit("lab"); }, [visit]);
  const go = (i: number) => { setLoading(true); setTab(i); setTimeout(() => setLoading(false), 350); };
  return (
    <>
      <PageHeader kicker="The Evolution Lab" title="Experiment with deep time" sub="Every control here changes the result. These are simplified educational models, not predictions." />
      <div className="mx-auto max-w-7xl px-4 pb-24">
        <div className="flex flex-wrap justify-center gap-2">
          {TABS.map((t, i) => (
            <button key={t} onClick={() => go(i)} className={`btn-sweep rounded-full border px-4 py-2 text-sm font-semibold ${tab === i ? "bg-primary text-primary-foreground" : "glass"}`}>{String.fromCharCode(65 + i)}. {t}</button>
          ))}
        </div>
        <div className="mt-8">
          {loading ? <div className="glass flex h-96 items-center justify-center"><div className="anim-spin h-12 w-12 rounded-full border-4 border-primary border-t-transparent" style={{ animationDuration: "1s" }} /></div>
            : [<HumanTree key={0} />, <Selection key={1} />, <EarthTime key={2} />, <Ecosystem key={3} />][tab]}
        </div>
      </div>
    </>
  );
}

/* ---------- A: Human evolution explorer ---------- */
function HumanTree() {
  const [region, setRegion] = useState("All");
  const [span, setSpan] = useState(7); // Ma window
  const [sel, setSel] = useState<string[]>(["sapiens"]);
  const [compare, setCompare] = useState(false);
  const list = HOMININS.filter((h) => (region === "All" || h.region.includes(region)) && h.end <= span);
  const W = 900, H = 340;
  const x = (ma: number) => 40 + (1 - ma / span) * (W - 80);
  const y = (b: number) => 30 + b * 44;
  const click = (id: string) => setSel((s) => compare ? (s.includes(id) ? s.filter((v) => v !== id) : [...s, id].slice(-2)) : [id]);
  const chosen = sel.map((id) => HOMININS.find((h) => h.id === id)!).filter(Boolean);
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
      <div className="glass p-4">
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <select value={region} onChange={(e) => setRegion(e.target.value)} className="rounded-lg border bg-secondary px-2 py-1">
            {["All", "Africa", "Asia", "Europe"].map((r) => <option key={r}>{r}</option>)}
          </select>
          <label className="flex items-center gap-2">Zoom: last <b>{span}</b> million yrs
            <input type="range" min={0.5} max={7.5} step={0.5} value={span} onChange={(e) => setSpan(+e.target.value)} className="accent-[var(--primary)]" /></label>
          <label className="flex items-center gap-1"><input type="checkbox" checked={compare} onChange={(e) => { setCompare(e.target.checked); setSel(sel.slice(-1)); }} /> Compare two</label>
          <button onClick={() => { setRegion("All"); setSpan(7); setSel(["sapiens"]); setCompare(false); }} className="rounded-full border px-3 py-1">Reset</button>
        </div>
        <div className="mt-4 overflow-x-auto">
          <svg viewBox={`0 0 ${W} ${H}`} className="min-w-[640px] w-full">
            {Array.from({ length: 8 }, (_, i) => span - (span / 7) * i).map((t) => (
              <g key={t}><line x1={x(t)} x2={x(t)} y1={10} y2={H - 20} stroke="var(--border)" /><text x={x(t)} y={H - 4} fill="var(--muted-foreground)" fontSize="11" textAnchor="middle">{t.toFixed(1)} Ma</text></g>
            ))}
            {/* approximate relationships: dashed = uncertain */}
            {list.filter((h) => h.id !== "sahel").map((h) => {
              const parent = h.branch <= 1 ? HOMININS[0] : h.branch === 3 ? HOMININS[1] : h.id === "habilis" ? HOMININS[1] : HOMININS[4];
              if (parent.start > span) return null;
              const px = x(Math.min(parent.start - (parent.start - parent.end) / 2, span)), py = y(parent.branch);
              return <path key={"p" + h.id} d={`M${px},${py} C${(px + x(h.start)) / 2},${py} ${(px + x(h.start)) / 2},${y(h.branch)} ${x(Math.min(h.start, span))},${y(h.branch)}`} fill="none" stroke="var(--accent)" strokeOpacity=".5" strokeDasharray="5 4" />;
            })}
            {list.map((h) => {
              const active = sel.includes(h.id);
              return (
                <g key={h.id} onClick={() => click(h.id)} className="cursor-pointer">
                  <rect x={x(Math.min(h.start, span))} y={y(h.branch) - 9} width={Math.max(6, x(h.end) - x(Math.min(h.start, span)))} height={18} rx={9}
                    fill={active ? "var(--primary)" : "var(--life)"} fillOpacity={active ? 1 : 0.55} />
                  <text x={x(Math.min(h.start, span)) + 4} y={y(h.branch) - 14} fontSize="12" fill="var(--foreground)">{h.name}</text>
                </g>
              );
            })}
          </svg>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">Bars show approximate time ranges. Dashed lines are possible relationships — scientists still debate many connections.</p>
      </div>
      <div className="space-y-4">
        {chosen.length === 0 && <div className="glass p-5 text-sm text-muted-foreground">Click a species bar.</div>}
        {chosen.map((h) => (
          <div key={h.id} className="glass p-5">
            <h3 className="font-display text-lg font-bold text-primary italic">{h.name}</h3>
            <p className="mt-1 text-sm">{h.simple}</p>
            <dl className="mt-3 grid grid-cols-2 gap-2 text-xs">
              {[["Lived", `~${h.start}–${h.end || "now"} Ma`], ["Brain", h.brain], ["Region", h.region], ["Posture", h.posture], ["Tools", h.tools], ["Key find", h.found]].map(([k, v]) => (
                <div key={k} className="rounded-lg bg-secondary p-2"><dt className="text-muted-foreground">{k}</dt><dd className="font-semibold">{v}</dd></div>
              ))}
            </dl>
            <div className="mt-3 h-2 rounded-full bg-secondary"><div className="h-full rounded-full bg-accent" style={{ width: `${h.brainCc / 15}%` }} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- B: Natural selection ---------- */
type Bug = { dark: number; beak: number }; // 0..1 inherited traits
function rnd(seed: { v: number }) { seed.v = (seed.v * 16807) % 2147483647; return seed.v / 2147483647; }
function Selection() {
  const [env, setEnv] = useState<"light" | "dark">("dark");
  const [food, setFood] = useState<"soft" | "hard">("hard");
  const [predators, setPredators] = useState(5);
  const [foodAmt, setFoodAmt] = useState(6);
  const [variation, setVariation] = useState(5);
  const [climate, setClimate] = useState<"mild" | "harsh">("mild");
  const seed = useRef({ v: 12345 });
  const init = () => Array.from({ length: 60 }, () => ({ dark: rnd(seed.current) < 0.2 ? 1 : 0, beak: rnd(seed.current) < 0.2 ? 1 : 0 }));
  const [pop, setPop] = useState<Bug[]>(init);
  const [hist, setHist] = useState<{ d: number; b: number; n: number }[]>([]);
  const [gen, setGen] = useState(0);
  const [running, setRunning] = useState(false);
  const [why, setWhy] = useState("Press 'Next generation' to see what happens.");

  const stats = (p: Bug[]) => ({ n: p.length, d: p.length ? p.filter((b) => b.dark).length / p.length : 0, b: p.length ? p.filter((b) => b.beak).length / p.length : 0 });

  const step = () => {
    setPop((p) => {
      const cap = 20 + foodAmt * 15 * (climate === "harsh" ? 0.6 : 1);
      const survivors = p.filter((b) => {
        const camo = (env === "dark") === !!b.dark;
        const predRisk = (predators / 10) * (camo ? 0.15 : 0.6);
        const fit = (food === "hard") === !!b.beak;
        const starve = (p.length / cap) * (fit ? 0.15 : 0.45);
        return rnd(seed.current) > predRisk + starve;
      });
      const next: Bug[] = [];
      survivors.forEach((b) => {
        const kids = 2;
        for (let k = 0; k < kids; k++) {
          const m = variation / 100;
          next.push({ dark: rnd(seed.current) < m ? 1 - b.dark : b.dark, beak: rnd(seed.current) < m ? 1 - b.beak : b.beak });
        }
      });
      const capped = next.slice(0, Math.round(cap * 1.4));
      const s0 = stats(p), s1 = stats(capped);
      setWhy(capped.length === 0 ? "The population went extinct — conditions were too tough. Reset and try kinder settings."
        : `Predators more often caught ${env === "dark" ? "light" : "dark"} creatures that stood out on ${env} ground; creatures with ${food === "hard" ? "large" : "small"} beaks found food more easily. Survivors passed their traits to offspring, so dark colour went ${Math.round(s0.d * 100)}% → ${Math.round(s1.d * 100)}% and large beaks ${Math.round(s0.b * 100)}% → ${Math.round(s1.b * 100)}%.`);
      setHist((h) => [...h, s1]);
      setGen((g) => g + 1);
      return capped;
    });
  };
  useEffect(() => {
    if (!running) return;
    const id = setInterval(step, 700);
    return () => clearInterval(id);
  });
  useEffect(() => { if (pop.length === 0) setRunning(false); }, [pop.length]);
  const reset = () => { seed.current.v = 12345; setPop(init()); setHist([]); setGen(0); setRunning(false); setWhy("Press 'Next generation' to see what happens."); };
  const s = stats(pop);
  const all = [stats(init()), ...hist];

  const Toggle = <T extends string>({ label, v, opts, set }: { label: string; v: T; opts: T[]; set: (x: T) => void }) => (
    <div><div className="text-xs text-muted-foreground">{label}</div><div className="mt-1 flex gap-1">{opts.map((o) => <button key={o} onClick={() => set(o)} className={`rounded-full border px-3 py-1 text-xs capitalize ${v === o ? "bg-primary text-primary-foreground" : ""}`}>{o}</button>)}</div></div>
  );
  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <div className="glass space-y-4 p-5">
        <p className="rounded-lg bg-accent/15 p-2 text-xs text-accent">Simplified educational model — not a prediction of real animal evolution.</p>
        <Toggle label="Habitat ground" v={env} opts={["light", "dark"]} set={setEnv} />
        <Toggle label="Food type (seeds)" v={food} opts={["soft", "hard"]} set={setFood} />
        <Toggle label="Climate" v={climate} opts={["mild", "harsh"]} set={setClimate} />
        {[["Predators", predators, setPredators], ["Food available", foodAmt, setFoodAmt], ["Inherited variation (mutation %)", variation, setVariation]].map(([l, v, f]) => (
          <label key={l as string} className="block text-sm">{l as string}: <b>{v as number}</b>
            <input type="range" min={0} max={10} value={v as number} onChange={(e) => (f as (n: number) => void)(+e.target.value)} className="w-full accent-[var(--primary)]" /></label>
        ))}
        <div className="flex flex-wrap gap-2">
          <button onClick={step} disabled={!pop.length} className="btn-sweep rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground disabled:opacity-40">Next generation</button>
          <button onClick={() => setRunning(!running)} disabled={!pop.length} className="rounded-full bg-accent px-4 py-2 text-sm font-bold text-accent-foreground disabled:opacity-40">{running ? "Pause" : "Auto-run"}</button>
          <button onClick={reset} className="rounded-full border px-4 py-2 text-sm">Reset</button>
        </div>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[["Generation", gen], ["Population", s.n], ["Dark colour", `${Math.round(s.d * 100)}%`], ["Large beak", `${Math.round(s.b * 100)}%`]].map(([k, v]) => (
            <div key={k as string} className="glass p-3 text-center"><div className="text-xs text-muted-foreground">{k}</div><div className="font-display text-2xl font-bold text-primary">{v}</div></div>
          ))}
        </div>
        <div className="relative h-48 overflow-hidden rounded-2xl border transition-colors" style={{ background: env === "dark" ? "oklch(0.25 0.03 60)" : "oklch(0.85 0.05 85)" }}>
          {pop.slice(0, 120).map((b, i) => (
            <span key={i} className="anim-float absolute flex items-center" style={{ left: `${(i * 47) % 95}%`, top: `${(i * 31) % 85}%`, animationDelay: `${(i % 10) * .3}s` }}>
              <span className="block h-4 w-5 rounded-full border" style={{ background: b.dark ? "oklch(0.28 0.03 60)" : "oklch(0.9 0.04 85)" }} />
              <span className="block border-y-[4px] border-l-[7px] border-y-transparent" style={{ borderLeftColor: "var(--accent)", transform: `scale(${b.beak ? 1.6 : 0.8})` }} />
            </span>
          ))}
        </div>
        <div className="glass p-4">
          <div className="flex gap-4 text-xs"><span className="text-primary">■ Dark colour %</span><span className="text-accent">■ Large beak %</span><span className="text-life">■ Population</span></div>
          <Chart series={[all.map((h) => h.d), all.map((h) => h.b), all.map((h) => h.n / Math.max(...all.map((x) => x.n), 1))]} colors={["var(--primary)", "var(--accent)", "var(--life)"]} />
        </div>
        <div className="glass p-4 text-sm"><b className="text-life">What happened? </b>{why}
          <p className="mt-2 text-xs text-muted-foreground">Individuals don't change their traits because they need to. The population changes because individuals with helpful inherited traits leave more offspring.</p></div>
      </div>
    </div>
  );
}

function Chart({ series, colors }: { series: number[][]; colors: string[] }) {
  const n = Math.max(...series.map((s) => s.length), 2);
  return (
    <svg viewBox="0 0 400 120" className="mt-2 h-40 w-full" preserveAspectRatio="none">
      {[0, 0.5, 1].map((g) => <line key={g} x1="0" x2="400" y1={110 - g * 100} y2={110 - g * 100} stroke="var(--border)" />)}
      {series.map((s, i) => (
        <polyline key={i} fill="none" stroke={colors[i]} strokeWidth="2.5" vectorEffect="non-scaling-stroke"
          points={s.map((v, j) => `${(j / (n - 1)) * 400},${110 - v * 100}`).join(" ")} />
      ))}
    </svg>
  );
}

/* ---------- C: Earth through time ---------- */
const PERIODS = [
  { n: "Hadean", ya: 4.3e9, eon: "Hadean", color: "oklch(0.55 0.2 35)", cont: [] as number[][], atm: "CO₂, steam, no oxygen", life: "None known", ev: "Moon-forming impact; first oceans", note: "Surface mostly magma ocean then early crust (reconstruction highly uncertain)." },
  { n: "Archean", ya: 3.2e9, eon: "Archean", color: "oklch(0.45 0.08 200)", cont: [[48, 50, 8]], atm: "Methane-rich, almost no O₂", life: "Microbes, stromatolites", ev: "First continents (cratons)", note: "Small island-like cratons; positions unknown." },
  { n: "Proterozoic", ya: 1.0e9, eon: "Proterozoic", color: "oklch(0.55 0.1 210)", cont: [[50, 48, 20]], atm: "Oxygen rising after ~2.4 Ga", life: "Complex cells, early multicellular life", ev: "Rodinia supercontinent; 'Snowball Earth'", note: "Rodinia's shape is debated." },
  { n: "Cambrian", ya: 5.0e8, eon: "Paleozoic", color: "oklch(0.5 0.12 220)", cont: [[40, 65, 16], [65, 35, 9], [30, 30, 7]], atm: "Oxygen near modern-ish", life: "Explosion of animals in the sea", ev: "Cambrian diversification", note: "Gondwana in the south." },
  { n: "Permian", ya: 2.6e8, eon: "Paleozoic", color: "oklch(0.55 0.1 140)", cont: [[50, 50, 26]], atm: "Hot and dry interior", life: "Reptiles, synapsids, forests", ev: "Pangaea; the Great Dying 252 Ma", note: "Pangaea well supported by rock and fossil evidence." },
  { n: "Cretaceous", ya: 9.0e7, eon: "Mesozoic", color: "oklch(0.55 0.12 160)", cont: [[35, 40, 13], [58, 55, 13], [70, 35, 10], [50, 75, 8]], atm: "Warm, high CO₂, no polar ice", life: "Dinosaurs, flowering plants", ev: "Asteroid impact 66 Ma", note: "Atlantic opening." },
  { n: "Today", ya: 0, eon: "Cenozoic", color: "oklch(0.55 0.13 230)", cont: [[28, 38, 11], [35, 65, 8], [55, 35, 13], [56, 60, 9], [75, 40, 12], [82, 70, 6]], atm: "21% oxygen", life: "Mammals, birds, humans", ev: "Ice ages; human civilisation", note: "Present day." },
];
function EarthTime() {
  const [i, setI] = useState(6);
  const [hot, setHot] = useState<string | null>(null);
  const p = PERIODS[i];
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="glass flex flex-col items-center p-6">
        <svg viewBox="0 0 100 100" className="w-full max-w-sm drop-shadow-[0_0_30px_var(--primary)]">
          <defs><clipPath id="g"><circle cx="50" cy="50" r="45" /></clipPath><radialGradient id="sh" cx=".35" cy=".35"><stop offset="0" stopColor="white" stopOpacity=".25" /><stop offset="1" stopColor="black" stopOpacity=".5" /></radialGradient></defs>
          <circle cx="50" cy="50" r="45" fill={p.color} style={{ transition: "fill 1s" }} />
          <g clipPath="url(#g)">
            <g className="anim-spin" style={{ transformOrigin: "50px 50px", animationDuration: "40s" }}>
              {p.cont.map(([cx, cy, r], k) => <ellipse key={k} cx={cx} cy={cy} rx={r} ry={r * 0.7} fill={i === 0 ? "oklch(0.6 0.2 40)" : "oklch(0.6 0.1 120)"} style={{ transition: "all 1s" }} />)}
              {i === 0 && [20, 60, 75].map((x) => <circle key={x} cx={x} cy={x / 1.5 + 10} r="5" fill="oklch(0.75 0.2 60)" />)}
            </g>
          </g>
          <circle cx="50" cy="50" r="45" fill="url(#sh)" />
        </svg>
        <div className="mt-4 font-display text-3xl font-bold text-primary">{p.n}</div>
        <div className="text-sm text-muted-foreground">{p.ya ? `~${p.ya >= 1e9 ? (p.ya / 1e9).toFixed(1) + " billion" : p.ya / 1e6 + " million"} years ago` : "Present"} · {p.eon}</div>
        <input type="range" min={0} max={PERIODS.length - 1} value={i} onChange={(e) => setI(+e.target.value)} aria-label="Geological time" className="mt-6 w-full accent-[var(--accent)]" />
        <div className="mt-2 flex w-full flex-wrap justify-between gap-1">{PERIODS.map((x, k) => <button key={x.n} onClick={() => setI(k)} className={`text-[11px] ${k === i ? "font-bold text-accent" : "text-muted-foreground"}`}>{x.n}</button>)}</div>
      </div>
      <div className="space-y-3">
        {([["🌫️ Atmosphere", p.atm], ["🧬 Life", p.life], ["🌋 Major events", p.ev], ["🗺️ Continents", p.note]] as const).map(([k, v]) => (
          <button key={k} onClick={() => setHot(hot === k ? null : k)} className="glass lift block w-full p-5 text-left">
            <div className="font-bold">{k}</div>
            <div className="mt-1 text-sm text-muted-foreground">{v}</div>
          </button>
        ))}
        <p className="text-xs text-muted-foreground">Continent shapes are simplified estimates, not exact maps.</p>
      </div>
    </div>
  );
}

/* ---------- D: Ecosystem ---------- */
const PLANTS = { Ferns: 1.0, Cycads: 0.8, Conifers: 0.6 };
const HERBS = { Triceratops: 0.9, Hadrosaurs: 1.1 };
const PREDS = { "T. rex": 1.0, Raptors: 1.3 };
function Ecosystem() {
  const [plant, setPlant] = useState<keyof typeof PLANTS>("Ferns");
  const [herb, setHerb] = useState<keyof typeof HERBS>("Hadrosaurs");
  const [pred, setPred] = useState<keyof typeof PREDS>("T. rex");
  const [rain, setRain] = useState(6);
  const [temp, setTemp] = useState(5);
  const [state, setState] = useState({ p: 500, h: 40, c: 6 });
  const [hist, setHist] = useState([{ p: 500, h: 40, c: 6 }]);
  const [run, setRun] = useState(false);
  const tick = () => setState((s) => {
    const growth = 0.25 * PLANTS[plant] * (rain / 6) * (1 - Math.abs(temp - 5) / 8);
    const K = 1000;
    const eat = 0.004 * HERBS[herb];
    const hunt = 0.012 * PREDS[pred];
    const p = Math.max(0, s.p + growth * s.p * (1 - s.p / K) - eat * s.p * s.h);
    const h = Math.max(0, s.h + 0.0006 * s.p * s.h * HERBS[herb] - 0.08 * s.h - hunt * s.h * s.c);
    const c = Math.max(0, s.c + 0.0025 * s.h * s.c - 0.12 * s.c);
    const n = { p: p < 1 ? 0 : p, h: h < 0.5 ? 0 : h, c: c < 0.3 ? 0 : c };
    setHist((x) => [...x.slice(-120), n]);
    return n;
  });
  useEffect(() => { if (!run) return; const id = setInterval(tick, 150); return () => clearInterval(id); });
  const reset = () => { setRun(false); setState({ p: 500, h: 40, c: 6 }); setHist([{ p: 500, h: 40, c: 6 }]); };
  const msg = useMemo(() => {
    if (state.p === 0) return "Plants vanished — with nothing to eat, the whole food web collapses.";
    if (state.h === 0) return "Herbivores died out, so predators will starve too. Everything depends on the level below.";
    if (state.c === 0) return "Predators are gone. Herbivores may boom and overgraze the plants.";
    if (rain < 3) return "Drought slows plant growth, which ripples up to herbivores and predators.";
    return "Populations rise and fall in waves: more plants → more herbivores → more predators → fewer herbivores → plants recover.";
  }, [state, rain]);
  const Pick = ({ label, opts, v, set }: { label: string; opts: string[]; v: string; set: (s: never) => void }) => (
    <div><div className="text-xs text-muted-foreground">{label}</div><div className="mt-1 flex flex-wrap gap-1">{opts.map((o) => <button key={o} onClick={() => set(o as never)} className={`rounded-full border px-3 py-1 text-xs ${v === o ? "bg-primary text-primary-foreground" : ""}`}>{o}</button>)}</div></div>
  );
  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <div className="glass space-y-4 p-5">
        <Pick label="🌿 Plants" opts={Object.keys(PLANTS)} v={plant} set={setPlant} />
        <Pick label="🦕 Herbivores" opts={Object.keys(HERBS)} v={herb} set={setHerb} />
        <Pick label="🦖 Predators" opts={Object.keys(PREDS)} v={pred} set={setPred} />
        <label className="block text-sm">Rainfall: <b>{rain}</b><input type="range" min={0} max={10} value={rain} onChange={(e) => setRain(+e.target.value)} className="w-full accent-[var(--primary)]" /></label>
        <label className="block text-sm">Temperature: <b>{temp}</b><input type="range" min={0} max={10} value={temp} onChange={(e) => setTemp(+e.target.value)} className="w-full accent-[var(--accent)]" /></label>
        <div className="flex gap-2">
          <button onClick={() => setRun(!run)} className="btn-sweep rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">{run ? "Pause" : "Run"}</button>
          <button onClick={tick} className="rounded-full border px-4 py-2 text-sm">Step</button>
          <button onClick={reset} className="rounded-full border px-4 py-2 text-sm">Reset</button>
        </div>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          {[["🌿 Plants", state.p], ["🦕 Herbivores", state.h], ["🦖 Predators", state.c]].map(([k, v]) => (
            <div key={k as string} className="glass p-3 text-center"><div className="text-xs text-muted-foreground">{k}</div><div className="font-display text-2xl font-bold text-primary">{Math.round(v as number)}</div></div>
          ))}
        </div>
        <div className="glass p-4">
          <div className="flex gap-4 text-xs"><span className="text-life">■ Plants</span><span className="text-accent">■ Herbivores</span><span className="text-destructive">■ Predators</span></div>
          <Chart series={[hist.map((x) => x.p / 1000), hist.map((x) => Math.min(x.h / 150, 1)), hist.map((x) => Math.min(x.c / 30, 1))]} colors={["var(--life)", "var(--accent)", "var(--destructive)"]} />
        </div>
        <div className="glass p-4 text-sm"><b className="text-life">Food web: </b>{msg}</div>
      </div>
    </div>
  );
}
