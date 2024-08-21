import { useAccount } from "wagmi";
import { WalletOptions } from "../../wallet/WalletOptions";
import { NotAllowed } from "../NotAllowed";
import { Balances } from "../Balances";
import { Buy } from "./Buy";

const BUYER_ADDRESS = "0x9FbafbA6cCB785d363AD302c77c8678e0695997f";

export const BuyerDashboard = () => {
  const { isConnected, address } = useAccount();

  if (!isConnected) return <WalletOptions />;

  return (
    <div>
      {isConnected && address === BUYER_ADDRESS ? (
        <div className="flex flex-col gap-4">
          <Balances user={"Buyer"}/>
          <Buy />
        </div>
      ) : (
        <NotAllowed />
      )}
    </div>
  );
};
