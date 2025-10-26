-- AlterTable
ALTER TABLE "order_items" ADD COLUMN     "total_item_price" DECIMAL;

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "total" DECIMAL;
