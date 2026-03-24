"use client";

import { FormEvent, useState } from "react";

const categories = [
  { label: "Đèn LED", value: "led-chieu-sang" },
  { label: "Điện gia dụng", value: "dien-gia-dung" },
  { label: "Thiết bị điện", value: "thiet-bi-dien" },
  { label: "Thiết bị nước", value: "thiet-bi-nuoc" }
];

export function AdminForm() {
  const [status, setStatus] = useState("");
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState("");

  async function handleUpload(file: File) {
    const form = new FormData();
    form.append("file", file);
    setUploading(true);

    const response = await fetch("/api/admin/upload", {
      method: "POST",
      body: form
    });

    const data = await response.json();
    setUploading(false);
    if (!response.ok) {
      throw new Error(data.error || "Upload thất bại");
    }
    setImage(data.path);
    return data.path as string;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      setStatus("Đang lưu sản phẩm...");
      const file = formData.get("imageFile");
      let imagePath = image;

      if (file instanceof File && file.size > 0) {
        imagePath = await handleUpload(file);
      }

      const specs = [
        { label: "Mã sản phẩm", value: String(formData.get("modelCode") || "CMS") },
        { label: "Điện áp", value: String(formData.get("voltage") || "220V / 50Hz") },
        { label: "Bảo hành", value: String(formData.get("warranty") || "Liên hệ") }
      ];

      const payload = {
        categorySlug: String(formData.get("categorySlug")),
        subcategoryName: String(formData.get("subcategoryName")),
        name: String(formData.get("name")),
        description: String(formData.get("description")),
        application: String(formData.get("application")),
        wattage: String(formData.get("wattage")),
        image: imagePath,
        specs
      };

      const response = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Lưu thất bại");
      }

      setStatus("Đã thêm sản phẩm thành công. Tải lại trang danh mục để thấy dữ liệu mới.");
      form.reset();
      setImage("");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Có lỗi xảy ra");
    } finally {
      setUploading(false);
    }
  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 md:grid-cols-2">
        <select className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-400" name="categorySlug" required>
          {categories.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <input className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-400" name="subcategoryName" placeholder="Tên danh mục con" required />
      </div>
      <input className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-400" name="name" placeholder="Tên sản phẩm" required />
      <div className="grid gap-4 md:grid-cols-3">
        <input className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-400" name="modelCode" placeholder="Mã sản phẩm" />
        <input className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-400" name="wattage" placeholder="Công suất" />
        <input className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-400" name="voltage" placeholder="Điện áp" />
      </div>
      <input className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-400" name="warranty" placeholder="Bảo hành" />
      <textarea className="min-h-28 rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-400" name="description" placeholder="Mô tả chi tiết" required />
      <textarea className="min-h-24 rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-400" name="application" placeholder="Ứng dụng" required />
      <div className="rounded-3xl border border-dashed border-slate-300 p-4">
        <label className="block text-sm font-medium text-slate-700">Upload ảnh sản phẩm</label>
        <input className="mt-3 block w-full text-sm" name="imageFile" type="file" />
        {uploading ? <p className="mt-3 text-sm text-orange-500">Đang upload ảnh...</p> : null}
        {image ? <p className="mt-3 text-sm text-slate-500">Ảnh đã lưu: {image}</p> : null}
      </div>
      <button className="rounded-full bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600" type="submit">
        Lưu sản phẩm
      </button>
      {status ? <p className="text-sm text-slate-600">{status}</p> : null}
    </form>
  );
}
