/*
  Warnings:

  - A unique constraint covering the columns `[account_number]` on the table `bank_accounts` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "bank_accounts" ALTER COLUMN "balance" SET DATA TYPE BIGINT;

-- CreateIndex
CREATE UNIQUE INDEX "bank_accounts_account_number_key" ON "bank_accounts"("account_number");
