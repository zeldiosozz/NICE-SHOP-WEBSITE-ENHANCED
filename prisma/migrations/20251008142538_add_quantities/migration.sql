-- AlterTable
ALTER TABLE "products" ADD COLUMN     "quantity_per_box" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "quantity_per_package" INTEGER NOT NULL DEFAULT 12;
