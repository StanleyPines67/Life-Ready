import { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  courseTitle: string;
  categoryTitle: string;
};

export function CertificateModal({ open, onClose, courseTitle, categoryTitle }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const today = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handlePrint = () => window.print();

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cert-title"
      className="fixed inset-0 z-50 grid place-items-center px-4 py-8 bg-black/60 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-[2rem] border-[6px] border-primary/30 bg-card p-8 sm:p-12 text-center shadow-[var(--shadow-elevated)]"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundImage:
            "radial-gradient(ellipse at top, color-mix(in oklab, var(--primary) 12%, transparent), transparent 65%)",
        }}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute top-4 right-4 h-8 w-8 rounded-full bg-secondary text-foreground grid place-items-center hover:bg-muted"
        >
          ×
        </button>

        <div className="text-5xl">🏅</div>
        <p className="mt-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Certificate of completion
        </p>
        <h2
          id="cert-title"
          className="mt-4 font-display text-3xl sm:text-4xl tracking-tight leading-tight text-foreground"
        >
          {courseTitle}
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          completed in the {categoryTitle} track
        </p>

        <div className="mt-8 flex items-center justify-center gap-8 text-sm">
          <div>
            <div className="text-muted-foreground text-xs uppercase tracking-wider">Date</div>
            <div className="font-display text-lg text-foreground">{today}</div>
          </div>
          <div className="h-8 w-px bg-border" />
          <div>
            <div className="text-muted-foreground text-xs uppercase tracking-wider">Issued by</div>
            <div className="font-display text-lg text-foreground">LifeReady</div>
          </div>
        </div>

        <p className="mt-8 text-sm italic text-muted-foreground">
          “One small skill, one less thing to worry about.”
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3 print:hidden">
          <button
            type="button"
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium"
          >
            Save / Print
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-full border border-border text-sm hover:bg-secondary"
          >
            Keep going
          </button>
        </div>
      </div>
    </div>
  );
}
