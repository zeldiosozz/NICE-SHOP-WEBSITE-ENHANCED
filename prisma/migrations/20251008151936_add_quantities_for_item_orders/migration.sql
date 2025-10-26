/*
  Warnings:

  - You are about to drop the column `quantity` on the `order_items` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "order_items" DROP COLUMN "quantity",
ADD COLUMN     "quantity_of_box" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "quantity_of_packages" INTEGER NOT NULL DEFAULT 0;
