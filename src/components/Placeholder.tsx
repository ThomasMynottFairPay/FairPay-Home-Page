// Visible marker for copy that is waiting on a decision. Remove once the value is final.
export function Placeholder({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded bg-amber-100 px-1.5 py-0.5 text-amber-800 border border-amber-200 font-medium text-[0.9em]">
      {children}
    </span>
  );
}
