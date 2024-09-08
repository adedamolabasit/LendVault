// import { createContext, useContext, useState, ReactNode } from "react";
// import { Fuel } from '@fuel-wallet/sdk';

// interface WalletContextType {
//   user: string;
//   token: string;
//   login: (username: string, token: string) => void;
//   logout: () => void;
// }

// const WalletContext = createContext<WalletContextType>({
//   user: "",
//   token: "",
//   login: () => {},
//   logout: () => {},
// });

// interface WalletProviderProps {
//   children: ReactNode;
// }

// export const WalletProvider = ({ children }: WalletProviderProps) => {
//   const checkWalletAvailability = async () => {
//     const hasConnector = await fuel.hasConnector();
//     console.log("hasConnector", hasConnector);
//   };

//   return (
//     <WalletContext.Provider value={{ user, token, login, logout }}>
//       {children}
//     </WalletContext.Provider>
//   );
// };

// // Custom hook to use the context
// export const useWalletContext = () => {
//   const context = useContext(WalletContext);
//   if (!context) {
//     throw new Error("useWalletContext must be used within an WalletProvider");
//   }
//   return context;
// };
