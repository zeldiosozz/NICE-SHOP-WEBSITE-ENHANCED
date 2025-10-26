-- AlterTable
ALTER TABLE "admin_logins" ADD COLUMN     "is_hash_valid" BOOLEAN NOT NULL DEFAULT false;
