import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { WagmiProvider } from "wagmi";
import { config } from "../wagmi.config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </WagmiProvider>
  );
};
