// import { selectTotalPrice } from "@/redux/features/cart-slice";
import { db } from "../../../../lib/db";
import { NextResponse } from "next/server";
// import { useSelector, UseSelector } from "react-redux";
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customer, items } = body;

    if (!customer?.name || !customer?.phone || !customer?.address) {
      return NextResponse.json(
        { error: "Missing customer data" },
        { status: 400 }
      );
    }

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty" },
        { status: 400 }
      );
    }

    // 🟢 إنشاء الأوردر في جدول orders
    const newOrder = await db.orders.create({
      data: {
        name: customer.name,
        phone: customer.phone,
        address: customer.address,
        confirmed: false,
      },
    });

    // 🧮 حساب التوتال بناءً على الصناديق والدستات
    let total:number = 0;

    const orderItemsData = await Promise.all(
      items.map(async (item: any) => {
        const product = await db.products.findUnique({
          where: { id: BigInt(item.id) },
        });

        if (!product) return null;

        const totalItemPrice:number = 
          (Number(item.quantity_of_boxs || 0) * Number(product.price_in_box)*product.quantity_per_box) +
          (Number(item.quantity_of_packages || 0) *
            Number(product.price_in_package)*product.quantity_per_package);

        total += totalItemPrice;

        return {
          order_id: newOrder.id,
          product_id: item.id,
          quantity_of_packages: item.quantity_of_packages || 0,
          quantity_of_boxs: item.quantity_of_boxs || 0,
          total_item_price:total
        };
      })
    );

    // 🟢 حفظ عناصر الأوردر
    const validItems = orderItemsData.filter(Boolean);
    await db.order_items.createMany({ data: validItems });

    // 🟢 رجع الرد النهائي
    return NextResponse.json({
      message: "Order created successfully",
      orderId: Number(newOrder.id),
      total,
    });
  } catch (err) {
    console.error("❌ Error creating order:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
