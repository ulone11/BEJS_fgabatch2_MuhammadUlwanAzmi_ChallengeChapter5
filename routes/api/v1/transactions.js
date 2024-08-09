var express = require("express");
const TransactionController = require("../../../controllers/transactions.controller");
var router = express.Router();

router.post("/", TransactionController.createTransaction);
router.get("/:id", TransactionController.getTransactionById);
router.get("/", TransactionController.getAllTransactions);
router.get("/account/:accountId", TransactionController.getTransactionByAcc);

module.exports = router;
