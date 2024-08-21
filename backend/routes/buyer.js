const { Router } = require("express");
const { recordBuyTransaction } = require("../controllers/buy");
const { setCorsHeaders } = require("../middlewares/crossOrigin");

const router = new Router();

router.post("/buy", setCorsHeaders, recordBuyTransaction);

module.exports = router;
