import { Link } from "@tanstack/react-router";
import { useRewards } from "@/hooks/useRewards";

export function SiteHeader() {
  const { coins } = useRewards();
  const linkBase = "px-3 py-2 rounded-full text-muted-foreground hover:text-foreground transition-colors";
  const linkActive = { className: "px-3 py-2 rounded-full bg-secondary text-foreground" };

  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-background/75 border-b border-border/60">
      <div className="mx-auto max-w-5xl px-5 h-16 flex items-center justify-between gap-2">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="h-8 w-8 rounded-2xl bg-primary text-primary-foreground grid place-items-center font-display text-lg leading-none transition-transform group-hover:-rotate-6">
            ◐
          </span>
          <span className="font-display text-xl tracking-tight">LifeReady</span>
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          <Link to="/" activeOptions={{ exact: true }} className={linkBase} activeProps={linkActive}>Home</Link>
          <Link to="/library" className={linkBase} activeProps={linkActive}>Library</Link>
          <Link to="/suggestions" className={`${linkBase} hidden sm:inline-block`} activeProps={linkActive}>Suggest</Link>
          <Link
            to="/rewards"
            className="ml-1 px-3 py-1.5 rounded-full bg-primary-soft text-foreground text-xs font-medium tabular-nums hover:scale-[1.03] transition-transform"
          >
            🪙 {coins}
          </Link>
        </nav>
      </div>
    </header>
  );
}
