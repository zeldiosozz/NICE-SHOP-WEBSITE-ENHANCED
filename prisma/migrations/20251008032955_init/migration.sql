-- CreateTable
CREATE TABLE "products" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "code" BIGINT NOT NULL DEFAULT 0,
    "price_in_box" DECIMAL(10,2) NOT NULL,
    "price_in_package" DECIMAL(10,2) NOT NULL,
    "in_stock" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "image_url" VARCHAR(255),

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);
