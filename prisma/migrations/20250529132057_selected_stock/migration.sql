/*
  Warnings:

  - You are about to drop the column `userId` on the `stocks` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "stocks" DROP CONSTRAINT "stocks_userId_fkey";

-- AlterTable
ALTER TABLE "stocks" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "selected_stocks" (
    "userId" TEXT NOT NULL,
    "stockId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "selected_stocks_userId_stockId_key" ON "selected_stocks"("userId", "stockId");

-- AddForeignKey
ALTER TABLE "selected_stocks" ADD CONSTRAINT "selected_stocks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "selected_stocks" ADD CONSTRAINT "selected_stocks_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "stocks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
