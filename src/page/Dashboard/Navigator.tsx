import { BorrowIcon } from "../../assets/Dashboard/BorrowIcon";
import { ExchangeIcon } from "../../assets/Dashboard/ExchangeIcon";
import { EarnIcon } from "../../assets/Dashboard/EarnIcon";
import { Layout } from "../Layout/Index";
import Vault from "./Vault";
import { Borrow } from "./Borrow";
import { Earn } from "./Earn";
import { RepayLoan } from "./RepayLoan";
import { useWalletContext } from "../../providers/fuel.provider";
import { PoolBoard } from "../../components/PoolBoard";

export const Navigator = () => {
  const { loanInfo, setActiveButton, activeButton } = useWalletContext();

  const buttons = [
    {
      title: "Vault",
      description: "Vault Information",
      icon: <BorrowIcon />,
      component: <Vault />,
      key: "vault",
    },
    {
      title: loanInfo?.has_loan ? "Repay" : "Borrow",
      description: loanInfo?.has_loan
        ? "Return your loan"
        : "Borrow $LVT token",
      icon: loanInfo?.has_loan ? <ExchangeIcon /> : <BorrowIcon />,
      component: loanInfo?.has_loan ? <RepayLoan /> : <Borrow />,
      key: "swap",
    },
    {
      title: "Earn",
      description: "Earn Interest on Loan",
      icon: <EarnIcon />,
      component: <Earn />,
      key: "earn",
    },
    {
      title: "Exchange",
      description: "Exchange Token",
      icon: <EarnIcon />,
      component: <RepayLoan />, // Replace this with your actual Exchange component when available
      key: "exchange",
    },
  ];

  const handleButtonClick = (key: string) => {
    setActiveButton(key);
  };

  return (
    <Layout>
      <div className="relative flex w-full h-full justify-between">
        {/* Left Side: Content */}
        <div className="w-1/2 h-full bg-gray-400/5 flex justify-center items-start px-12 overflow-auto">
          {buttons.find((button) => button.key === activeButton)?.component}
        </div>

        <div className="w-1/2 h-full flex flex-col gap-6 justify-start items-center overflow-auto">
          <PoolBoard />
          <div className="grid grid-cols-2 gap-4 mt-6">
            {buttons.map((button) => (
              <button
                key={button.key}
                onClick={() => handleButtonClick(button.key)}
                className={`flex flex-col justify-center items-center gap-6 h-40 w-60 drop-shadow-lg rounded-lg cursor-pointer 
          ${activeButton === button.key ? "bg-cyan-800" : "bg-gray-400/5"} 
          group hover:border-cyan-800`}
              >
                {button.icon}
                <div className="flex flex-col gap-2">
                  <h5
                    className={`font-bold text-2xl ${
                      activeButton === button.key
                        ? "text-white"
                        : "text-black group-hover:text-black"
                    }`}
                  >
                    {button.title}
                  </h5>
                  <p
                    className={`opacity-60 ${
                      activeButton === button.key
                        ? "text-white"
                        : "text-black group-hover:text-black"
                    }`}
                  >
                    {button.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
          <div className="mt-4 text-cyan-800 font-bold">
            Powered By Fuel Network
          </div>
        </div>
      </div>
    </Layout>
  );
};
