import { Metadata } from "next";
import { BlogCard } from "@/components/cards/blog-card";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Hero } from "@/components/layout/hero";
import { Container } from "@/components/ui/container";
import { blogPosts } from "@/data/blog-posts";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Tin tức thiết bị điện và đèn LED",
  description: "Chuyên mục tin tức hỗ trợ SEO, chia sẻ kiến thức chiếu sáng, thiết bị điện và tối ưu vận hành công trình.",
  alternates: { canonical: absoluteUrl("/tin-tuc") }
};

export default function NewsPage() {
  return (
    <>
      <Hero
        breadcrumb={<Breadcrumb items={[{ label: "Trang chủ", href: "/" }, { label: "Tin tức" }]} />}
        description="Nội dung chuyên môn giúp doanh nghiệp tăng độ tin cậy, kéo traffic SEO và hỗ trợ khách hàng ra quyết định nhanh hơn."
        title="Tin tức và kiến thức ngành điện"
      />

      <Container className="py-16">
        <div className="grid gap-6 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </Container>
    </>
  );
}
