import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Hero } from "@/components/layout/hero";
import { Container } from "@/components/ui/container";
import { blogPosts } from "@/data/blog-posts";
import { absoluteUrl } from "@/lib/utils";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPosts.find((item) => item.slug === params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: absoluteUrl(`/tin-tuc/${post.slug}`) },
    openGraph: {
      title: post.title,
      description: post.description,
      images: [{ url: absoluteUrl(post.image), width: 1200, height: 630, alt: post.title }]
    }
  };
}

export default function NewsDetailPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((item) => item.slug === params.slug);
  if (!post) notFound();

  return (
    <>
      <Hero
        breadcrumb={
          <Breadcrumb
            items={[
              { label: "Trang chủ", href: "/" },
              { label: "Tin tức", href: "/tin-tuc" },
              { label: post.title }
            ]}
          />
        }
        description={post.description}
        title={post.title}
      />

      <Container className="py-16">
        <article className="mx-auto max-w-4xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft sm:p-10">
          <div className="relative aspect-[16/8] overflow-hidden rounded-[1.5rem]">
            <Image alt={post.title} className="object-cover" fill priority sizes="(max-width: 1280px) 100vw, 896px" src={post.image} />
          </div>
          <div className="mt-8 flex flex-wrap gap-4 text-sm text-slate-500">
            <span>{post.publishedAt}</span>
            <span>{post.readingTime}</span>
          </div>
          <div className="mt-8 space-y-5 text-base leading-8 text-slate-700">
            {post.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </article>
      </Container>
    </>
  );
}
