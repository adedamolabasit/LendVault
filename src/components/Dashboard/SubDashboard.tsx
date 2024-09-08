import { BorrowIcon } from "../../assets/Dashboard/BorrowIcon";
import { ExchangeIcon } from "../../assets/Dashboard/ExchangeIcon";
import { SecurityToken } from "../../assets/Dashboard/SecurityToken";
import { EarnIcon } from "../../assets/Dashboard/EarnIcon";
import { Layout } from "../Layout/Index";
import { BackIcon } from "../../assets/Dashboard/BackIcon";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Index";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faPercent,
//   faGift,
//   faExchangeAlt,
//   faCrown,
// } from "@fortawesome/free-solid-svg-icons";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";

export const SubDashboard = () => {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: true,
//   };
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="relative flex w-full h-full justify-between items-center">
        <div className="w-1/2 h-1/2 flex flex-wrap justify-center items-center  gap-6">
          <div
            onClick={() => navigate("../")}
            className="absolute top-2 left-8 scale-150 px-8 py-8 cursor-pointer"
          >
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

        <div className="w-1/2 h-full bg-gray-400/5 flex justify-center items-center px-12">
        <Dashboard />
          {/* <div className="w-full h-screen bg-gray-100">
            <div className="max-w-7xl mx-auto h-full p-6">
              <Slider {...settings}>

                <div className="bg-gray-50 p-8 rounded-lg shadow-lg flex flex-col justify-center">
                  <h2 className="font-bold text-2xl text-cyan-700 mb-4">
                    Why Borrow LV Tokens?
                  </h2>
                  <ul className="list-disc list-inside space-y-6 text-base text-gray-800">
                    <li className="flex items-center space-x-4">
                      <FontAwesomeIcon
                        icon={faPercent}
                        className="text-cyan-600 text-2xl"
                      />
                      <span>LV tokens provide low-interest borrowing.</span>
                    </li>
                    <li className="flex items-center space-x-4">
                      <FontAwesomeIcon
                        icon={faGift}
                        className="text-cyan-600 text-2xl"
                      />
                      <span>Borrowing LV tokens gives access to rewards.</span>
                    </li>
                    <li className="flex items-center space-x-4">
                      <FontAwesomeIcon
                        icon={faExchangeAlt}
                        className="text-cyan-600 text-2xl"
                      />
                      <span>
                        LV tokens enable seamless exchanges with other tokens.
                      </span>
                    </li>
                    <li className="flex items-center space-x-4">
                      <FontAwesomeIcon
                        icon={faCrown}
                        className="text-cyan-600 text-2xl"
                      />
                      <span>
                        LV token holders enjoy exclusive platform benefits.
                      </span>
                    </li>
                  </ul>
                </div>

         
                <div className="bg-gray-50 p-8 rounded-lg shadow-lg flex flex-col justify-center">
                  <h2 className="font-bold text-2xl text-cyan-700 mb-4">
                    How It Works
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <FontAwesomeIcon
                        icon={faPercent}
                        className="text-cyan-600 text-2xl"
                      />
                      <p className="text-gray-800 text-base">
                        Step 1: Apply for borrowing LV tokens at competitive
                        rates.
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <FontAwesomeIcon
                        icon={faGift}
                        className="text-cyan-600 text-2xl"
                      />
                      <p className="text-gray-800 text-base">
                        Step 2: Receive LV tokens in your wallet and gain
                        rewards.
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <FontAwesomeIcon
                        icon={faExchangeAlt}
                        className="text-cyan-600 text-2xl"
                      />
                      <p className="text-gray-800 text-base">
                        Step 3: Exchange LV tokens with other crypto assets
                        seamlessly.
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <FontAwesomeIcon
                        icon={faCrown}
                        className="text-cyan-600 text-2xl"
                      />
                      <p className="text-gray-800 text-base">
                        Step 4: Enjoy the benefits of holding LV tokens.
                      </p>
                    </div>
                  </div>
                </div>
              </Slider>


              <div className="px-12 mt-8 p-8 rounded-lg shadow-lg">
                <button className="w-full bg-cyan-600 text-white py-3 rounded-lg text-lg font-semibold">
                  Borrow LV Tokens
                </button>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </Layout>
  );
};
