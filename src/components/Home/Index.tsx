import lvBG from "../../Assets/Home/LV-BG.png";
import { Layout } from "../Layout/Index";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <main className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <div className="w-full max-w-7xl text-center lg:text-left">
          <div className="px-6 sm:px-8 lg:w-1/2 xl:pr-16">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
              <span className="block xl:inline">
                Borrow, Earn and Exchange Tokens with Ease!
              </span>{" "}
            </h1>
            <p className="mx-auto mt-3 max-w-md text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
              LendVault (LV) is a Web3 platform where users can borrow $LV, earn
              rewards, and exchange tokens seamlessly.
            </p>
            <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
              <div className="rounded-md shadow">
                <button onClick={() => navigate('/information')} className="flex w-full items-center justify-center rounded-md border border-transparent bg-cyan-700 px-8 py-3 text-base font-medium text-white hover:bg-cyan-800 md:px-10 md:py-4 md:text-lg">
                  Get started
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="relative z-5 h-full w-full lg:absolute lg:right-0 lg:h-full lg:w-1/2">
          <img
            alt="bg"
            src={lvBG}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute bottom-4 right-12">
            <div className="text-white text-3xl font-bold tracking-tight">
              Welcome to LendVault
            </div>
            <p className="text-white opacity-60 font-medium text-lg">
              Your web3 Lending Protocol
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
};
