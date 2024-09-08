import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FuelProvider } from "@fuels/react";
import { defaultConnectors } from "@fuels/connectors";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <FuelProvider
        fuelConfig={{ connectors: defaultConnectors({ devMode: true }) }}
      >
        <App />
      </FuelProvider>
    </QueryClientProvider>
  </StrictMode>
);
