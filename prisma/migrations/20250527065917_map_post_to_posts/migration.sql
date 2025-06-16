/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "posts" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "author_id" BIGINT,
    "title" TEXT,
    "content" TEXT,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "views" BIGINT DEFAULT 0,
    "likes" BIGINT DEFAULT 0,
    "stock_type" TEXT,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);
