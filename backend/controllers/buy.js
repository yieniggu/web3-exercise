const { response } = require("express");
const Transaction = require("../models/Transaction");

const recordBuyTransaction = async (req, res = response) => {
  console.log("body: ", req.body);
  const { transactionHash, USDXAmount, MSTKAmount, status } = req.body;


  const transaction = new Transaction({
    transactionHash,
    USDXAmount,
    MSTKAmount,
    status,
  });

  const result = await transaction.save();

  return res.status(201).json({
    ok: true,
    result,
  });
};

module.exports = { recordBuyTransaction };