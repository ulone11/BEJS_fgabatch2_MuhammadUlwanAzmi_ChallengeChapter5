const prisma = require("../config/prisma");

const createTransaction = async (req, res) => {
  try {
    const { amount, source_account_id, destination_account_id } = req.body;
    console.log(req.body);

    if (!amount || !source_account_id || !destination_account_id) {
      return res
        .status(400)
        .json({ error: "amount, source, and destination is required" });
    }

    const existingSourceAccount = await prisma.bank_accounts.findUnique({
      where: { id: source_account_id },
    });

    if (!existingSourceAccount) {
      return res.status(400).json({ error: "source account id not found" });
    }

    const existingDestinationAccount = await prisma.bank_accounts.findUnique({
      where: { id: destination_account_id },
    });

    if (!existingDestinationAccount) {
      return res
        .status(400)
        .json({ error: "destination account id not found" });
    }

    const transaction = await prisma.transactions.create({
      data: {
        amount,
        source_account_id,
        destination_account_id,
      },
    });
    res
      .status(201)
      .json({ status: "Transaction created Successfully", data: transaction });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;
    const detail = await prisma.transactions.findUnique({
      where: {
        id: id,
      },
    });
    res.json(detail);
  } catch (error) {
    res.status(400).json({ error: "transaction not found" });
  }
};

const getTransactionByAcc = async (req, res) => {
  try {
    const { accountId } = req.params;

    const transactions = await prisma.transactions.findMany({
      where: {
        OR: [
          { source_account_id: accountId },
          { destination_account_id: accountId },
        ],
      },
    });

    res.json({ status: "success", transactions });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllTransactions = async (req, res) => {
  try {
    const list = await prisma.transactions.findMany();
    res.status(200).json({ status: "success", data: list });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createTransaction,
  getTransactionById,
  getAllTransactions,
  getTransactionByAcc,
};
