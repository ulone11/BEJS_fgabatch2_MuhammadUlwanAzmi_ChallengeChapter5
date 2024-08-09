const prisma = require("../config/prisma");

const getAllAccounts = async (req, res) => {
  try {
    const accounts = await prisma.bank_accounts.findMany();
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAccountById = async (req, res) => {
  try {
    const { id } = req.params;
    const account = await prisma.bank_accounts.findUnique({
      where: {
        id: id,
      },
    });
    if (!account) {
      return res.status(400).json({ error: "Account id not found" });
    }
    res.json(account);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAccByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await prisma.users.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(400).json({ error: "User Id not found" });
    }

    const accounts = await prisma.bank_accounts.findMany({
      where: {
        userId: userId,
      },
    });

    if (accounts.length === 0) {
      return res.status(204).json({ message: "User have no account" });
    }

    res.status(200).json({ status: "success", data: accounts });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createAccount = async (req, res) => {
  try {
    const { account_name, balance, userId } = req.body;
    console.log("Request Body:", req.body);

    // Validasi input
    if (!account_name || !balance || !userId) {
      return res.status(400).json({
        error: "Account Name, Account Number, Balance, and userId are required",
      });
    }

    const account = await prisma.bank_accounts.create({
      data: {
        account_name,
        balance,
        userId,
      },
    });
    res.status(201).json({ status: "success", data: account });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const { account_name, balance } = req.body;
    console.log(req.body);

    const existingAccount = await prisma.bank_accounts.findUnique({
      where: { id: id },
    });
    if (!existingAccount) {
      return res.status(400).json({ error: "Account not found" });
    }

    const updatedData = {
      account_name: account_name || existingAccount.account_name,
      balance: balance || existingAccount.balance,
    };

    const updatedAccount = await prisma.bank_accounts.update({
      where: { id: id },
      data: updatedData,
    });
    res
      .status(200)
      .json({ status: "Resource updated successfully", data: updatedAccount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteAccount = await prisma.bank_accounts.delete({
      where: { id: id },
    });
    res.status(200).json({
      status: "Resource deleted successfully",
      deletedAccount: deleteAccount,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllAccounts,
  getAccountById,
  getAccByUserId,
  createAccount,
  updateAccount,
  deleteAccount,
};
