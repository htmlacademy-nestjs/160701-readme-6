/*
  Warnings:

  - You are about to drop the column `title` on the `posts` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "posts_title_idx";

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "title";
