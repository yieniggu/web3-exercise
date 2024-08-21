import { ethers } from "ethers";
import { useState } from "react";
import { useWriteContract } from "wagmi";
import { USDXAbi } from "../../../abis/USDX";
import { waitForTransactionReceipt } from "wagmi/actions";
import axios from "axios";
import { config } from "../../../../wagmi.config";
import { Spinner } from "../../loaders/Spinner";

const SEPOLIA_MYSTOCK_ADDRESS = "0x1d711b213c944901d1825aE634cE1B0F93215745";
const BROKER_ADDRESS = "0xE9f5c03E4F289177A623E320d48Fbcf50498bF2C";

export interface Offer {
  id: string;
  transactionHash: string;
  USDXAmount: Number;
  MSTKAmount: Number;
  status: string;
}

export const SellerOffer = ({ id, USDXAmount, MSTKAmount, status }: Offer) => {
  const [pendingTransaction, setPendingTransaction] = useState(false);

  const { writeContractAsync, status: writeStatus } = useWriteContract();

  const acceptOffer = async () => {
    const totalMSTK = ethers.parseEther(MSTKAmount.toString());

    const txHash = await writeContractAsync({
      abi: USDXAbi,
      address: SEPOLIA_MYSTOCK_ADDRESS,
      functionName: "transfer",
      args: [BROKER_ADDRESS, totalMSTK],
    });

    // await for transaction receipt
    setPendingTransaction(true);
    const { transactionHash } = await waitForTransactionReceipt(config, {
      hash: txHash,
    });
    console.log("has: ", transactionHash);

    const data = JSON.stringify({
      sellerTransactionHash: transactionHash,
      status: "accepted",
    });

    const reqConfig = {
      method: "put",
      maxBodyLength: Infinity,
      url: `https://kima-test-backend-gejiebfvhq-uc.a.run.app/history/transactions/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    // update data in backend
    const updateTxResult = await axios.request(reqConfig);

    console.log("updateTxResult: ", updateTxResult);
    setPendingTransaction(false);
  };

  return (
    <div className="flex flex-row font-mono h-[70px] w-[500px] p-2 bg-blue-700 text-white justify-between items-center">
      <h2>MSTK Requested: {MSTKAmount.toString()}</h2>
      <h2>USDX sent: {USDXAmount.toString()}</h2>

      {status === "awaitingSeller" && (
        <div className="flex flex-row justify-end gap-2">
          {writeStatus === "pending" || pendingTransaction ? (
            <Spinner />
          ) : (
            <div className="flex flex-row justify-end gap-2">
              <button className="bg-red-800 h-10 px-2">Reject</button>
              <button className="bg-green-800 h-10 px-2" onClick={acceptOffer}>
                Accept
              </button>
            </div>
          )}
        </div>
      )}

      {status === "accepted" && (
        <p className="text-green-400 text-end">Accepted</p>
      )}

      {status === "finalized" && (
        <p className="text-green-400 text-end">Finalized</p>
      )}
    </div>
  );
};
