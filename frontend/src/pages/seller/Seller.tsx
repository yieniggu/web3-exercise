import { useState } from "react";
import { SignIn } from "../../components/login/SignIn";
import { SellerDashboard } from "../../components/dashboard/seller/SellerDashboard";

export const Seller = () => {
  const [loginStatus, setLoginStatus] = useState(false);

  return (
    <div className="flex flex-col w-full h-full p-4 gap-6">
      {loginStatus ? (
        <SellerDashboard />
      ) : (
        <SignIn user={"seller"} setLoginStatus={setLoginStatus} />
      )}
    </div>
  );
};
