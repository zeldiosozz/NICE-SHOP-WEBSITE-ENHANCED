/*
  Warnings:

  - Added the required column `hash_session` to the `admin_logins` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "admin_logins" ADD COLUMN     "hash_session" TEXT NOT NULL;
