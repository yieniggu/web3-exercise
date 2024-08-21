const { Router } = require("express");
const { setCorsHeaders } = require("../middlewares/crossOrigin");

const router = new Router();

router.get("/buy", setCorsHeaders, recordSaleTransaction);

module.exports = router;