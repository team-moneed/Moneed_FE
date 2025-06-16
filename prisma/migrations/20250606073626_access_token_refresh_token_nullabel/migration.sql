-- AlterTable
ALTER TABLE "oauth_accounts" ALTER COLUMN "accessToken" DROP NOT NULL,
ALTER COLUMN "refreshToken" DROP NOT NULL;
