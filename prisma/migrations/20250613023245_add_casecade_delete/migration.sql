-- DropForeignKey
ALTER TABLE "selected_stocks" DROP CONSTRAINT "selected_stocks_userId_fkey";

-- AddForeignKey
ALTER TABLE "selected_stocks" ADD CONSTRAINT "selected_stocks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
