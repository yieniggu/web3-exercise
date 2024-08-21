import axios from "axios";
import { useEffect, useState } from "react";
import { SellerOffer } from "./SellerOffer";

export const SellerOffers = () => {
  const [salesRequests, setSalesRequests] = useState([]);

  useEffect(() => {
    const getTransactions = async () => {
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "https://kima-test-backend-gejiebfvhq-uc.a.run.app/history/transactions",
      };

      const { data } = await axios.request(config);

      const { transactions } = data;
      setSalesRequests(transactions);
      // const salesTransactions = transactions.filter(
      //   ({ status }: any) => status === "awaitingSeller"
      // );

      // setSalesRequests(salesTransactions);
      console.log("salesrq: ", salesRequests);
    };

    getTransactions();

    setInterval(async () => {
      await getTransactions();
    }, 5000);
  }, []);

  return (
    <div className="flex flex-col mx-auto font-mono gap-4">
      <h1 className="text-3xl text-blue-700 text-center">Sales Requests</h1>
      {salesRequests.map(
        ({ _id, transactionHash, USDXAmount, MSTKAmount, status }) => (
          <SellerOffer
            key={_id}
            {...{ id: _id, transactionHash, USDXAmount, MSTKAmount, status }}
          />
        )
      )}
    </div>
  );
};
