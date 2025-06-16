-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "kakaoId" BIGINT NOT NULL,
    "nickname" TEXT NOT NULL,
    "profileImage" TEXT NOT NULL,
    "thumbnailImage" TEXT NOT NULL,
    "ageRange" TEXT,
    "gender" TEXT,
    "connectedAt" TIMESTAMP(3) NOT NULL,
    "synchedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_kakaoId_key" ON "users"("kakaoId");
