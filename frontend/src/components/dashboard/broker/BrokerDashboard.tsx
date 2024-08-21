import { useAccount } from "wagmi";
import { WalletOptions } from "../../wallet/WalletOptions";
import { NotAllowed } from "../NotAllowed";
import { Balances } from "../Balances";
import { BrokerOffers } from "./BrokerOffers";

const BROKER_ADDRESS = "0xE9f5c03E4F289177A623E320d48Fbcf50498bF2C";

export const BrokerDashboard = () => {
  const { isConnected, address } = useAccount();

  if (!isConnected) return <WalletOptions />;

  return (
    <div>
      {isConnected && address === BROKER_ADDRESS ? (
        <div className="flex flex-col">
          <Balances user={"Broker"} />
          <BrokerOffers />
        </div>
      ) : (
        <NotAllowed />
      )}
    </div>
  );
};
