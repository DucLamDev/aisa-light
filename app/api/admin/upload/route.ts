import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { slugify } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Không có file" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const extension = path.extname(file.name) || ".jpg";
    const baseName = slugify(path.basename(file.name, extension));
    const fileName = `${baseName || "upload"}-${Date.now()}${extension}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadDir, { recursive: true });
    await fs.writeFile(path.join(uploadDir, fileName), buffer);

    return NextResponse.json({ path: `/uploads/${fileName}` });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload thất bại" },
      { status: 500 }
    );
  }
}
