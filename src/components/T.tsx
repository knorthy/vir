import { isPlaceholder, unbracket } from "@/data/portfolio";

/* Placeholder text ([like this]) renders redlined so it is easy to spot. */
export function T({ children }: { children: string }) {
  if (!isPlaceholder(children)) return <>{children}</>;
  return <span className="tbd">{unbracket(children)}</span>;
}
