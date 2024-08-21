const { Router } = require("express");
const { recordBuyTransaction } = require("../controllers/buy");

const router = new Router();

router.post("/buy", recordBuyTransaction);

module.exports = router;
