import { FC, ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export const DashWrapper: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <main>
        <div className="mx-auto max-w-3xl pb-8">{children}</div>
      </main>
    </>
  );
};
