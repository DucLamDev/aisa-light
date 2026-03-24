import { ReactNode } from "react";
import { Container } from "@/components/ui/container";

export function PageHeader({
  breadcrumb,
  title,
  description
}: {
  breadcrumb?: ReactNode;
  title: string;
  description?: string;
}) {
  return (
    <section className="border-b border-orange-200 bg-gradient-to-r from-orange-50 via-white to-orange-50">
      <Container className="py-4 sm:py-5">
        {breadcrumb}
        <div className="mt-2">
          <h1 className="flex items-center gap-2 text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
            <span className="inline-block h-6 w-1 rounded-full bg-orange-500" />
            {title}
          </h1>
          {description ? (
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{description}</p>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
