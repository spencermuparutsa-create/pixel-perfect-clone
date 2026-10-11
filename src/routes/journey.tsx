import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import earth from "@/assets/earth.jpg";
import hadean from "@/assets/hadean.jpg";
import cambrian from "@/assets/cambrian.jpg";
import dinos from "@/assets/dinos.jpg";
import { Discover, PageHeader, Reveal } from "@/components/Shell";
import { useMode, useT } from "@/lib/mode";
import { CHAPTERS } from "@/lib/data";

export const Route = createFileRoute("/journey")({
  head: () => ({
    meta: [
      { title: "Journey Through Time — EVOCHRON" },
      { name: "description", content: "Eight interactive chapters from the birth of Earth to life today." },
      { property: "og:title", content: "Journey Through Time — EVOCHRON" },
      { property: "og:description", content: "Explore Earth's formation, first life, dinosaurs, mammals and human evolution." },
    ],
  }),
  component: Journey,
});

function Chapter({ id, children, bg }: { id: string; children: ReactNode; bg?: string }) {
  const { visit } = useMode();
  const ref = useRef<HTMLElement>(null);
  const c = CHAPTERS.find((x) => x.id === id)!;
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && visit(id), { threshold: 0.3 });
    io.observe(el); return () => io.disconnect();
  }, [id, visit]);
  return (
    <section id={id} ref={ref} className="relative scroll-mt-20 overflow-hidden border-t py-24">
      {bg && <><img src={bg} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-30" /><div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" /></>}
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[.35em] text-accent">Chapter {c.n} · {c.date}</p>
          <h2 className="mt-3 text-4xl font-extrabold md:text-5xl">{c.title}</h2>
        </Reveal>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

function InfoCard({ title, simple, detail, icon }: { title: string; simple: string; detail: string; icon: string }) {
  const t = useT();
  return (
    <div className="glass lift p-6">
      <div className="text-3xl">{icon}</div>
      <h3 className="mt-3 text-lg font-bold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{t(simple, detail)}</p>
      <Discover>{detail}</Discover>
    </div>
  );
}

function DidYouKnow({ children }: { children: ReactNode }) {
  return <div className="mt-6 rounded-xl border border-accent/40 bg-accent/10 p-4 text-sm"><b className="text-accent">Did you know? </b>{children}</div>;
}

function Journey() {
  return (
    <>
      <PageHeader kicker="Journey Through Time" title="4.5 billion years in eight chapters" sub="Scroll through time. Tap glowing spots, flip cards, and switch to Discovery mode for deeper science." />
      <nav className="sticky top-20 z-40 mx-auto flex max-w-6xl gap-2 overflow-x-auto px-6 py-2">
        {CHAPTERS.map((c) => <a key={c.id} href={`#${c.id}`} className="glass shrink-0 px-3 py-1.5 text-xs font-semibold hover:text-primary">{c.n}. {c.title}</a>)}
      </nav>
      <Ch1 /><Ch2 /><Ch3 /><Ch4 /><Ch5 /><Ch6 /><Ch7 /><Ch8 />
    </>
  );
}

const SPOTS = [
  { x: 30, y: 30, t: "Atmosphere", d: "Early air was mostly carbon dioxide, water vapour and nitrogen — no oxygen to breathe." },
  { x: 62, y: 55, t: "Oceans", d: "As Earth cooled, water vapour rained down for ages, forming the first oceans by ~4.4 billion years ago." },
  { x: 40, y: 72, t: "Crust", d: "Molten rock cooled into a thin crust; the oldest known crystals (zircons) are about 4.4 billion years old." },
];

function Ch1() {
  const [rot, setRot] = useState(0);
  const [spot, setSpot] = useState<number | null>(null);
  const [stage, setStage] = useState(0);
  const stages = ["Dust & gas swirl around the young Sun", "Rocks collide and clump together", "A molten ball glows red-hot", "Crust cools, oceans form"];
  const drag = useRef<number | null>(null);
  return (
    <Chapter id="birth" bg={hadean}>
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div className="relative mx-auto aspect-square w-full max-w-md select-none touch-none"
          onPointerDown={(e) => (drag.current = e.clientX)} onPointerUp={() => (drag.current = null)} onPointerLeave={() => (drag.current = null)}
          onPointerMove={(e) => { if (drag.current !== null) { setRot((r) => r + (e.clientX - drag.current!) * 0.6); drag.current = e.clientX; } }}>
          <div className="absolute inset-0 overflow-hidden rounded-full shadow-[var(--glow-cyan)] cursor-grab">
            <img src={earth} alt="Rotatable Earth" draggable={false} className="h-full w-full scale-[1.85] object-cover" style={{ transform: `rotate(${rot}deg) scale(1.85)` }} />
          </div>
          {SPOTS.map((s, i) => (
            <button key={s.t} onClick={() => setSpot(i)} aria-label={s.t} style={{ left: `${s.x}%`, top: `${s.y}%` }}
              className="anim-pulse absolute h-5 w-5 rounded-full border-2 border-foreground bg-primary" />
          ))}
          <p className="absolute -bottom-8 w-full text-center text-xs text-muted-foreground">Drag to rotate · tap the glowing spots</p>
        </div>
        <div>
          <div className="glass min-h-32 p-6">
            {spot === null ? <p className="text-muted-foreground">Tap a hotspot on the planet to learn about the atmosphere, oceans and crust.</p>
              : <><h3 className="text-xl font-bold text-primary">{SPOTS[spot].t}</h3><p className="mt-2 text-sm">{SPOTS[spot].d}</p></>}
          </div>
          <div className="glass mt-4 p-6">
            <h3 className="font-bold">Formation sequence</h3>
            <div className="mt-3 flex gap-1">{stages.map((_, i) => <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= stage ? "bg-accent" : "bg-secondary"}`} />)}</div>
            <p className="mt-3 text-sm">{stage + 1}. {stages[stage]}</p>
            <button onClick={() => setStage((s) => (s + 1) % stages.length)} className="btn-sweep mt-4 rounded-full bg-accent px-4 py-2 text-sm font-bold text-accent-foreground">Next step →</button>
          </div>
          <InfoCardInline />
        </div>
      </div>
    </Chapter>
  );
}
function InfoCardInline() {
  return (
    <div className="mt-4"><InfoCard icon="⏳" title="How do we know Earth's age?" simple="Some atoms in rocks slowly change into other atoms at a steady speed, like a clock. Measuring them tells us the rock's age."
      detail="Radiometric dating uses known half-lives (e.g. uranium-238 → lead-206, 4.47 billion years). Meteorites, formed with the solar system, date to ~4.567 Ga; Earth formed shortly after, ~4.54 Ga." /></div>
  );
}

function Ch2() {
  const [zoom, setZoom] = useState(1);
  const [oxy, setOxy] = useState(0);
  const cells = Array.from({ length: 18 }, (_, i) => i);
  return (
    <Chapter id="life">
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <div className="relative h-80 overflow-hidden rounded-2xl border" style={{ background: `linear-gradient(180deg, color-mix(in oklab, var(--primary) ${10 + oxy / 3}%, var(--navy)), var(--background))` }}>
            {cells.map((i) => (
              <span key={i} className="anim-float absolute rounded-full border border-life/70 bg-life/20"
                style={{ left: `${(i * 37) % 92}%`, top: `${(i * 53) % 85}%`, width: 14 * zoom, height: 10 * zoom, animationDelay: `${i * 0.3}s`, transition: "width .4s,height .4s" }} />
            ))}
            {Array.from({ length: Math.round(oxy / 6) }, (_, i) => (
              <span key={"o" + i} className="anim-float absolute h-1.5 w-1.5 rounded-full bg-primary" style={{ left: `${(i * 61) % 97}%`, top: `${(i * 29) % 60}%`, animationDelay: `${i * .2}s` }} />
            ))}
            <span className="absolute left-3 top-3 rounded-full bg-background/70 px-2 py-1 text-xs">Zoom ×{zoom * 100}</span>
          </div>
          <label className="mt-4 block text-sm">Microscope zoom
            <input type="range" min={1} max={4} value={zoom} onChange={(e) => setZoom(+e.target.value)} className="w-full accent-[var(--life)]" /></label>
          <label className="mt-2 block text-sm">Time passing → oxygen from photosynthesis: <b className="text-primary">{oxy}%</b>
            <input type="range" min={0} max={100} value={oxy} onChange={(e) => setOxy(+e.target.value)} className="w-full accent-[var(--primary)]" /></label>
        </div>
        <div className="grid gap-4">
          <InfoCard icon="🦠" title="Cells" simple="A cell is the tiniest living unit — like a tiny bag of chemistry that can copy itself." detail="The earliest life was prokaryotic (no nucleus). All living things today share a universal common ancestor, LUCA." />
          <InfoCard icon="🌬️" title="Oxygen" simple="Microbes using sunlight let out oxygen. Over a long time it filled the air." detail="The Great Oxygenation Event (~2.4 Ga) left banded iron formations and made complex, oxygen-using life possible later." />
          <InfoCard icon="🪨" title="Stromatolites" simple="Microbes built layered rock mounds. Some still grow today in Australia!" detail="Stromatolites at Shark Bay, Australia are living analogues of 3.5-billion-year-old fossils." />
        </div>
      </div>
    </Chapter>
  );
}

const CREATURES = [
  { n: "Anomalocaris", x: 25, y: 22, e: "🦐", d: "A top predator up to ~1 m long with grabbing front limbs.", today: "Distant relative of arthropods like shrimp and insects" },
  { n: "Trilobite", x: 62, y: 75, e: "🪲", d: "Armoured sea-floor crawlers with some of the earliest complex eyes.", today: "Like a horseshoe crab or woodlouse" },
  { n: "Opabinia", x: 72, y: 35, e: "🐛", d: "Had FIVE eyes and a long nozzle-like grabber.", today: "No close living look-alike!" },
  { n: "Pikaia", x: 40, y: 55, e: "🐟", d: "A small swimmer with an early backbone-like rod.", today: "Relative of the chordate group that includes us" },
];
function Ch3() {
  const [sel, setSel] = useState(0);
  const c = CREATURES[sel];
  return (
    <Chapter id="cambrian">
      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div className="relative aspect-video overflow-hidden rounded-2xl border">
          <img src={cambrian} alt="Cambrian sea" loading="lazy" className="h-full w-full object-cover" />
          {CREATURES.map((cr, i) => (
            <button key={cr.n} onClick={() => setSel(i)} style={{ left: `${cr.x}%`, top: `${cr.y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 px-2 py-1 text-xs font-bold backdrop-blur ${sel === i ? "anim-pulse border-primary bg-primary text-primary-foreground" : "border-foreground/60 bg-background/60"}`}>{cr.n}</button>
          ))}
        </div>
        <div className="glass p-6">
          <div className="text-5xl">{c.e}</div>
          <h3 className="mt-3 text-2xl font-bold text-primary">{c.n}</h3>
          <p className="mt-2 text-sm">{c.d}</p>
          <div className="mt-4 rounded-xl bg-secondary p-3 text-sm"><b className="text-life">Compare today: </b>{c.today}</div>
          <DidYouKnow>The Burgess Shale in Canada preserved soft bodies of Cambrian animals in amazing detail.</DidYouKnow>
        </div>
      </div>
    </Chapter>
  );
}

function Ch4() {
  const [t, setT] = useState(0);
  const steps = [
    { e: "🌊", n: "Ocean only", d: "All complex life lives in water." },
    { e: "🌱", n: "Plants (~470 Ma)", d: "Small plants and fungi start making soil." },
    { e: "🦂", n: "Arthropods (~420 Ma)", d: "Millipede and scorpion relatives follow the plants." },
    { e: "🐟", n: "Fish with legs (~375 Ma)", d: "Tiktaalik: lobe-fins with wrist-like bones." },
    { e: "🐸", n: "Amphibians (~360 Ma)", d: "Must return to water to lay eggs." },
    { e: "🦎", n: "Reptiles (~312 Ma)", d: "Shelled eggs let them live far from water." },
  ];
  return (
    <Chapter id="land">
      <div className="overflow-hidden rounded-2xl border p-8" style={{ background: `linear-gradient(90deg, var(--navy), color-mix(in oklab, var(--life) ${t * 8}%, var(--navy)))` }}>
        <div className="text-center text-7xl transition-all">{steps[t].e}</div>
        <h3 className="mt-4 text-center text-2xl font-bold">{steps[t].n}</h3>
        <p className="mt-2 text-center text-muted-foreground">{steps[t].d}</p>
        <input type="range" min={0} max={steps.length - 1} value={t} onChange={(e) => setT(+e.target.value)} aria-label="Move from ocean to land" className="mt-8 w-full accent-[var(--life)]" />
        <div className="mt-1 flex justify-between text-xs text-muted-foreground"><span>Ancient ocean</span><span>Prehistoric land</span></div>
      </div>
    </Chapter>
  );
}

const DINOS = [
  { n: "Tyrannosaurus rex", len: 12.3, d: "Late Cretaceous meat-eater with a bite stronger than any living land animal.", dino: true },
  { n: "Triceratops", len: 9, d: "Three-horned plant-eater; lived alongside T. rex.", dino: true },
  { n: "Argentinosaurus", len: 35, d: "One of the largest land animals ever (size estimated from partial bones).", dino: true },
  { n: "Velociraptor", len: 2, d: "Turkey-sized and feathered — much smaller than in movies!", dino: true },
  { n: "Pteranodon", len: 6, d: "A flying pterosaur — NOT a dinosaur, but a close reptile cousin. (Wingspan shown.)", dino: false },
  { n: "Mosasaurus", len: 15, d: "A giant marine lizard — NOT a dinosaur.", dino: false },
];
const OBJECTS = [{ n: "Person", m: 1.7, e: "🧍" }, { n: "School bus", m: 12, e: "🚌" }, { n: "Blue whale", m: 25, e: "🐋" }];
function Ch5() {
  const [sel, setSel] = useState(0);
  const [obj, setObj] = useState(0);
  const [impact, setImpact] = useState(false);
  const [track, setTrack] = useState<number>(-1);
  const d = DINOS[sel], o = OBJECTS[obj];
  const scale = 100 / Math.max(d.len, o.m);
  return (
    <Chapter id="dinos" bg={dinos}>
      <div className="grid gap-6 lg:grid-cols-3">
        {DINOS.map((x, i) => (
          <button key={x.n} onClick={() => setSel(i)} className={`glass lift p-5 text-left ${sel === i ? "border-primary" : ""}`}>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${x.dino ? "bg-life text-life-foreground" : "bg-accent text-accent-foreground"}`}>{x.dino ? "Dinosaur" : "Not a dinosaur"}</span>
            <h3 className="mt-2 font-bold">{x.n}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{x.d}</p>
          </button>
        ))}
      </div>
      <div className="glass mt-6 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-bold">Size comparison: {d.n} ({d.len} m) vs {o.n} ({o.m} m)</h3>
          <div className="flex gap-2">{OBJECTS.map((x, i) => <button key={x.n} onClick={() => setObj(i)} className={`rounded-full border px-3 py-1 text-xs ${obj === i ? "bg-primary text-primary-foreground" : ""}`}>{x.e} {x.n}</button>)}</div>
        </div>
        <div className="mt-6 space-y-3">
          <div className="h-8 rounded-full bg-life/70 transition-all duration-700" style={{ width: `${d.len * scale}%` }} />
          <div className="h-8 rounded-full bg-accent/70 transition-all duration-700" style={{ width: `${o.m * scale}%` }} />
        </div>
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="glass p-6">
          <h3 className="font-bold">Follow the footprint trail</h3>
          <div className="mt-4 flex flex-wrap gap-3">
            {["Three-toed theropod: walked on two legs, sharp claws", "Round sauropod print: huge four-legged plant-eater", "Spacing shows it was running ~ 8 m/s", "Small prints beside big ones: maybe a herd with young"].map((f, i) => (
              <button key={i} onClick={() => setTrack(i)} className={`text-3xl transition ${track >= i ? "opacity-100" : "opacity-40"} hover:scale-125`} style={{ transform: `rotate(${i % 2 ? 15 : -15}deg)` }} aria-label={`Footprint ${i + 1}`}>🐾</button>
            ))}
          </div>
          <p className="mt-3 min-h-10 text-sm text-muted-foreground">{track >= 0 ? ["Three-toed theropod: walked on two legs, sharp claws", "Round sauropod print: huge four-legged plant-eater", "Spacing shows it was running fast", "Small prints beside big ones: maybe a herd with young"][track] : "Tap each footprint."}</p>
        </div>
        <div className={`relative overflow-hidden rounded-2xl border p-6 transition-colors duration-1000 ${impact ? "bg-destructive/30" : "glass"}`}>
          <h3 className="font-bold">66 million years ago…</h3>
          <div className={`absolute right-6 text-4xl transition-all duration-1000 ${impact ? "top-24 right-1/2" : "-top-2"}`}>☄️</div>
          <p className="mt-3 text-sm">{impact
            ? "A ~10 km asteroid hit Chicxulub, Mexico. Dust blocked sunlight, plants died, food webs collapsed. About 75% of species vanished — including all non-bird dinosaurs. Small mammals and birds survived."
            : "Press the button to see how the end-Cretaceous extinction changed life forever."}</p>
          <button onClick={() => setImpact(!impact)} className="btn-sweep mt-4 rounded-full bg-destructive px-4 py-2 text-sm font-bold text-destructive-foreground">{impact ? "Reset" : "Trigger impact"}</button>
        </div>
      </div>
    </Chapter>
  );
}

const MAMMALS = [
  { a: "Mammoth", ae: "🦣", b: "Asian elephant", be: "🐘", d: "Woolly mammoths were close relatives of Asian elephants; some survived until ~4,000 years ago." },
  { a: "Pakicetus", ae: "🐺", b: "Whale", be: "🐋", d: "Whales descend from four-legged land mammals ~50 million years ago." },
  { a: "Eohippus", ae: "🦊", b: "Horse", be: "🐎", d: "Early horse relatives were dog-sized forest animals with several toes." },
  { a: "Smilodon", ae: "🐯", b: "House cat", be: "🐈", d: "Sabre-toothed cats were felids — but not direct ancestors of today's cats." },
];
function Ch6() {
  const [flip, setFlip] = useState<number[]>([]);
  return (
    <Chapter id="mammals">
      <p className="max-w-2xl text-muted-foreground">With the big dinosaurs gone, mammals spread into forests and, later, grasslands. Tap a card to meet its living relative.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {MAMMALS.map((m, i) => {
          const f = flip.includes(i);
          return (
            <button key={m.a} onClick={() => setFlip((x) => (f ? x.filter((y) => y !== i) : [...x, i]))} className="glass lift p-6 text-left">
              <div className="text-5xl">{f ? m.be : m.ae}</div>
              <h3 className="mt-3 font-bold">{f ? `Today: ${m.b}` : `Ancient: ${m.a}`}</h3>
              <p className="mt-2 text-xs text-muted-foreground">{f ? m.d : "Tap to compare →"}</p>
            </button>
          );
        })}
      </div>
    </Chapter>
  );
}

function Ch7() {
  const pts = [
    { n: "Africa (origin ~300 ka)", x: 52, y: 58 }, { n: "Middle East ~120–90 ka", x: 58, y: 42 }, { n: "Asia ~70–60 ka", x: 72, y: 40 },
    { n: "Australia ~65–50 ka", x: 84, y: 72 }, { n: "Europe ~45 ka", x: 50, y: 30 }, { n: "Americas ~20–15 ka", x: 22, y: 40 },
  ];
  const [step, setStep] = useState(0);
  return (
    <Chapter id="humans">
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <p className="text-muted-foreground">Human evolution is a <b className="text-foreground">branching bush</b>, not a ladder. Several human species lived at the same time. Explore the full interactive tree in the Evolution Lab.</p>
          <Link to="/lab" className="btn-sweep mt-4 inline-block rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground">Open the Human Evolution Explorer →</Link>
          <InfoCardDNA />
        </div>
        <div className="glass p-5">
          <h3 className="font-bold">Spread of Homo sapiens (approximate)</h3>
          <svg viewBox="0 0 100 80" className="mt-3 w-full rounded-xl bg-navy">
            <path d="M15 25 Q25 15 35 25 L30 55 Q22 60 20 45Z M45 20 Q60 12 85 22 L88 45 Q70 50 60 45 L55 60 Q50 72 46 60 L44 40Z M78 65 Q88 62 92 70 Q85 78 78 72Z" fill="var(--secondary)" />
            {pts.slice(0, step + 1).map((p, i) => i > 0 && (
              <line key={"l" + i} x1={pts[Math.max(0, i === 5 ? 2 : i === 3 ? 2 : i === 4 ? 1 : i - 1)].x} y1={pts[Math.max(0, i === 5 ? 2 : i === 3 ? 2 : i === 4 ? 1 : i - 1)].y} x2={p.x} y2={p.y} stroke="var(--accent)" strokeWidth=".8" strokeDasharray="2 1" />
            ))}
            {pts.slice(0, step + 1).map((p) => <circle key={p.n} cx={p.x} cy={p.y} r="2" fill="var(--primary)" />)}
          </svg>
          <p className="mt-3 text-sm">{pts[step].n}</p>
          <button onClick={() => setStep((s) => (s + 1) % pts.length)} className="mt-3 rounded-full bg-accent px-4 py-2 text-sm font-bold text-accent-foreground">{step === pts.length - 1 ? "Restart" : "Next wave →"}</button>
        </div>
      </div>
    </Chapter>
  );
}
function InfoCardDNA() {
  return <div className="mt-6"><InfoCard icon="🧬" title="How scientists study our past" simple="Scientists dig up fossils, date the rocks around them, and even read ancient DNA from bones."
    detail="Ancient DNA revealed Neanderthal and Denisovan interbreeding with Homo sapiens. Dates and relationships are revised as new fossils are found — it's an ongoing field." /></div>;
}

function Ch8() {
  return (
    <Chapter id="today">
      <div className="grid gap-4 md:grid-cols-3">
        <InfoCard icon="🌍" title="Biodiversity" simple="Millions of species live today — most still undiscovered!" detail="Estimates range around 8–9 million eukaryotic species; only ~2 million are described." />
        <InfoCard icon="🎲" title="No final goal" simple="Evolution isn't aiming anywhere. A bacterium is just as 'evolved' as you." detail="All living species have the same length of ancestry. Evolution has no predetermined direction; humans aren't its endpoint." />
        <InfoCard icon="🛡️" title="Conservation" simple="Humans now change ecosystems fast. Protecting habitats helps life keep its story going." detail="Habitat loss, climate change and invasive species are major drivers of current biodiversity loss." />
      </div>
      <Reveal className="mt-20 text-center">
        <p className="font-display text-3xl font-extrabold md:text-5xl">Every living thing carries a story.</p>
        <p className="mt-3 font-display text-3xl font-extrabold text-gradient md:text-5xl">And that story is still being written.</p>
        <Link to="/quiz" className="btn-sweep mt-10 inline-block rounded-full bg-accent px-7 py-3.5 text-sm font-bold tracking-widest text-accent-foreground">TAKE THE TIME TRAVELER'S CHALLENGE</Link>
      </Reveal>
    </Chapter>
  );
}
