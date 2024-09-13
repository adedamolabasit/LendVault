import { FC, ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export const DashWrapper: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <main>
        <div className="mx-auto max-w-3xl pt-8 pb-8 sm:pt-10">{children}</div>
      </main>
    </>
  );
};
