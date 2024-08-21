import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { USDXAbi } from "../../../abis/USDX";
import { waitForTransactionReceipt } from "wagmi/actions";
import axios from "axios";
import { config } from "../../../../wagmi.config";
import { Spinner } from "../../loaders/Spinner";
import { Offer } from "../seller/SellerOffer";
import { useWriteContract } from "wagmi";

const SEPOLIA_USDX_ADDRESS = "0xD44fE725B0f3467cb5F3fAcbd68C05F8e6Cad4d7";
const SEPOLIA_MYSTOCK_ADDRESS = "0x1d711b213c944901d1825aE634cE1B0F93215745";
const BUYER_ADDRESS = "0x9FbafbA6cCB785d363AD302c77c8678e0695997f";
const SELLER_ADDRESS = "0x012eAa3A54b2fee6302A6Da41c316C76c93b18F3";

export const BrokerOffer = ({
  id,
  transactionHash = "",
  USDXAmount,
  MSTKAmount,
  status,
}: Offer) => {
  const [pendingTransaction, setPendingTransaction] = useState(false);
  const [transactionHashes, setTransactionHashes] = useState({
    buyerTransactionHash: "",
    sellerTransactionHash: "",
    brokerBuyerTransactionHash: "",
    brokerSellerTransactionHash: "",
  });

  const {
    buyerTransactionHash,
    sellerTransactionHash,
    brokerBuyerTransactionHash,
    brokerSellerTransactionHash,
  } = transactionHashes;

  const { writeContractAsync, status: writeStatus } = useWriteContract();

  useEffect(() => {
    const splittedHash = transactionHash.split("*");

    const buyerHash = splittedHash[0];
    const sellerHash = splittedHash.length > 1 ? splittedHash[1] : "";
    const brokerBuyerHash = splittedHash.length > 2 ? splittedHash[2] : "";
    const brokerSellerHash = splittedHash.length > 3 ? splittedHash[3] : "";

    setTransactionHashes({
      buyerTransactionHash: buyerHash,
      sellerTransactionHash: sellerHash,
      brokerBuyerTransactionHash: brokerBuyerHash,
      brokerSellerTransactionHash: brokerSellerHash,
    });
  }, []);

  const sendBuyerAssets = async () => {
    const totalMSTK = ethers.parseEther(MSTKAmount.toString());

    const txHash = await writeContractAsync({
      address: SEPOLIA_MYSTOCK_ADDRESS,
      abi: USDXAbi,
      functionName: "transfer",
      args: [BUYER_ADDRESS, totalMSTK],
    });

    // await for transaction receipt
    const { transactionHash } = await waitForTransactionReceipt(config, {
      hash: txHash,
    });
    console.log("hash: ", transactionHash);

    return transactionHash;
  };

  const sendSellerAssets = async () => {
    const totalUSDX = ethers.parseEther(USDXAmount.toString());

    const txHash = await writeContractAsync({
      address: SEPOLIA_USDX_ADDRESS,
      abi: USDXAbi,
      functionName: "transfer",
      args: [SELLER_ADDRESS, totalUSDX],
    });

    // await for transaction receipt
    const { transactionHash } = await waitForTransactionReceipt(config, {
      hash: txHash,
    });
    console.log("hash: ", transactionHash);

    return transactionHash;
  };

  const sendAssets = async () => {
    setPendingTransaction(true);

    try {
      const buyerHash = await sendBuyerAssets();
      const sellerHash = await sendSellerAssets();

      setTransactionHashes({
        ...transactionHashes,
        brokerBuyerTransactionHash: buyerHash,
        brokerSellerTransactionHash: sellerHash,
      });

      const data = JSON.stringify({
        sellerTransactionHash: buyerHash + "*" + sellerHash,
        status: "finalized",
      });

      const config = {
        method: "put",
        maxBodyLength: Infinity,
        url: `https://kima-test-backend-gejiebfvhq-uc.a.run.app/history/transactions/${id}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      // update data in backend
      await axios.request(config);
      setPendingTransaction(false);
    } catch {
      setPendingTransaction(false);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row font-mono w-[1200px] p-2 bg-blue-700 text-white justify-between items-center">
        <div className="flex flex-col gap-4">
          <h2>Buyer Address: {BUYER_ADDRESS}</h2>
          <h2 className="text-center">{USDXAmount.toString()} USDX Offered</h2>
          <h4 className="text-center">
            Buyer funds received?:{" "}
            {buyerTransactionHash !== "" ? (
              <a
                className="hover:text-blue-400"
                href={`https://sepolia.etherscan.io/tx/${buyerTransactionHash}`}
                target="_blank"
              >
                Yes
              </a>
            ) : (
              <p>No</p>
            )}
          </h4>
          <h4 className="text-center">
            Buyer exchange sent?:{" "}
            {brokerBuyerTransactionHash !== "" ? (
              <a
                className="hover:text-blue-400"
                href={`https://sepolia.etherscan.io/tx/${brokerBuyerTransactionHash}`}
                target="_blank"
              >
                Yes
              </a>
            ) : (
              <p>No</p>
            )}
          </h4>
        </div>

        <div className="flex flex-col gap-4">
          <h2>Seller Address: {SELLER_ADDRESS}</h2>
          <h2 className="text-center">
            {MSTKAmount.toString()} MSTK Requested
          </h2>
          <h4 className="text-center">
            Seller funds received?:{" "}
            {sellerTransactionHash !== "" ? (
              <a
                className="hover:text-blue-400"
                href={`https://sepolia.etherscan.io/tx/${sellerTransactionHash}`}
                target="_blank"
              >
                Yes
              </a>
            ) : (
              <p>No</p>
            )}
          </h4>
          <h4 className="text-center">
            Seller exchange sent?:{" "}
            {brokerSellerTransactionHash !== "" ? (
              <a
                className="hover:text-blue-400"
                href={`https://sepolia.etherscan.io/tx/${brokerSellerTransactionHash}`}
                target="_blank"
              >
                Yes
              </a>
            ) : (
              <p>No</p>
            )}
          </h4>
        </div>
      </div>

      {buyerTransactionHash && sellerTransactionHash && (
        <button
          className="mx-auto bg-green-700 px-4 py-1 text-white"
          disabled={
            status === "finalized" ||
            writeStatus === "pending" ||
            pendingTransaction
          }
          onClick={sendAssets}
        >
          {writeStatus === "pending" || pendingTransaction ? (
            <Spinner />
          ) : status === "finalized" ? (
            "Finalized"
          ) : (
            "Execute"
          )}
        </button>
      )}
    </div>
  );
};
