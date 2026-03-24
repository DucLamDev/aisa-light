import { ReactNode } from "react";
import { Container } from "@/components/ui/container";

export function Hero({
  breadcrumb,
  title,
  description,
  children
}: {
  breadcrumb: ReactNode;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#0f172a_0%,#111827_42%,#7c2d12_100%)] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(251,191,36,0.18),transparent_22%),radial-gradient(circle_at_85%_10%,rgba(255,255,255,0.16),transparent_20%),radial-gradient(circle_at_70%_85%,rgba(249,115,22,0.2),transparent_22%)]" />
      <div className="absolute inset-y-0 right-0 w-1/2 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent)] [clip-path:polygon(20%_0,100%_0,100%_100%,0_100%)]" />
      <Container className="relative py-16 sm:py-20 lg:py-24">
        {breadcrumb}
        <div className="mt-6 max-w-3xl">
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl lg:leading-[1.05]">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/82 sm:text-lg">
            {description}
          </p>
        </div>
        {children ? <div className="mt-10">{children}</div> : null}
      </Container>
    </section>
  );
}
