import { useState } from "react";
import { CheckIcon } from "@heroicons/react/24/solid";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  HeartIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Borrow } from "./Borrow";

const steps = [
  { id: "01", name: "Overview", status: "complete" },
  { id: "02", name: "How You Earn", status: "current" },
  { id: "03", name: "Deposit and Earn", status: "upcoming" },
];

const features = [
  {
    name: "Spam report",
    description:
      "Autem reprehenderit aut debitis ut. Officiis harum omnis placeat blanditiis delectus sint vel et voluptatum. Labore asperiores non corporis molestiae.",
    icon: TrashIcon,
  },
  {
    name: "Compose in markdown",
    description:
      "Illum et aut inventore. Ut et dignissimos quasi. Omnis saepe dolorum. Hic autem fugiat. Voluptatem officiis necessitatibus est.",
    icon: PencilSquareIcon,
  },
  {
    name: "Compose in markdown",
    description:
      "Illum et aut inventore. Ut et dignissimos quasi. Omnis saepe dolorum. Hic autem fugiat. Voluptatem officiis necessitatibus est.",
    icon: PencilSquareIcon,
  },
];

export const Earn = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    if (currentStep < steps.length) setCurrentStep(currentStep + 1);
  };

  return (
    <div className="flex flex-col items-center space-y-8 h-[100vh] mt-10 px-4">
      {/* Progress Navigation */}
      <nav aria-label="Progress" className="w-full max-w-4xl">
        <ol className="divide-y divide-gray-300 rounded-md border border-gray-300 md:flex md:divide-y-0">
          {steps.map((step, stepIdx) => (
            <li key={step.name} className="relative md:flex md:flex-1">
              {stepIdx + 1 < currentStep ? (
                <a href="#" className="group flex w-full items-center">
                  <span className="flex items-center px-6 py-4 text-sm font-medium">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600 group-hover:bg-indigo-800">
                      <CheckIcon className="h-6 w-6 text-white" />
                    </span>
                    <span className="ml-4 text-sm font-medium text-gray-900">
                      {step.name}
                    </span>
                  </span>
                </a>
              ) : stepIdx + 1 === currentStep ? (
                <a
                  href="#"
                  className="flex items-center px-6 py-4 text-sm font-medium"
                >
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-indigo-600">
                    <span className="text-indigo-600">{step.id}</span>
                  </span>
                  <span className="ml-4 text-sm font-medium text-indigo-600">
                    {step.name}
                  </span>
                </a>
              ) : (
                <a href="#" className="group flex items-center">
                  <span className="flex items-center px-6 py-4 text-sm font-medium">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-300 group-hover:border-gray-400">
                      <span className="text-gray-500 group-hover:text-gray-900">
                        {step.id}
                      </span>
                    </span>
                    <span className="ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900">
                      {step.name}
                    </span>
                  </span>
                </a>
              )}

              {stepIdx !== steps.length - 1 ? (
                <div
                  aria-hidden="true"
                  className="absolute right-0 top-0 hidden h-full w-5 md:block"
                >
                  <svg
                    className="h-full w-full text-gray-300"
                    fill="none"
                    viewBox="0 0 22 80"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 -2L20 40L0 82"
                      stroke="currentColor"
                      vectorEffect="non-scaling-stroke"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              ) : null}
            </li>
          ))}
        </ol>
      </nav>

      {/* Step Content */}
      <div className="max-w-xl bg-white p-6 shadow rounded-lg w-full">
        {currentStep === 1 && (
          <dl className="flex flex-col gap-8">
            {features.map((feature) => (
              <div key={feature.name}>
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="flex gap-4 items-center h-10 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                      <feature.icon
                        aria-hidden="true"
                        className="h-6 w-6 text-white"
                      />
                    </div>
                    {feature.name}
                  </div>
                </dt>
                <dd className="mt-1 text-base leading-7 text-gray-600">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        )}

        {currentStep === 2 && (
          <div>
            <dl className="flex flex-col gap-8">
              {features.map((feature) => (
                <div key={feature.name}>
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                      <feature.icon
                        aria-hidden="true"
                        className="h-6 w-6 text-white"
                      />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-1 text-base leading-7 text-gray-600">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <Borrow />
          </div>
        )}

        {/* Proceed Button */}
        <button
          onClick={handleNextStep}
          className={`mt-6 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition ${
            currentStep === steps.length ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={currentStep === steps.length}
        >
          {currentStep < steps.length ? "Next Step" : "Completed"}
        </button>
      </div>
    </div>
  );
};
