import { useAccount } from "wagmi";
import { WalletOptions } from "../../wallet/WalletOptions";
import { NotAllowed } from "../NotAllowed";
import { Balances } from "../Balances";
import { SellerOffers } from "./SellerOffers";

const SELLER_ADDRESS = "0x012eAa3A54b2fee6302A6Da41c316C76c93b18F3";

export const SellerDashboard = () => {
  const { isConnected, address } = useAccount();

  if (!isConnected) return <WalletOptions />;

  return (
    <div>
      {isConnected && address === SELLER_ADDRESS ? (
        <div className="flex flex-col gap-6">
          <Balances user={"Seller"} />
          <SellerOffers />
        </div>
      ) : (
        <NotAllowed />
      )}
    </div>
  );
};
