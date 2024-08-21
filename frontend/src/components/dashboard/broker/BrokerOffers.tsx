import axios from "axios";
import { useEffect, useState } from "react";
import { BrokerOffer } from "./BrokerOffer";

export const BrokerOffers = () => {
  const [brokerRequests, setBrokerRequests] = useState([]);

  useEffect(() => {
    const getTransactions = async () => {
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "https://kima-test-backend-gejiebfvhq-uc.a.run.app/history/transactions",
      };

      const { data } = await axios.request(config);

      const { transactions } = data;
      setBrokerRequests(transactions);
      console.log("broker requests: ", brokerRequests);
    };

    getTransactions();

    setInterval(async () => {
      await getTransactions();
    }, 5000);
  }, []);

  return (
    <div className="flex flex-col mx-auto font-mono gap-4">
      <h1 className="text-3xl text-blue-700 text-center mt-20">
        Broker Requests
      </h1>
      {brokerRequests.map(
        ({
          _id,
          transactionHash,
          sellerTransactionHash,
          USDXAmount,
          MSTKAmount,
          status,
        }) => (
          <BrokerOffer
            key={_id}
            {...{
              id: _id,
              transactionHash,
              sellerTransactionHash,
              USDXAmount,
              MSTKAmount,
              status,
            }}
          />
        )
      )}
    </div>
  );
};
