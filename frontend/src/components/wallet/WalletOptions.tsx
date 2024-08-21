import * as React from "react";
import { Connector, useConnect } from "wagmi";

export const WalletOptions = () => {
  const { connectors, connect } = useConnect();

  return (
    <div className="flex flex-col gap-3 mx-auto w-[400px]">
      <h1 className="text-xl text-center text-blue-600">
        Connect your wallet to get insights of your transactions
      </h1>

      {connectors.map((connector) => (
        <WalletOption
          key={connector.uid}
          connector={connector}
          onClick={() => connect({ connector })}
        />
      ))}
    </div>
  );
};

const WalletOption = ({
  connector,
  onClick,
}: {
  connector: Connector;
  onClick: () => void;
}) => {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector]);

  return (
    <button
      className="bg-blue-600 px-2 py-1 text-white font-mono"
      disabled={!ready}
      onClick={onClick}
    >
      {connector.name}
    </button>
  );
};
