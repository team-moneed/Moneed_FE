/*
  Warnings:

  - Made the column `accessToken` on table `oauth_accounts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `refreshToken` on table `oauth_accounts` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "oauth_accounts" ALTER COLUMN "accessToken" SET NOT NULL,
ALTER COLUMN "refreshToken" SET NOT NULL;
