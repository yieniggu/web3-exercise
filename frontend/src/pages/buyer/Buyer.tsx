import { useState } from "react";
import { SignIn } from "../../components/login/SignIn";
import { BuyerDashboard } from "../../components/dashboard/buyer/BuyerDashboard";

export const Buyer = () => {
  const [loginStatus, setLoginStatus] = useState(false);

  return (
    <div className="flex flex-col w-full h-full p-4 gap-6">
      {loginStatus ? (
        <BuyerDashboard />
      ) : (
        <SignIn user={"buyer"} setLoginStatus={setLoginStatus} />
      )}
    </div>
  );
};
