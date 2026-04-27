import { useEffect, useState, useCallback } from "react";

const KEY = "lifeready:progress:v1";

type Progress = {
  completedSteps: Record<string, number[]>; // courseId -> step indexes
  completedCourses: string[];
};

const empty: Progress = { completedSteps: {}, completedCourses: [] };

const read = (): Progress => {
  if (typeof window === "undefined") return empty;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...empty, ...JSON.parse(raw) } : empty;
  } catch {
    return empty;
  }
};

const listeners = new Set<() => void>();
const notify = () => listeners.forEach((l) => l());

export function useProgress() {
  const [state, setState] = useState<Progress>(empty);

  useEffect(() => {
    setState(read());
    const sync = () => setState(read());
    listeners.add(sync);
    return () => {
      listeners.delete(sync);
    };
  }, []);

  const persist = useCallback((next: Progress) => {
    localStorage.setItem(KEY, JSON.stringify(next));
    setState(next);
    notify();
  }, []);

  const toggleStep = useCallback(
    (courseId: string, stepIndex: number) => {
      const current = read();
      const arr = current.completedSteps[courseId] ?? [];
      const next = arr.includes(stepIndex)
        ? arr.filter((i) => i !== stepIndex)
        : [...arr, stepIndex];
      persist({
        ...current,
        completedSteps: { ...current.completedSteps, [courseId]: next },
      });
    },
    [persist],
  );

  const completeCourse = useCallback(
    (courseId: string) => {
      const current = read();
      if (current.completedCourses.includes(courseId)) return;
      persist({
        ...current,
        completedCourses: [...current.completedCourses, courseId],
      });
    },
    [persist],
  );

  const resetCourse = useCallback(
    (courseId: string) => {
      const current = read();
      const { [courseId]: _, ...rest } = current.completedSteps;
      persist({
        completedSteps: rest,
        completedCourses: current.completedCourses.filter((c) => c !== courseId),
      });
    },
    [persist],
  );

  return {
    completedSteps: state.completedSteps,
    completedCourses: state.completedCourses,
    toggleStep,
    completeCourse,
    resetCourse,
  };
}
