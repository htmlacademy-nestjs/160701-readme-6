-- CreateTable
CREATE TABLE "posts_video" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "postId" TEXT,

    CONSTRAINT "posts_video_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts_link" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT,
    "postId" TEXT,

    CONSTRAINT "posts_link_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts_quote" (
    "id" TEXT NOT NULL,
    "quote" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "postId" TEXT,

    CONSTRAINT "posts_quote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts_photo" (
    "id" TEXT NOT NULL,
    "image_id" TEXT NOT NULL,
    "postId" TEXT,

    CONSTRAINT "posts_photo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts_text" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "annotation" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "postId" TEXT,

    CONSTRAINT "posts_text_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "posts_video" ADD CONSTRAINT "posts_video_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts_link" ADD CONSTRAINT "posts_link_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts_quote" ADD CONSTRAINT "posts_quote_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts_photo" ADD CONSTRAINT "posts_photo_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts_text" ADD CONSTRAINT "posts_text_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
