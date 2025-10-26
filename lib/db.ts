import { PrismaClient } from "./generated/prisma";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const db =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"], // دي اختيارية — بتطبع الاستعلامات في الكونسول عشان تتابع
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
