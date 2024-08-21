const { Schema, model } = require("mongoose");

const TransactionSchema = Schema(
  {
    transactionHash: {
      type: String,
      required: true,
    },
    USDXAmount: {
      type: Number,
      required: true,
    },
    MSTKAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
);

module.exports = model("Transaction", TransactionSchema);
