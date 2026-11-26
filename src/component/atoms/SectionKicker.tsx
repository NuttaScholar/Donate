import type { ReactNode } from "react";

export default function SectionKicker({ children }: { children: ReactNode }) {
  return <span className="kicker">{children}</span>;
}
