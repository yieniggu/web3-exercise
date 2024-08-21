const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const { ethers } = require("hardhat");
require("dotenv").config();

const { DEV_ADDRESS, BUYER_ADDRESS, SELLER_ADDRESS } = process.env;

module.exports = buildModule("TokenDeploy", (module) => {
  // deploy the USDX contract
  const usdx = module.contract("USDX", [DEV_ADDRESS]);

  // deploy the MyStock contract
  const mystock = module.contract("MyStock", [DEV_ADDRESS, SELLER_ADDRESS]);

  // transfer usdx to buyer account
  const USDXamount = ethers.parseEther("1000");
  module.call(usdx, "transfer", [BUYER_ADDRESS, USDXamount])

  return { usdx, mystock };
});
