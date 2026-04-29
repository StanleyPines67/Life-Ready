import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { getCategory, getCourse, courseEmoji, courseJoke } from "@/data/courses";
import { useProgress } from "@/hooks/useProgress";
import { useRewards } from "@/hooks/useRewards";

export const Route = createFileRoute("/course/$categorySlug/$courseSlug")({
  loader: ({ params }) => {
    const category = getCategory(params.categorySlug);
    const course = getCourse(params.categorySlug, params.courseSlug);
    if (!category || !course) throw notFound();
    return { category, course };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.course.title} — LifeReady` },
          { name: "description", content: loaderData.course.why },
          { property: "og:title", content: `${loaderData.course.title} — LifeReady` },
          { property: "og:description", content: loaderData.course.why },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center px-5 text-center">
      <div>
        <h1 className="font-display text-4xl">Course not found</h1>
        <Link to="/" className="mt-4 inline-block text-primary underline">Go home</Link>
      </div>
    </div>
  ),
  component: CoursePage,
});

function CoursePage() {
  const { category, course } = Route.useLoaderData();
  const id = `${category.slug}/${course.slug}`;
  const { completedSteps, completedCourses, toggleStep, completeCourse, resetCourse } = useProgress();
  const { awardForCourse } = useRewards();
  const stepsDone = completedSteps[id] ?? [];
  const isDone = completedCourses.includes(id);

  const [quizPick, setQuizPick] = useState<number | null>(null);
  const quizSubmitted = quizPick !== null;
  const quizCorrect = quizPick === course.quiz.correctIndex;

  const allStepsChecked = stepsDone.length === course.steps.length;

  const handleComplete = () => {
    completeCourse(id);
    awardForCourse(id, course.featured);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 mx-auto max-w-2xl w-full px-5 py-12">
        <Link
          to="/category/$categorySlug"
          params={{ categorySlug: category.slug }}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← {category.title}
        </Link>

        {/* Header */}
        <header className="mt-6">
          <div className="flex items-center gap-3">
            <span
              className="h-14 w-14 rounded-2xl bg-primary-soft grid place-items-center text-3xl flex-shrink-0"
              aria-hidden
            >
              {course.emoji ?? courseEmoji(course.slug, category.emoji)}
            </span>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <span>{course.duration}</span>
              <span>•</span>
              <span>{course.steps.length} steps</span>
            </div>
          </div>
          <h1 className="mt-4 font-display text-4xl md:text-5xl tracking-tight leading-[1.05]">
            {course.featured && <span aria-label="essential" title="Essential">⭐ </span>}
            {course.title}
          </h1>
          {course.tier && (
            <p className="mt-3 inline-block text-xs uppercase tracking-[0.18em] text-muted-foreground bg-secondary px-3 py-1 rounded-full">
              {course.tier} tier
            </p>
          )}
          {(course.joke ?? courseJoke(course.slug)) && (
            <p className="mt-4 text-sm italic text-muted-foreground leading-relaxed">
              “{course.joke ?? courseJoke(course.slug)}”
            </p>
          )}
        </header>

        {/* Hook */}
        <section className="mt-8 rounded-3xl bg-primary-soft border border-primary/20 p-6">
          <p className="font-display text-xl leading-snug">{course.hook}</p>
        </section>

        {/* Why */}
        <section className="mt-6 rounded-3xl bg-secondary/60 border border-border/70 p-6">
          <h2 className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Why this matters</h2>
          <p className="mt-3 leading-relaxed">{course.why}</p>
        </section>

        {/* Steps */}
        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight">Steps</h2>
          <ol className="mt-6 space-y-3">
            {course.steps.map((step, i) => {
              const checked = stepsDone.includes(i);
              return (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => toggleStep(id, i)}
                    className={`w-full text-left rounded-2xl border p-5 transition-all ${
                      checked
                        ? "bg-primary-soft border-primary/30"
                        : "bg-card border-border/70 hover:border-primary/30"
                    }`}
                  >
                    <div className="flex gap-4">
                      <span
                        className={`mt-0.5 h-6 w-6 rounded-full border-2 grid place-items-center text-xs flex-shrink-0 transition-all ${
                          checked
                            ? "bg-primary border-primary text-primary-foreground"
                            : "border-border"
                        }`}
                      >
                        {checked ? "✓" : i + 1}
                      </span>
                      <div className="min-w-0">
                        <h3 className={`font-medium ${checked ? "line-through opacity-70" : ""}`}>
                          {step.title}
                        </h3>
                        <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{step.body}</p>
                        {step.warning && (
                          <p className="mt-3 text-sm text-destructive flex gap-2">
                            <span aria-hidden>⚠</span>
                            <span>{step.warning}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ol>
        </section>

        {/* Mistakes */}
        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight">Common mistakes</h2>
          <ul className="mt-5 space-y-2">
            {course.mistakes.map((m, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed">
                <span className="text-primary mt-1.5 flex-shrink-0" aria-hidden>×</span>
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Quiz */}
        <section className="mt-12 rounded-3xl bg-card border border-border/70 p-6">
          <h2 className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Quick check</h2>
          <p className="mt-3 font-display text-xl leading-snug">{course.quiz.question}</p>
          <div className="mt-5 space-y-2">
            {course.quiz.options.map((opt, i) => {
              const isPick = quizPick === i;
              const isCorrect = i === course.quiz.correctIndex;
              const showState = quizSubmitted && (isPick || isCorrect);
              return (
                <button
                  key={i}
                  type="button"
                  disabled={quizSubmitted}
                  onClick={() => setQuizPick(i)}
                  className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${
                    showState && isCorrect
                      ? "bg-secondary border-secondary-foreground/20"
                      : showState && isPick
                        ? "bg-destructive/10 border-destructive/30"
                        : "bg-background border-border hover:border-primary/40"
                  } ${quizSubmitted ? "cursor-default" : "cursor-pointer"}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
          {quizSubmitted && (
            <div className="mt-5 text-sm">
              <p className="font-medium">
                {quizCorrect ? "Nice — that's right." : "Not quite."}
              </p>
              <p className="mt-1 text-muted-foreground leading-relaxed">{course.quiz.explanation}</p>
            </div>
          )}
        </section>

        {/* Complete */}
        <section className="mt-12 mb-16 rounded-3xl border border-border/70 p-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-medium">
              {isDone ? "You've completed this skill." : "Mark as complete?"}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {allStepsChecked || isDone
                ? "All steps checked off."
                : `${stepsDone.length} of ${course.steps.length} steps checked.`}
            </p>
          </div>
          {isDone ? (
            <button
              type="button"
              onClick={() => resetCourse(id)}
              className="px-5 py-2.5 rounded-full border border-border text-sm hover:bg-secondary transition-colors"
            >
              Reset progress
            </button>
          ) : (
            <button
              type="button"
              onClick={handleComplete}
              className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:scale-[1.02] transition-transform"
            >
              Mark complete
            </button>
          )}
        </section>
      </main>
    </div>
  );
}
