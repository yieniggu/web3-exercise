import { useState } from "react";
import { useWriteContract } from "wagmi";
import { USDXAbi } from "../../../abis/USDX";
import { ethers } from "ethers";
import { Spinner } from "../../loaders/Spinner";
import { waitForTransactionReceipt } from "wagmi/actions";
import { config } from "../../../../wagmi.config";
import axios from "axios";

const BROKER_ADDRESS = "0xE9f5c03E4F289177A623E320d48Fbcf50498bF2C";
const SEPOLIA_USDX_ADDRESS = "0xD44fE725B0f3467cb5F3fAcbd68C05F8e6Cad4d7";

export const Buy = () => {
  const [USDX, setUSDX] = useState(10);

  const [pendingTransaction, setPendingTransaction] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUSDX(parseInt(e.target.value));
  };

  const { writeContractAsync, status } = useWriteContract();

  const buyMSTK = async () => {
    const USDXamount = ethers.parseEther(USDX.toString());

    const txHash = await writeContractAsync({
      abi: USDXAbi,
      address: SEPOLIA_USDX_ADDRESS,
      functionName: "transfer",
      args: [BROKER_ADDRESS, USDXamount],
    });

    // await for transaction receipt
    setPendingTransaction(true);
    const { transactionHash } = await waitForTransactionReceipt(config, {
      hash: txHash,
    });
    console.log("has: ", transactionHash);

    // store data in backend
    const recordTxResult = await axios.post(
      "http://kima-test-backend-gejiebfvhq-uc.a.run.app/buyer/buy",
      {
        transactionHash: transactionHash,
        USDXAmount: USDX,
        MSTKAmount: USDX / 10,
        status: "awaitingSeller",
      },
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );

    console.log("recordTxResult: ", recordTxResult);
    setPendingTransaction(false);
  };

  return (
    <div className="flex flex-col w-[800px] mx-auto bg-blue-700 font-mono text-white gap-3 p-2">
      <h1 className="text-center text-2xl">Buy MSTK</h1>

      <h3 className="text-center">
        Here you cand submit a new broker request to buy MSTK tokens
      </h3>

      <h4>
        Each MSTK has a price of 10 USDX. You can submit a new transaction by
        sending the respective amount to the broker
      </h4>

      <div className="flex flex-row mx-auto gap-4">
        <div className="flex flex-row gap-2">
          <label>USDX</label>
          <input
            name="USDX"
            onChange={handleInputChange}
            value={USDX}
            className="w-28 px-2 py-0 text-blue-700"
            type="number"
            min={10}
            step={10}
          />
        </div>

        <h2>= {USDX ? USDX / 10 : 0} MSTK</h2>
      </div>

      <button
        className="bg-white text-blue-700 hover:bg-blue-400 duration-200 w-1/2 mx-auto mt-10"
        disabled={status === "pending"}
        onClick={buyMSTK}
      >
        {status == "pending" || pendingTransaction ? (
          <Spinner />
        ) : (
          "Submit transaction"
        )}
      </button>
    </div>
  );
};
