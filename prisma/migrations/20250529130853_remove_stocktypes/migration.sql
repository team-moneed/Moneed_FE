/*
  Warnings:

  - You are about to drop the column `stockTypeId` on the `stocks` table. All the data in the column will be lost.
  - You are about to drop the `StockType` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `stocks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "stocks" DROP CONSTRAINT "stocks_stockTypeId_fkey";

-- AlterTable
ALTER TABLE "stocks" DROP COLUMN "stockTypeId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "lastLoginAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "StockType";

-- AddForeignKey
ALTER TABLE "stocks" ADD CONSTRAINT "stocks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
