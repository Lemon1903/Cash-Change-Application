import { PropsWithChildren } from "react";

export default function Shell({ children }: PropsWithChildren) {
  return (
    <div className="grid justify-items-center gap-12 py-8">{children}</div>
  );
}
