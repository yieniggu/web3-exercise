const axios = require("axios");

const { ETHERSCAN_KEY } = process.env;

/* helper to fetch all tokens of a given type transferred to an address */
const getTokenTransfersTo = async (tokenAddress, userAddress) => {
  const { data } = await axios.get("https://api-sepolia.etherscan.io/api", {
    params: {
      module: "account",
      action: "tokentx",
      contractAddress: tokenAddress,
      address: userAddress,
      startblock: 0,
      endblock: 99999999,
      sort: "asc",
      apiKey: ETHERSCAN_KEY,
    },
  });

  const { result } = data;
  
  return result;
};

module.exports = {
  getTokenTransfersTo,
};
