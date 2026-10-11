import { createFileRoute, Link } from "@tanstack/react-router";
import earth from "@/assets/earth.jpg";
import hadean from "@/assets/hadean.jpg";
import cambrian from "@/assets/cambrian.jpg";
import dinos from "@/assets/dinos.jpg";
import { CountUp, Reveal } from "@/components/Shell";
import { CHAPTERS } from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EVOCHRON — The Living Story of Earth" },
      { name: "description", content: "Travel 4.5 billion years through the story of our planet, its creatures and the evolution of humanity." },
      { property: "og:title", content: "EVOCHRON — The Living Story of Earth" },
      { property: "og:description", content: "An interactive time machine through Earth's history and the evolution of life." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <section className="starfield anim-drift relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
        <img src={earth} alt="Planet Earth glowing in space" width={1920} height={1088}
          className="anim-earth pointer-events-none absolute inset-0 h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background" />
        <div className="relative z-10">
          <p className="anim-rise text-xs font-bold uppercase tracking-[.5em] text-primary">A time machine for curious minds</p>
          <h1 className="anim-rise mt-6 text-6xl font-extrabold tracking-[.12em] text-gradient sm:text-8xl md:text-9xl">EVOCHRON</h1>
          <p className="anim-rise mt-4 font-display text-2xl text-foreground md:text-3xl">The Living Story of Earth</p>
          <p className="anim-rise mx-auto mt-6 max-w-xl text-muted-foreground">
            Travel 4.5 billion years through the incredible story of our planet, the creatures that shaped it, and the evolution of humanity.
          </p>
          <div className="anim-rise mt-10 flex flex-wrap justify-center gap-3">
            <Link to="/journey" className="btn-sweep rounded-full bg-primary px-7 py-3.5 text-sm font-bold tracking-widest text-primary-foreground shadow-[var(--glow-cyan)]">BEGIN YOUR JOURNEY</Link>
            <Link to="/timeline" className="btn-sweep glass px-7 py-3.5 text-sm font-bold tracking-widest">EXPLORE THE TIMELINE</Link>
            <Link to="/lab" className="btn-sweep rounded-full bg-accent px-7 py-3.5 text-sm font-bold tracking-widest text-accent-foreground shadow-[var(--glow-amber)]">ENTER THE SIMULATIONS</Link>
          </div>
        </div>
        <div className="absolute bottom-8 z-10 flex flex-col items-center gap-2 text-xs uppercase tracking-[.3em] text-muted-foreground">
          Scroll
          <span className="anim-float block h-10 w-6 rounded-full border-2 border-muted-foreground/50 p-1"><span className="block h-2 w-1 mx-auto rounded-full bg-primary" /></span>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 py-24 sm:grid-cols-3">
        {[
          { v: 4.54, s: " billion", l: "years of Earth history" },
          { v: 8, s: "", l: "chapters to explore" },
          { v: 300000, s: "", l: "years of Homo sapiens" },
        ].map((x) => (
          <Reveal key={x.l} className="glass lift p-8 text-center">
            <div className="font-display text-4xl font-extrabold text-primary"><CountUp to={x.v} suffix={x.s} /></div>
            <div className="mt-2 text-sm text-muted-foreground">{x.l}</div>
          </Reveal>
        ))}
      </section>

      {[
        { img: hadean, k: "Chapter 1", t: "A world of fire and water", d: "Witness the young Earth: lava, steam, and the first oceans." },
        { img: cambrian, k: "Chapter 3", t: "Oceans full of strangers", d: "Meet the bizarre animals of the Cambrian seas." },
        { img: dinos, k: "Chapter 5", t: "When giants walked", d: "Explore 165 million years of dinosaurs — and the day it ended." },
      ].map((s, i) => (
        <section key={s.t} className="relative flex min-h-[80vh] items-center overflow-hidden">
          <img src={s.img} alt={s.t} loading="lazy" width={1600} height={912} className="absolute inset-0 h-full w-full object-cover" />
          <div className={`absolute inset-0 ${i % 2 ? "bg-gradient-to-l" : "bg-gradient-to-r"} from-background via-background/60 to-transparent`} />
          <Reveal className={`relative mx-auto w-full max-w-6xl px-6 ${i % 2 ? "text-right" : ""}`}>
            <p className="text-xs font-bold uppercase tracking-[.35em] text-accent">{s.k}</p>
            <h2 className="mt-3 text-4xl font-extrabold md:text-6xl">{s.t}</h2>
            <p className={`mt-4 max-w-md text-muted-foreground ${i % 2 ? "ml-auto" : ""}`}>{s.d}</p>
            <Link to="/journey" className="mt-6 inline-block text-sm font-bold tracking-widest text-primary hover:underline">ENTER →</Link>
          </Reveal>
        </section>
      ))}

      <section className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="text-center text-3xl font-extrabold md:text-5xl">Eight chapters. <span className="text-gradient">One living story.</span></h2>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CHAPTERS.map((c) => (
            <Link key={c.id} to="/journey" hash={c.id} className="glass lift block p-6">
              <div className="text-xs font-bold text-accent">0{c.n}</div>
              <div className="mt-2 font-display text-lg font-bold">{c.title}</div>
              <div className="mt-1 text-xs text-muted-foreground">{c.date}</div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
