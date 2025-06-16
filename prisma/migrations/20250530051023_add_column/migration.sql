-- AlterTable
ALTER TABLE "selected_stocks" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "selected_stocks_pkey" PRIMARY KEY ("id");
