import { useState } from "react";
import { BorrowIcon } from "../../assets/Dashboard/BorrowIcon";
import { ExchangeIcon } from "../../assets/Dashboard/ExchangeIcon";
import { SecurityToken } from "../../assets/Dashboard/SecurityToken";
import { EarnIcon } from "../../assets/Dashboard/EarnIcon";
import { Layout } from "../Layout/Index";
import { BackIcon } from "../../assets/Dashboard/BackIcon";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Index";
import { Borrow } from "./Borrow";
import { Board } from "../../components/Board";

export const SubDashboard = () => {
  const [activeButton, setActiveButton] = useState<string>("swap");

  const buttons = [
    {
      title: "Borrow",
      description: "Borrow LV token",
      icon: <BorrowIcon />,
      component: <Borrow />,
      key: "borrow",
    },
    {
      title: "Swap",
      description: "Swap Token",
      icon: <ExchangeIcon />,
      component: <Dashboard />,
      key: "swap",
    },
    {
      title: "Secure",
      description: "Secure Vault",
      icon: <SecurityToken />,
      component: <Dashboard />,
      key: "secure",
    },
    {
      title: "Hunt",
      description: "Hunt Vault",
      icon: <EarnIcon />,
      component: <Dashboard />,
      key: "hunt",
    },
  ];

  const handleButtonClick = (key: string) => {
    setActiveButton(key);
  };



  const navigate = useNavigate();
  return (
    <Layout>
      <div className="relative flex w-full h-full justify-between items-center">
        <div className="w-1/2 h-full bg-gray-400/5 flex justify-center items-center px-12">
          {buttons.find((button) => button.key === activeButton)?.component}
          <div
            onClick={() => navigate("../")}
            className="absolute top-2 left-8 scale-150 px-8 py-8 cursor-pointer"
          >
            <BackIcon />
          </div>
        </div>

        <div className="relative w-1/2 h-1/2 flex flex-wrap justify-center items-center gap-6 relative">
          <div className="fixed w-full top-6">
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
      className={`flex flex-col justify-center items-center gap-6 h-40 w-40 mt-6 drop-shadow-lg rounded-lg cursor-pointer 
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
