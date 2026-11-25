import { ViewTransition } from "react";

// Page change: the old page blurs out and the new one comes into focus (styles in globals.css).
// Templates remount on every navigation, so enter/exit fire here; the nav is anchored separately.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      {children}
    </ViewTransition>
  );
}
