import { Link } from "@tanstack/react-router";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-background/75 border-b border-border/60">
      <div className="mx-auto max-w-5xl px-5 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="h-8 w-8 rounded-2xl bg-primary text-primary-foreground grid place-items-center font-display text-lg leading-none transition-transform group-hover:-rotate-6">
            ◐
          </span>
          <span className="font-display text-xl tracking-tight">LifeReady</span>
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          <Link
            to="/"
            activeOptions={{ exact: true }}
            className="px-3 py-2 rounded-full text-muted-foreground hover:text-foreground transition-colors"
            activeProps={{ className: "px-3 py-2 rounded-full bg-secondary text-foreground" }}
          >
            Home
          </Link>
          <Link
            to="/library"
            className="px-3 py-2 rounded-full text-muted-foreground hover:text-foreground transition-colors"
            activeProps={{ className: "px-3 py-2 rounded-full bg-secondary text-foreground" }}
          >
            Library
          </Link>
        </nav>
      </div>
    </header>
  );
}
