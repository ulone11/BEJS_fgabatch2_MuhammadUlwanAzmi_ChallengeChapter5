/*
  Warnings:

  - A unique constraint covering the columns `[source_account_id]` on the table `transactions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[destination_account_id]` on the table `transactions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "transactions_source_account_id_key" ON "transactions"("source_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "transactions_destination_account_id_key" ON "transactions"("destination_account_id");
