/*
  Warnings:

  - You are about to drop the column `userId` on the `Topic` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Topic" DROP CONSTRAINT "Topic_userId_fkey";

-- AlterTable
ALTER TABLE "Topic" DROP COLUMN "userId";
