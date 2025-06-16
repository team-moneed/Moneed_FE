-- CreateTable
CREATE TABLE "Post" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "author_id" BIGINT,
    "title" TEXT,
    "content" TEXT,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "views" BIGINT DEFAULT 0,
    "likes" BIGINT DEFAULT 0,
    "stock_type" TEXT,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);
