/*
  Warnings:

  - The primary key for the `stocks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `stocks` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `stockTypeId` to the `stocks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "stocks" DROP CONSTRAINT "stocks_pkey",
ADD COLUMN     "stockTypeId" INTEGER NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "stocks_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "StockType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "thumbnailImage" TEXT NOT NULL,

    CONSTRAINT "StockType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "stocks" ADD CONSTRAINT "stocks_stockTypeId_fkey" FOREIGN KEY ("stockTypeId") REFERENCES "StockType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
