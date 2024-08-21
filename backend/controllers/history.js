const { response } = require("express");
const { getTokenTransfersTo } = require("../utils/etherscan");
const Transaction = require("../models/Transaction");

const {
  BUYER_ADDRESS,
  SELLER_ADDRESS,
  BROKER_ADDRESS,
  SEPOLIA_USDX_ADDRESS,
  SEPOLIA_MYSTOCK_ADDRESS,
} = process.env;

/* Returns the MyStock buying requests of a given address */
const getTokenTransfers = async (req, res = response) => {
  // Get the amount of corresponding tokens transferred to all addresses

  // the amount of mystock sent by the broker to the buyer
  const buyerMSTKResult = await getTokenTransfersTo(
    SEPOLIA_MYSTOCK_ADDRESS,
    BUYER_ADDRESS
  );

  // the amount of usdx sent by the broker to the seller
  const sellerUSDXResult = await getTokenTransfersTo(
    SEPOLIA_USDX_ADDRESS,
    SELLER_ADDRESS
  );

  // the amount of mystock sent by the seller to the broker
  const brokerMSTKResult = await getTokenTransfersTo(
    SEPOLIA_MYSTOCK_ADDRESS,
    BROKER_ADDRESS
  );

  // the amount of usdx sent by the buyer to the broker
  const brokerUSDXResult = await getTokenTransfersTo(
    SEPOLIA_USDX_ADDRESS,
    BROKER_ADDRESS
  );

  return res.status(200).json({
    ok: true,
    results: {
      buyerMSTKResult,
      sellerUSDXResult,
      brokerMSTKResult,
      brokerUSDXResult,
    },
  });
};

const getTransactions = async (req, res = response) => {
  const transactions = await Transaction.find({});

  return res.status(200).json({
    ok: true,
    transactions,
  });
};

const updateTransaction = async (req, res = response) => {
  const id = req.params.id;
  console.log("id", id);

  const { sellerTransactionHash, brokerTransactionHash, status } = req.body;

  let transaction = await Transaction.findById(id);

  console.log("transaction: ", transaction);

  finalHash =
    sellerTransactionHash && sellerTransactionHash != ""
      ? "*" + sellerTransactionHash
      : "";

  transaction.transactionHash += finalHash;
  transaction.status = status;

  const result = await transaction.save();

  console.log("result: ", result);

  return res.status(200).json({
    ok: true,
    result,
  });
};
module.exports = {
  getTokenTransfers,
  getTransactions,
  updateTransaction,
};
