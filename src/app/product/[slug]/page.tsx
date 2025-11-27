import { db } from "../../../../lib/db";
import Image from "next/image";
import type { ProductImages } from "@/types/product-images";

export async function generateMetadata({ params }: any) {
  const product = await db.products.findUnique({
    where: { slug: params.slug },
  });

  if (!product) {
    return { title: "المنتج غير موجود" };
  }

  return {
    title: product.title,
    description: product.title || "منتج من متجر نايس شوب",
    alternates: {
      canonical: `https://your-domain.com/product/${product.slug}`,
    },
  };
}

export default async function ProductPage({ params }: any) {
  const product = await db.products.findUnique({
    where: { slug: params.slug },
  });

  if (!product) {
    return <div>المنتج غير موجود</div>;
  }

  // 🟢 الحل هنا — تحويل الـ imags لـ نوع ProductImages
  const images = product.imags as unknown as ProductImages;

  return (
    <div className="container">
      <h1>{product.title}</h1>

      <Image
        src={
          Array.isArray(images.previews) && images.previews.length > 0
            ? images.previews[0]
            : "/images/placeholder.png"
        }
        alt={product.title}
        width={500}
        height={500}
        className="product-image"
      />
    </div>
  );
}
