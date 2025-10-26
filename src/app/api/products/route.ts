import { NextResponse } from "next/server";
import { db } from "../../../../lib/db";

// ✅ Get all products
export async function GET() {
  const products = await db.products.findMany({
    take: 100,
    select: {
      id: true,
      title: true,
      price_in_box: true,
      price_in_package: true,
      quantity_per_package:true,
      quantity_per_box:true,
      in_stock: true,
      imags: true,
      created_at: true,
      category:true,
      size:true,
    },
  });
const safeProducts = products.map(p => ({
    ...p,
    id: Number(p.id),
    
  }));

  return NextResponse.json(safeProducts);}
