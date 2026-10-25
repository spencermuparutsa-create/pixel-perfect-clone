import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/Shell";
import { QUIZ } from "@/lib/data";
import { achievement } from "@/lib/quiz";
import { useMode } from "@/lib/mode";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "The Time Traveler's Challenge — EVOCHRON" },
      { name: "description", content: "Ten questions about Earth's history, dinosaurs, natural selection and human evolution." },
      { property: "og:title", content: "The Time Traveler's Challenge — EVOCHRON" },
      { property: "og:description", content: "Test what you learned and earn your achievement title." },
    ],
  }),
  component: Quiz,
});

function Quiz() {
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [picked, setPicked] = useState<number | null>(null);
  const { visit } = useMode();
  const done = answers.length === QUIZ.length;
  useEffect(() => { if (done) visit("quiz"); }, [done, visit]);
  const q = QUIZ[i];
  const score = answers.filter((a, k) => a === QUIZ[k].answer).length;

  const next = () => { setAnswers([...answers, picked!]); setPicked(null); setI(i + 1); };
  const replay = () => { setI(0); setAnswers([]); setPicked(null); };

  return (
    <>
      <PageHeader kicker="Final Quiz" title="The Time Traveler's Challenge" sub="Ten questions. Every answer teaches you something — mistakes are part of discovery." />
      <div className="mx-auto max-w-3xl px-4 pb-24">
        <div className="h-2 overflow-hidden rounded-full bg-secondary">
          <div className="h-full bg-gradient-to-r from-primary to-life transition-all duration-500" style={{ width: `${(answers.length / QUIZ.length) * 100}%` }} />
        </div>
        {!done ? (
          <div className="glass mt-6 p-6 md:p-8">
            <p className="text-xs font-bold uppercase tracking-widest text-accent">Question {i + 1} of {QUIZ.length}</p>
            <h2 className="mt-3 text-2xl font-bold">{q.q}</h2>
            <div className="mt-6 grid gap-3">
              {q.options.map((o, k) => {
                const show = picked !== null;
                const state = !show ? "" : k === q.answer ? "border-life bg-life/20" : k === picked ? "border-destructive bg-destructive/20" : "opacity-50";
                return (
                  <button key={o} disabled={show} onClick={() => setPicked(k)} className={`rounded-xl border p-4 text-left transition hover:border-primary ${state}`}>{o}</button>
                );
              })}
            </div>
            {picked !== null && (
              <div className="mt-6 animate-in fade-in slide-in-from-bottom-2">
                <p className={`font-bold ${picked === q.answer ? "text-life" : "text-accent"}`}>{picked === q.answer ? "🎉 Correct!" : "Not quite — here's the idea:"}</p>
                <p className="mt-1 text-sm text-muted-foreground">{q.why}</p>
                <button onClick={next} className="btn-sweep mt-4 rounded-full bg-primary px-6 py-2.5 font-bold text-primary-foreground">{i === QUIZ.length - 1 ? "See results" : "Next question →"}</button>
              </div>
            )}
          </div>
        ) : (
          <div className="mt-6 space-y-6">
            <div className="glass p-8 text-center">
              <div className="text-6xl">🏆</div>
              <p className="mt-4 text-sm uppercase tracking-widest text-muted-foreground">Your score</p>
              <p className="font-display text-6xl font-extrabold text-gradient">{score}/{QUIZ.length}</p>
              <p className="mt-3 text-2xl font-bold text-accent">{achievement(score, QUIZ.length)}</p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button onClick={replay} className="btn-sweep rounded-full bg-primary px-6 py-2.5 font-bold text-primary-foreground">Play again</button>
                <Link to="/journey" className="rounded-full border px-6 py-2.5 font-bold">Revisit the journey</Link>
              </div>
            </div>
            {score < QUIZ.length && (
              <div className="glass p-6">
                <h3 className="text-lg font-bold">Review what you missed</h3>
                <div className="mt-4 space-y-4">
                  {QUIZ.map((qq, k) => answers[k] !== qq.answer && (
                    <div key={k} className="rounded-xl bg-secondary p-4 text-sm">
                      <p className="font-bold">{qq.q}</p>
                      <p className="mt-1 text-destructive">Your answer: {qq.options[answers[k]]}</p>
                      <p className="text-life">Correct: {qq.options[qq.answer]}</p>
                      <p className="mt-1 text-muted-foreground">{qq.why}</p>
                      {qq.chapter === "lab" ? <Link to="/lab" className="mt-2 inline-block text-primary underline">Try the Evolution Lab</Link>
                        : <Link to="/journey" hash={qq.chapter} className="mt-2 inline-block text-primary underline">Explore this chapter</Link>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
