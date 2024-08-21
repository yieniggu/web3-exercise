const { Router } = require("express");
const {
  getTokenTransfers,
  getTransactions,
  updateTransaction,
} = require("../controllers/history");
const { setCorsHeaders } = require("../middlewares/crossOrigin");

const router = new Router();

router.use(setCorsHeaders);

router.get("/token-transfers", getTokenTransfers);
router.get("/transactions", getTransactions);

router.put("/transactions/:id", updateTransaction);

module.exports = router;
