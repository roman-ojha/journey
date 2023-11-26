/*
  Warnings:

  - You are about to drop the column `photo_url` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "photo_url",
ADD COLUMN     "picture" TEXT;
