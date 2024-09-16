export class LoanCalculator {
    private interestRate: number; // Annual interest rate in percentage
    private collateralAmount: number; // Amount of collateral
    private collateralValue: number; // Value of collateral
    private liquidationThreshold: number; // Threshold for liquidation in percentage (e.g., 150 for 150%)
    private loanStartDate: Date;
    private loanDurationDays: number; // Duration of the loan in days
    private borrowingLimit: number; // Percentage of collateral that can be borrowed (e.g., 75 for 75%)
    private loanAmount: number; // Amount of loan (borrowable amount)
  
    constructor(
      interestRate: number,
      collateralAmount: number,
      collateralValue: number,
      liquidationThreshold: number,
      loanStartDate: Date,
      loanDurationDays: number,
      borrowingLimit: number // Adding borrowing limit as a parameter
    ) {
      this.interestRate = interestRate;
      this.collateralAmount = collateralAmount;
      this.collateralValue = collateralValue;
      this.liquidationThreshold = liquidationThreshold;
      this.loanStartDate = loanStartDate;
      this.loanDurationDays = loanDurationDays;
      this.borrowingLimit = borrowingLimit;
  
      // Initialize the loanAmount using the borrowing limit
      this.loanAmount = this.getBorrowableAmount();
    }
  
    public getBorrowableAmount(): number {
      return this.collateralAmount * (this.borrowingLimit / 100);
    }
  
    public getInterestAccrued(currentDate: Date): number {
      const daysElapsed = Math.floor((+currentDate - +this.loanStartDate) / (1000 * 60 * 60 * 24));
      const dailyInterestRate = this.interestRate / 100 / 365; // Daily interest rate
      return this.loanAmount * dailyInterestRate * daysElapsed;
    }
  
    public getDueDate(): Date {
      const dueDate = new Date(this.loanStartDate);
      dueDate.setDate(dueDate.getDate() + this.loanDurationDays);
      return dueDate;
    }
  
    public getCollateralFactor(): number {
      return this.collateralAmount / this.loanAmount;
    }
  
    public getLTVRatio(): number {
      return (this.loanAmount / this.collateralValue) * 100;
    }
  
    public getLiquidationPrice(): number {
      return this.loanAmount / (this.collateralAmount * (this.liquidationThreshold / 100));
    }
  
    public getCollateralValueAtLiquidation(): number {
      return this.collateralAmount * this.getLiquidationPrice();
    }
  
    public getHealthFactor(): number {
      return (this.collateralValue * this.getCollateralFactor()) / this.loanAmount;
    }
  
    public getTotalRepaymentAmount(currentDate: Date): number {
      return this.loanAmount + this.getInterestAccrued(currentDate);
    }
  
    public getAPY(): number {
      const compoundingPeriods = 365; 
      const annualRate = this.interestRate / 100;
      return ((1 + annualRate / compoundingPeriods) ** compoundingPeriods - 1) * 100;
    }
  }
  
  // Example usage
  const collateralAmount = 1500; // Amount of collateral
  const collateralValue = 1500; // Value of collateral
  const liquidationThreshold = 150; // 150% for liquidation
  const loanStartDate = new Date();
  const loanDurationDays = 90;
  const interestRate = 5; // 5% annual interest rate
  const borrowingLimit = 75; // 75% of collateral can be borrowed
  
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
//   console.log("Loan Amount:", calculator.loanAmount); // This should now match the borrowable amount
  console.log("Interest Accrued:", calculator.getInterestAccrued(new Date()));
  console.log("Due Date:", calculator.getDueDate());
  console.log("Collateral Factor:", calculator.getCollateralFactor());
  console.log("LTV Ratio:", calculator.getLTVRatio());
  console.log("Liquidation Price:", calculator.getLiquidationPrice());
  console.log("Collateral Value at Liquidation:", calculator.getCollateralValueAtLiquidation());
  console.log("Health Factor:", calculator.getHealthFactor());
  console.log("Total Repayment Amount:", calculator.getTotalRepaymentAmount(new Date()));
  console.log("APY:", calculator.getAPY());
  