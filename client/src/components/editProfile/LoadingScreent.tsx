export function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center
                    bg-gradient-to-tr from-secondary/30 via-neutral/60 to-accent/60">
      <span className="text-primary font-bold text-xl animate-pulse">
        Loading...
      </span>
    </div>
  );
}
