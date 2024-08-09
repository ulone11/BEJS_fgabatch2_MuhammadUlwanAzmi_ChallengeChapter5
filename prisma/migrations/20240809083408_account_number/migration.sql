/*
  Warnings:

  - The `account_number` column on the `bank_accounts` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "bank_accounts" DROP COLUMN "account_number",
ADD COLUMN     "account_number" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "bank_accounts_account_number_key" ON "bank_accounts"("account_number");
