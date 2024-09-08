import { BorrowIcon } from "../../assets/Dashboard/BorrowIcon";
import { ExchangeIcon } from "../../assets/Dashboard/ExchangeIcon";
import { SecurityToken } from "../../assets/Dashboard/SecurityToken";
import { EarnIcon } from "../../assets/Dashboard/EarnIcon";
import { Layout } from "../Layout/Index";
import { BackIcon } from "../../assets/Dashboard/BackIcon";
import { useNavigate } from "react-router-dom";

export const SubDashboard = () => {
    const navigate = useNavigate()
  return (
    <Layout>
      <div className="relative flex w-full h-full justify-between items-center">
        <div className="w-1/2 h-1/2 flex flex-wrap justify-center items-center  gap-6">
          <div onClick={() => navigate("../")} className="absolute top-2 left-8 scale-150 px-8 py-8 cursor-pointer">
            <BackIcon />
          </div>
          <button className="flex flex-col justify-center items-center gap-4 bg-gray-400/5 h-48 w-60 drop-shadow-lg rounded-lg hover:bg-cyan-800 group">
            <BorrowIcon />
            <div className="flex flex-col gap-2">
              <h5 className="font-bold text-black text-2xl group-hover:text-white">
                Borrow
              </h5>
              <p className="text-black opacity-60 group-hover:text-white">
                Borrow LV token
              </p>
            </div>
          </button>
          <button className="flex flex-col justify-center items-center gap-4 bg-gray-400/5 h-48 w-60 drop-shadow-lg rounded-lg hover:bg-cyan-800 group">
            <ExchangeIcon />
            <div className="flex flex-col gap-2">
              <h5 className="font-bold text-black text-2xl group-hover:text-white">
                Swap
              </h5>
              <p className="text-black opacity-60 group-hover:text-white">
                Swap Token
              </p>
            </div>
          </button>
          <button className="flex flex-col justify-center items-center gap-4 bg-gray-400/5 h-48 w-60 drop-shadow-lg rounded-lg hover:bg-cyan-800 group">
            <SecurityToken />
            <div className="flex flex-col gap-2">
              <h5 className="font-bold text-black text-2xl group-hover:text-white">
                Secure
              </h5>
              <p className="text-black opacity-60 group-hover:text-white">
                Secure Vault
              </p>
            </div>
          </button>
          <button className="flex flex-col justify-center items-center gap-4 bg-gray-400/5 h-48 w-60 drop-shadow-lg rounded-lg hover:bg-cyan-800 group">
            <EarnIcon />
            <div className="flex flex-col gap-2">
              <h5 className="font-bold text-black text-2xl group-hover:text-white">
                Hunt
              </h5>
              <p className="text-black opacity-60 group-hover:text-white">
                Hunt Vault
              </p>
            </div>
          </button>
        </div>

        <div className="w-1/2 h-full bg-gray-400/5">
          <div className="w-full h-full"> f</div>
        </div>
      </div>
    </Layout>
  );
};
