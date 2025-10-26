-- CreateTable
CREATE TABLE "admin_logins" (
    "id" BIGSERIAL NOT NULL,
    "admin_id" BIGINT NOT NULL,
    "admin_user_name" TEXT NOT NULL,
    "time" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admin_logins_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "admin_logins_admin_id_idx" ON "admin_logins"("admin_id");

-- AddForeignKey
ALTER TABLE "admin_logins" ADD CONSTRAINT "admin_logins_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
