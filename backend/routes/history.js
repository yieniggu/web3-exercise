const { Router } = require("express");
const {
  getTokenTransfers,
  getTransactions,
  updateTransaction,
} = require("../controllers/history");

const router = new Router();

router.get("/token-transfers", getTokenTransfers);
router.get("/transactions", getTransactions);

router.put("/transactions/:id", updateTransaction);

module.exports = router;
