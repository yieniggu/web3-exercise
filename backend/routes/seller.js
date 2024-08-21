const { Router } = require("express");

const router = new Router();

router.get("/buy", recordSaleTransaction);

module.exports = router;