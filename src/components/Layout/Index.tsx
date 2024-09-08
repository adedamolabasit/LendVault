import React, { ReactNode } from "react";
import { Header } from "./Header";

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      {/* Header is no longer fixed, and part of the flow */}
      <Header />
      {/* The content fills the remaining space */}
      <div className="flex-1 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};
