import { createBrowserRouter } from "react-router-dom";
import { Buyer } from "../pages/buyer/Buyer";
import { Seller } from "../pages/seller/Seller";
import { Broker } from "../pages/broker/Broker";

export const router = createBrowserRouter([
  { path: "/buyer", element: <Buyer /> },
  { path: "/seller", element: <Seller /> },
  { path: "/broker", element: <Broker /> },
]);
