import { ReactNode } from "react";

export function Container({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-5xl mx-auto w-full px-4 py-6">
      {children}
    </div>
  );
}
