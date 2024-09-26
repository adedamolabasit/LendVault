import { BorrowIcon } from "../../assets/Dashboard/BorrowIcon";
import { ExchangeIcon } from "../../assets/Dashboard/ExchangeIcon";
import { SecurityToken } from "../../assets/Dashboard/SecurityToken";
import { EarnIcon } from "../../assets/Dashboard/EarnIcon";
import { Layout } from "../Layout/Index";
import Vault from "./Vault";
import { Borrow } from "./Borrow";
import { Board } from "../../components/Board";
import { Earn } from "./Earn";
import { RepayLoan } from "./RepayLoan";
import { useWalletContext } from "../../providers/fuel.provider";

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
      icon: <ExchangeIcon />,
      component: loanInfo?.has_loan ? <RepayLoan /> : <Borrow />,
      key: "swap",
    },
    {
      title: "Earn",
      description: "Earn Interest on Loan",
      icon: <SecurityToken />,
      component: <Earn />,
      key: "secure",
    },
    {
      title: "Exchange",
      description: "Exchange Token",
      icon: <EarnIcon />,
      component: <RepayLoan />,
      key: "hunt",
    },
  ];

  const handleButtonClick = (key: string) => {
    setActiveButton(key);
  };

  return (
    <Layout>
      <div className="relative flex w-full h-full justify-between items-center">
        <div className="w-1/2 h-full bg-gray-400/5 flex justify-center items-center px-12">
          {buttons.find((button) => button.key === activeButton)?.component}
        </div>

        <div className="relative w-1/2 h-1/2 flex flex-wrap justify-center items-center gap-6 relative">
          <div className="fixed w-full top-6 ">
            <div className="">
              <div className="w-full flex justify-center pt-6">
                <Board />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {buttons.map((button) => (
              <button
                key={button.key}
                onClick={() => handleButtonClick(button.key)}
                className={`flex flex-col justify-center items-center gap-6 h-40 w-60 mt-6 drop-shadow-lg rounded-lg cursor-pointer 
        ${activeButton === button.key ? "bg-cyan-800" : "bg-gray-400/5"} 
        group hover:border-cyan-800 `}
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
        </div>
      </div>
    </Layout>
  );
};
