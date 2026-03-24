import { NextResponse } from "next/server";
import { createCmsProduct } from "@/lib/cms";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name || !body.categorySlug || !body.subcategoryName || !body.image) {
      return NextResponse.json({ error: "Thiếu trường bắt buộc" }, { status: 400 });
    }

    const product = await createCmsProduct(body);
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Không thể lưu sản phẩm" },
      { status: 500 }
    );
  }
}
