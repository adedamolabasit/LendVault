import { InputBox } from "../../components/InputBox";
import { useWalletContext } from "../../providers/wallet.auth.provider";
import { LoanCalculator } from "../../utils/LoanCalculator";

export const Borrow = () => {
  const { borrowAmount, identityInput, instance, vaultSubID } =
    useWalletContext();

  // Example usage
  const collateralAmount = 1500;
  const collateralValue = borrowAmount as number;
  const liquidationThreshold = 150;
  const loanStartDate = new Date();
  const loanDurationDays = 90;
  const interestRate = 5;
  const borrowingLimit = 75;

  const calculator = new LoanCalculator(
    interestRate,
    collateralAmount,
    collateralValue,
    liquidationThreshold,
    loanStartDate,
    loanDurationDays,
    borrowingLimit
  );

  console.log("Borrowable Amount:", calculator.getBorrowableAmount());
  console.log("Interest Accrued:", calculator.getInterestAccrued(new Date()));
  console.log("Due Date:", calculator.getDueDate());
  console.log("Collateral Factor:", calculator.getCollateralFactor());
  console.log("LTV Ratio:", calculator.getLTVRatio());
  console.log("Liquidation Price:", calculator.getLiquidationPrice());
  console.log(
    "Collateral Value at Liquidation:",
    calculator.getCollateralValueAtLiquidation()
  );
  console.log("Health Factor:", calculator.getHealthFactor());
  console.log(
    "Total Repayment Amount:",
    calculator.getTotalRepaymentAmount(new Date())
  );
  console.log("APY:", calculator.getAPY());

  const date = new Date();

  return (
    <div className="h-5/6 w-full  ">
      <div className="flex flex-col px-12 py-6 gap-6">
        <div className="w-full">
          <InputBox />
        </div>

        <div className=" rounded-lg bg-gray-50 px-4 py-6">
          <dl className="divide-y divide-gray-200 text-sm">
            <div className="flex items-center justify-between pb-4">
              <dt className="text-gray-600">Interest Rate</dt>
              <dd className="font-medium text-gray-900">
                {calculator.getInterestAccrued(date)}
              </dd>
            </div>
            <div className="flex items-center justify-between py-4">
              <dt className="text-gray-600">Collateral Ratio (CR)</dt>
              <dd className="font-medium text-gray-900">
                {calculator.getLTVRatio()}
              </dd>
            </div>
            <div className="flex items-center justify-between py-4">
              <dt className="text-gray-600">Loan to Value Ratio (LVT)</dt>
              <dd className="font-medium text-gray-900">
                {calculator.getLTVRatio()}
              </dd>
            </div>
            <div className="flex items-center justify-between py-4">
              <dt className="font-medium text-gray-900">
                Liquidation Threshold
              </dt>
              <dd className="font-medium text-indigo-600">
                {calculator.getLiquidationPrice()}
              </dd>
            </div>
            <div className="flex items-center justify-between py-4">
              <dt className="text-gray-600">Collateral Value at Liquidation</dt>
              <dd className="font-medium text-gray-900">
                {calculator.getCollateralValueAtLiquidation()}
              </dd>
            </div>
            <div className="flex items-center justify-between py-4">
              <dt className="font-medium text-gray-900">Health factor (HF)</dt>
              <dd className="font-medium text-indigo-600">
                {calculator.getHealthFactor()}
              </dd>
            </div>
            <div className="flex items-center justify-between pt-4">
              <dt className="font-medium text-gray-900">
                Total Asset after Repayment
              </dt>
              <dd className="font-medium text-indigo-600">100</dd>
            </div>
          </dl>
        </div>

        <div className="flex justify-center">
          <button
            className="w-full border  border-cyan-800 text-black "
            // onClick={() =>
            //   DepostAndMint(
            //     identityInput,
            //     instance,
            //     vaultSubID,
            //     borrowAmount as number
            //   )
            // }
          >
            Borrow Token
          </button>
        </div>
      </div>
    </div>
  );
};
