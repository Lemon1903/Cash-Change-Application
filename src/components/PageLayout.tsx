import { PropsWithChildren } from "react";

export function PageLayout({ children }: PropsWithChildren) {
  return (
    <div className="grid justify-items-center gap-12 px-8 py-8">{children}</div>
  );
}

export function PageHeader({ children }: PropsWithChildren) {
  return (
    <div className="grid max-w-5xl gap-6 text-2xl md:text-3xl lg:gap-4 lg:text-right xl:text-5xl">
      {children}
    </div>
  );
}
