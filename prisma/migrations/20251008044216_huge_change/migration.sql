/*
  Warnings:

  - You are about to drop the column `product_id` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `code` on the `products` table. All the data in the column will be lost.
  - You are about to alter the column `image_url` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- DropForeignKey
ALTER TABLE "public"."orders" DROP CONSTRAINT "orders_product_id_fkey";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "product_id";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "code",
ALTER COLUMN "price_in_box" SET DATA TYPE DECIMAL,
ALTER COLUMN "price_in_package" SET DATA TYPE DECIMAL,
ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "image_url" SET DATA TYPE VARCHAR(255);

-- CreateTable
CREATE TABLE "order_items" (
    "id" BIGSERIAL NOT NULL,
    "order_id" BIGINT NOT NULL,
    "product_id" BIGINT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "order_items_order_id_product_id_key" ON "order_items"("order_id", "product_id");

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
