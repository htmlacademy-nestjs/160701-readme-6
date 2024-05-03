/*
  Warnings:

  - Made the column `postId` on table `posts_link` required. This step will fail if there are existing NULL values in that column.
  - Made the column `postId` on table `posts_photo` required. This step will fail if there are existing NULL values in that column.
  - Made the column `postId` on table `posts_quote` required. This step will fail if there are existing NULL values in that column.
  - Made the column `postId` on table `posts_text` required. This step will fail if there are existing NULL values in that column.
  - Made the column `postId` on table `posts_video` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "posts_link" DROP CONSTRAINT "posts_link_postId_fkey";

-- DropForeignKey
ALTER TABLE "posts_photo" DROP CONSTRAINT "posts_photo_postId_fkey";

-- DropForeignKey
ALTER TABLE "posts_quote" DROP CONSTRAINT "posts_quote_postId_fkey";

-- DropForeignKey
ALTER TABLE "posts_text" DROP CONSTRAINT "posts_text_postId_fkey";

-- DropForeignKey
ALTER TABLE "posts_video" DROP CONSTRAINT "posts_video_postId_fkey";

-- AlterTable
ALTER TABLE "posts_link" ALTER COLUMN "postId" SET NOT NULL;

-- AlterTable
ALTER TABLE "posts_photo" ALTER COLUMN "postId" SET NOT NULL;

-- AlterTable
ALTER TABLE "posts_quote" ALTER COLUMN "postId" SET NOT NULL;

-- AlterTable
ALTER TABLE "posts_text" ALTER COLUMN "postId" SET NOT NULL;

-- AlterTable
ALTER TABLE "posts_video" ALTER COLUMN "postId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "posts_video" ADD CONSTRAINT "posts_video_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts_link" ADD CONSTRAINT "posts_link_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts_quote" ADD CONSTRAINT "posts_quote_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts_photo" ADD CONSTRAINT "posts_photo_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts_text" ADD CONSTRAINT "posts_text_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
