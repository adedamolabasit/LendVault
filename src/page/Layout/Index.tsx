import { FC, ReactNode } from "react";
import { Header } from "./Header";

interface LayoutProps {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      <Header />
      <div className="flex-1 flex items-center justify-center">{children}</div>
    </div>
  );
};
