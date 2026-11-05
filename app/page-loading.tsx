import { Mark } from "./ui";

// Shown for a moment while a project or service page resolves which one was asked for
export function PageLoading() {
  return (
    <div className="grid min-h-svh place-items-center bg-ink text-ivory/40" aria-busy="true" aria-label="Loading">
      <Mark className="h-8 w-auto animate-pulse" />
    </div>
  );
}
