import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/types/catalog";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      className="group overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-float"
      href={`/tin-tuc/${post.slug}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          alt={post.title}
          className="object-cover transition duration-500 group-hover:scale-105"
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          src={post.image}
        />
      </div>
      <div className="p-6">
        <p className="text-sm text-slate-500">
          {post.publishedAt} • {post.readingTime}
        </p>
        <h3 className="mt-3 text-xl font-bold text-slate-900">{post.title}</h3>
        <p className="mt-3 text-sm leading-7 text-slate-600">{post.excerpt}</p>
      </div>
    </Link>
  );
}
