import { FC, ReactNode } from "react";
import { Header } from "./Header";
import { Board } from "../../components/Board";

interface LayoutProps {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative flex flex-col h-screen w-screen overflow-hidden">

      <Header />
      <div className="flex-1 flex items-center justify-center">{children}</div>
    </div>
  );
};
