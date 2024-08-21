import { useEffect } from "react";
import { useAccount, useBalance, useDisconnect } from "wagmi";
import { Spinner } from "../loaders/Spinner";

const SEPOLIA_USDX_ADDRESS = "0xD44fE725B0f3467cb5F3fAcbd68C05F8e6Cad4d7";
const SEPOLIA_MSTK_ADDRESS = "0x1d711b213c944901d1825aE634cE1B0F93215745";

export const Balances = ({ user }: { user: string }) => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  const {
    data: USDXData,
    isFetching: isFetchingUSDX,
    isFetched: isFetchedUSDX,
    refetch: refetchUSDX,
  } = useBalance({
    address,
    token: SEPOLIA_USDX_ADDRESS,
    unit: "ether",
  });

  const {
    data: MSTKData,
    isFetching: isFetchingMSTK,
    isFetched: isFetchedMSTK,
    refetch: refetchMSTK,
  } = useBalance({
    address,
    token: SEPOLIA_MSTK_ADDRESS,
    unit: "ether",
  });

  useEffect(() => {
    setInterval(() => {
      refetchUSDX();
      refetchMSTK();
    }, 7000);

    // return clearInterval(balanceFetching);
  }, []);

  return (
    <div className="flex flex-col w-[600px] gap-4 mx-auto bg-blue-700 text-white font-mono p-4">
      <h1>
        {user} address: {address}
      </h1>

      <div className="flex flex-row justify-around">
        <h2>
          USDX Balance
          {isFetchingUSDX ? (
            <Spinner />
          ) : (
            isFetchedUSDX && (
              <p>
                {USDXData?.formatted} {USDXData?.symbol}
              </p>
            )
          )}
        </h2>
        <h2>
          MSTK Balance
          {isFetchingMSTK ? (
            <Spinner />
          ) : (
            isFetchedMSTK && (
              <p>
                {MSTKData?.formatted} {MSTKData?.symbol}
              </p>
            )
          )}
        </h2>
      </div>

      <button
        className="bg-red-900 px-2 py-1 justify-end hover:bg-red-700 duration-200"
        onClick={() => disconnect()}
      >
        Disconnect
      </button>
    </div>
  );
};
