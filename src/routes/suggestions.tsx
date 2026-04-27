import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/suggestions")({
  head: () => ({
    meta: [
      { title: "Suggest a Skill — LifeReady" },
      { name: "description", content: "Tell us what real-life skill we should add next." },
    ],
  }),
  component: Suggestions,
});

const KEY = "lifeready:suggestions:v1";

type Suggestion = { id: string; text: string; votes: number; ts: number };

function read(): Suggestion[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

function Suggestions() {
  const [list, setList] = useState<Suggestion[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    setList(read());
  }, []);

  const save = (next: Suggestion[]) => {
    localStorage.setItem(KEY, JSON.stringify(next));
    setList(next);
  };

  const submit = () => {
    if (!text.trim()) return;
    save([
      { id: crypto.randomUUID(), text: text.trim(), votes: 1, ts: Date.now() },
      ...list,
    ]);
    setText("");
  };

  const upvote = (id: string) =>
    save(list.map((s) => (s.id === id ? { ...s, votes: s.votes + 1 } : s)));

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 mx-auto max-w-2xl w-full px-5 py-14">
        <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">Suggestions</p>
        <h1 className="mt-2 font-display text-5xl tracking-tight">What should we teach next?</h1>
        <p className="mt-3 text-muted-foreground">
          Suggest a real-life skill. Saved locally on your device.
        </p>

        <div className="mt-8 rounded-3xl border border-border/70 bg-card p-5">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="e.g. How to read a nutrition label, How to negotiate medical bills…"
            className="w-full min-h-24 bg-transparent outline-none resize-none text-base"
          />
          <div className="flex justify-end">
            <button
              onClick={submit}
              className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium"
            >
              Submit
            </button>
          </div>
        </div>

        <ul className="mt-10 space-y-3">
          {list
            .sort((a, b) => b.votes - a.votes)
            .map((s) => (
              <li
                key={s.id}
                className="rounded-2xl border border-border/70 bg-card p-4 flex items-center gap-4"
              >
                <button
                  onClick={() => upvote(s.id)}
                  className="flex flex-col items-center px-3 py-2 rounded-xl hover:bg-secondary"
                >
                  <span className="text-primary">▲</span>
                  <span className="text-xs tabular-nums">{s.votes}</span>
                </button>
                <p className="flex-1 text-sm leading-relaxed">{s.text}</p>
              </li>
            ))}
          {list.length === 0 && (
            <li className="text-sm text-muted-foreground text-center py-8">
              No suggestions yet — be the first.
            </li>
          )}
        </ul>
      </main>
    </div>
  );
}
