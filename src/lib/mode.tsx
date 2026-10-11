import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Mode = "explorer" | "discovery";
type Ctx = {
  mode: Mode; setMode: (m: Mode) => void;
  contrast: boolean; setContrast: (b: boolean) => void;
  visited: string[]; visit: (id: string) => void;
  favs: string[]; toggleFav: (id: string) => void;
};
const C = createContext<Ctx | null>(null);

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>("explorer");
  const [contrast, setContrast] = useState(false);
  const [visited, setVisited] = useState<string[]>([]);
  const [favs, setFavs] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem("evochron") || "{}");
      if (s.mode) setMode(s.mode);
      if (s.contrast) setContrast(s.contrast);
      if (s.visited) setVisited(s.visited);
      if (s.favs) setFavs(s.favs);
    } catch { /* ignore */ }
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    localStorage.setItem("evochron", JSON.stringify({ mode, contrast, visited, favs }));
    document.documentElement.classList.toggle("contrast", contrast);
  }, [mode, contrast, visited, favs, ready]);
  const visit = (id: string) => setVisited((v) => (v.includes(id) ? v : [...v, id]));
  const toggleFav = (id: string) => setFavs((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));
  return <C.Provider value={{ mode, setMode, contrast, setContrast, visited, visit, favs, toggleFav }}>{children}</C.Provider>;
}
export const useMode = () => {
  const c = useContext(C);
  if (!c) throw new Error("ModeProvider missing");
  return c;
};

/** Pick simple vs detailed text based on reading mode */
export function useT() {
  const { mode } = useMode();
  return (simple: string, detailed: string) => (mode === "explorer" ? simple : detailed);
}
