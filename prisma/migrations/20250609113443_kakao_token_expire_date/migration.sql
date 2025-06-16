/*
  Warnings:

  - Added the required column `accessTokenExpiresIn` to the `oauth_accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refreshTokenExpiresIn` to the `oauth_accounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "oauth_accounts" ADD COLUMN     "accessTokenExpiresIn" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "refreshTokenExpiresIn" TIMESTAMP(3) NOT NULL;
