import { useState } from "react";
import { SavetyPool } from "../../assets/Earn/SafetyPool";
import { SafetyPool } from "./SavetyPool";

const steps = [
  { id: "01", name: "How You Earn", status: "complete" },
  { id: "02", name: "What To Do", status: "current" },
  { id: "03", name: "Earn", status: "upcoming" },
];

const safetyPool = [
  {
    name: "Safety Pool",
    description:
      "Deposit a certain amount into the safety pool, which is secured in the vault. A token representing shares in this pool is minted to the user. As loans are made, the interest earned is distributed among users based on the shares they hold. If the collateral asset drops below a threshold, the safety pool will save it by covering the shortfall. This mechanism ensures that holders of shares are informed of low-risk collateral and can withdraw their proportional funds from the vault when necessary.",
    icon: <SavetyPool className="text-white" />,
  },
  {
    name: "Depositing into the Safety Pool",
    description:
      "Users can deposit assets into the safety pool, which is secured in a vault. This is essentially a reserve designed to back the lending activities of the protocol.",
    icon: <SavetyPool className="text-white" />,
  },

  {
    name: "Minting Shares",
    description:
      "When users deposit, they receive tokens that represent their shares in the safety pool. The amount of shares minted is proportional to the deposit.",
    icon: <SavetyPool className="text-white" />,
  },
  {
    name: "Earnings from Loans",
    description:
      "As loans are issued through the platform, interest is generated. This interest is collected and then distributed back to the users of the safety pool based on the number of shares they hold.",
    icon: <SavetyPool className="text-white" />,
  },
  {
    name: "Collateral Management",
    description:
      "The safety pool acts as a buffer to protect against risks. If the value of the collateral falls below a predefined threshold, the safety pool can step in to cover the collateral, ensuring that the system remains solvent and users are protected.",
    icon: <SavetyPool className="text-white" />,
  },
  {
    name: "Low-Risk Collateral",
    description:
      "Users are informed that their deposits are in low-risk collateral, providing peace of mind regarding the stability of their investments.",
    icon: <SavetyPool className="text-white" />,
  },
  {
    name: "Withdrawals",
    description:
      "When users want to exit, they can withdraw their proportional share from the safety pool based on the amount of shares they own, ensuring they can realize their earnings from interest distributions.",
    icon: <SavetyPool className="text-white" />,
  },
];

const participationSteps = [
  {
    name: "Deposit Tokens",
    description:
      "To begin, users can deposit the desired amount of tokens into the safety pool. This is done by simply entering the amount in the designated input field on the platform.",
    icon: <SavetyPool className="text-white" />,
  },
  {
    name: "Token Minting",
    description:
      "Upon depositing, tokens will be minted for the user. These tokens represent their shares in the safety pool and are proportional to the amount deposited.",
    icon: <SavetyPool className="text-white" />,
  },
  {
    name: "Earn Passive Income",
    description:
      "Once the deposit is complete, users can relax knowing that they will start earning interest on a low-risk asset. The safety pool generates interest from loans issued on the platform, which is then distributed back to users based on the number of shares they hold.",
    icon: <SavetyPool className="text-white" />,
  },
  {
    name: "Interest Distribution",
    description:
      "As interest accumulates, it is automatically allocated to users according to their share of the safety pool. This means the more tokens a user deposits, the greater their share of the interest earned.",
    icon: <SavetyPool className="text-white" />,
  },
  {
    name: "Low-Risk Investment",
    description:
      "Participants can feel secure knowing that their investments are backed by low-risk collateral, providing peace of mind as they earn returns on their deposits.",
    icon: <SavetyPool className="text-white" />,
  },
];

export const Earn = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    if (currentStep < steps.length) setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="flex flex-col items-center h-[100vh] w-full mt-5 px-4 overflow-auto">
      <div className="relative max-w-xl h-4/6 p-6 bg-gray-50 shadow rounded-lg w-full overflow-auto mb-20">
        {currentStep === 1 && (
          <div>
            <h2 className="text-xl font-bold mb-6">{steps[0].name}</h2>
            <dl className="flex flex-col gap-8">
              {safetyPool.map((pool) => (
                <div key={pool.name}>
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="flex gap-4 items-center h-10 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-800">
                        {pool.icon}
                      </div>
                      {pool.name}
                    </div>
                  </dt>
                  <dd className="mt-1 text-base leading-7 text-gray-600">
                    {pool.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h2 className="text-xl font-bold mb-6">{steps[1].name}</h2>
            <dl className="flex flex-col gap-8">
              {participationSteps.map((participation) => (
                <div key={participation.name}>
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-800">
                      {participation.icon}
                    </div>
                    {participation.name}
                  </dt>
                  <dd className="mt-1 text-base leading-7 text-gray-600">
                    {participation.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {currentStep === 3 && (
          <div className="h-full w-full bg-gray-50 ">
            <SafetyPool />
          </div>
        )}
      </div>

      <div className="sticky bottom-4 flex justify-end gap-4 w-full max-w-4xl">
        {currentStep > 1 && (
          <button
            onClick={handlePreviousStep}
            className="px-4 border border-cyan-800 text-black py-2 rounded-lg hover:bg-cyan-700 transition"
          >
            Previous
          </button>
        )}

        {currentStep < steps.length && (
          <button
            onClick={handleNextStep}
            className="px-4 bg-cyan-800 text-white py-2 rounded-lg hover:bg-cyan-700 transition"
          >
            Next
          </button>
        )}

      </div>
    </div>
  );
};
