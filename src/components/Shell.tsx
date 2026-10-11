import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useMode } from "@/lib/mode";
import { CHAPTERS } from "@/lib/data";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/journey", label: "Journey" },
  { to: "/lab", label: "Evolution Lab" },
  { to: "/timeline", label: "Timeline" },
  { to: "/discoveries", label: "Discoveries" },
  { to: "/quiz", label: "Final Quiz" },
] as const;

export function Nav() {
  const { mode, setMode, contrast, setContrast, visited } = useMode();
  const [open, setOpen] = useState(false);
  const pct = Math.round((visited.length / (CHAPTERS.length + 4)) * 100);
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto mt-3 flex max-w-7xl items-center gap-4 px-4">
        <div className="glass flex w-full items-center gap-3 px-4 py-2.5">
          <Link to="/" className="font-display text-lg font-extrabold tracking-[.2em] text-gradient">EVOCHRON</Link>
          <nav className="ml-4 hidden gap-1 lg:flex">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition hover:text-foreground"
                activeProps={{ className: "bg-secondary !text-primary" }} activeOptions={{ exact: true }}>{n.label}</Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <div className="hidden items-center gap-2 md:flex" title="Journey explored">
              <div className="h-1.5 w-20 overflow-hidden rounded-full bg-secondary"><div className="h-full bg-life transition-all" style={{ width: `${Math.min(pct, 100)}%` }} /></div>
              <span className="text-xs text-muted-foreground">{Math.min(pct, 100)}%</span>
            </div>
            <div className="flex rounded-full bg-secondary p-0.5 text-xs">
              {(["explorer", "discovery"] as const).map((m) => (
                <button key={m} onClick={() => setMode(m)} aria-pressed={mode === m}
                  className={`rounded-full px-2.5 py-1 font-semibold uppercase tracking-wide transition ${mode === m ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>{m}</button>
              ))}
            </div>
            <button onClick={() => setContrast(!contrast)} aria-pressed={contrast} title="High-contrast reading"
              className="hidden rounded-full border px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground sm:block">Aa</button>
            <button className="rounded-full border px-3 py-1 text-sm lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">☰</button>
          </div>
        </div>
      </div>
      {open && (
        <nav className="glass mx-4 mt-2 flex flex-col p-2 lg:hidden">
          {NAV.map((n) => <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm hover:bg-secondary">{n.label}</Link>)}
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t px-6 py-14">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
        <div>
          <div className="font-display text-xl font-extrabold tracking-[.2em] text-gradient">EVOCHRON</div>
          <p className="mt-3 text-sm text-muted-foreground">An educational journey through 4.5 billion years. Dates are approximate and science keeps updating them.</p>
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-accent">Scientific sources</h4>
          <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
            <li><a className="hover:text-primary" href="https://humanorigins.si.edu" target="_blank" rel="noreferrer">Smithsonian Human Origins</a></li>
            <li><a className="hover:text-primary" href="https://stratigraphy.org/chart" target="_blank" rel="noreferrer">International Chronostratigraphic Chart</a></li>
            <li><a className="hover:text-primary" href="https://www.nhm.ac.uk" target="_blank" rel="noreferrer">Natural History Museum, London</a></li>
            <li><a className="hover:text-primary" href="https://evolution.berkeley.edu" target="_blank" rel="noreferrer">UC Berkeley — Understanding Evolution</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-accent">Credits</h4>
          <p className="mt-3 text-sm text-muted-foreground">Illustrations are artistic reconstructions, not exact depictions. Simulations are simplified educational models.</p>
        </div>
      </div>
    </footer>
  );
}

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const f = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  if (!show) return null;
  return <button onClick={() => window.scrollTo({ top: 0 })} aria-label="Back to top"
    className="glass anim-pulse fixed bottom-5 right-5 z-50 h-11 w-11 text-primary">↑</button>;
}

export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("in"); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

export function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return; io.disconnect();
      const t0 = performance.now();
      const step = (t: number) => { const p = Math.min((t - t0) / 1500, 1); setV(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    });
    io.observe(el); return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{to % 1 ? v.toFixed(2) : Math.round(v).toLocaleString()}{suffix}</span>;
}

export function Discover({ children }: { children: ReactNode }) {
  const [o, setO] = useState(false);
  return (
    <div className="mt-3">
      <button onClick={() => setO(!o)} className="text-sm font-semibold text-primary hover:underline">{o ? "− Hide" : "+ Discover more"}</button>
      {o && <div className="mt-2 text-sm text-muted-foreground">{children}</div>}
    </div>
  );
}

export function PageHeader({ kicker, title, sub }: { kicker: string; title: string; sub: string }) {
  return (
    <div className="starfield anim-drift relative px-6 pb-12 pt-36 text-center">
      <p className="text-xs font-bold uppercase tracking-[.35em] text-accent">{kicker}</p>
      <h1 className="anim-rise mt-4 text-4xl font-extrabold md:text-6xl">{title}</h1>
      <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{sub}</p>
    </div>
  );
}
