/*
  Warnings:

  - You are about to drop the column `postId` on the `posts_link` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `posts_photo` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `posts_quote` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `posts_text` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `posts_video` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[post_video_id]` on the table `posts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[post_link_id]` on the table `posts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[post_quote_id]` on the table `posts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[post_photo_id]` on the table `posts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[post_text_id]` on the table `posts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `post_id` to the `posts_link` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_id` to the `posts_photo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_id` to the `posts_quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_id` to the `posts_text` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_id` to the `posts_video` table without a default value. This is not possible if the table is not empty.

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
ALTER TABLE "posts" ADD COLUMN     "post_link_id" TEXT,
ADD COLUMN     "post_photo_id" TEXT,
ADD COLUMN     "post_quote_id" TEXT,
ADD COLUMN     "post_text_id" TEXT,
ADD COLUMN     "post_video_id" TEXT;

-- AlterTable
ALTER TABLE "posts_link" DROP COLUMN "postId",
ADD COLUMN     "post_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "posts_photo" DROP COLUMN "postId",
ADD COLUMN     "post_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "posts_quote" DROP COLUMN "postId",
ADD COLUMN     "post_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "posts_text" DROP COLUMN "postId",
ADD COLUMN     "post_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "posts_video" DROP COLUMN "postId",
ADD COLUMN     "post_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "posts_post_video_id_key" ON "posts"("post_video_id");

-- CreateIndex
CREATE UNIQUE INDEX "posts_post_link_id_key" ON "posts"("post_link_id");

-- CreateIndex
CREATE UNIQUE INDEX "posts_post_quote_id_key" ON "posts"("post_quote_id");

-- CreateIndex
CREATE UNIQUE INDEX "posts_post_photo_id_key" ON "posts"("post_photo_id");

-- CreateIndex
CREATE UNIQUE INDEX "posts_post_text_id_key" ON "posts"("post_text_id");

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_post_video_id_fkey" FOREIGN KEY ("post_video_id") REFERENCES "posts_video"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_post_link_id_fkey" FOREIGN KEY ("post_link_id") REFERENCES "posts_link"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_post_quote_id_fkey" FOREIGN KEY ("post_quote_id") REFERENCES "posts_quote"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_post_photo_id_fkey" FOREIGN KEY ("post_photo_id") REFERENCES "posts_photo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_post_text_id_fkey" FOREIGN KEY ("post_text_id") REFERENCES "posts_text"("id") ON DELETE SET NULL ON UPDATE CASCADE;
