import { useState } from "react";
import { SignIn } from "../../components/login/SignIn";
import { BrokerDashboard } from "../../components/dashboard/broker/BrokerDashboard";

export const Broker = () => {
  const [loginStatus, setLoginStatus] = useState(false);

  return (
    <div className="flex flex-col w-full h-full p-4 gap-6">
      {loginStatus ? (
        <BrokerDashboard />
      ) : (
        <SignIn user={"broker"} setLoginStatus={setLoginStatus} />
      )}
    </div>
  );
};
