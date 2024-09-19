export class LoanCalculator {
    private interestRate: number; // Annual interest rate in percentage
    private loanAmount: number; // Amount of loan (borrowable amount)
    private liquidationThreshold: number; // Threshold for liquidation in percentage (e.g., 150 for 150%)
    private loanStartDate: Date;
    private loanDurationDays: number; // Duration of the loan in days
    private borrowingLimit: number; // Percentage of collateral that can be borrowed (e.g., 75 for 75%)
   
  
    constructor(
      interestRate: number,
      loanAmount: number,
      liquidationThreshold: number,
      loanStartDate: Date,
      loanDurationDays: number,
      borrowingLimit: number,
    ) {
      this.interestRate = interestRate;
      this.loanAmount = loanAmount;
      this.liquidationThreshold = liquidationThreshold;
      this.loanStartDate = loanStartDate;
      this.loanDurationDays = loanDurationDays;
      this.borrowingLimit = borrowingLimit;
  
      // Initialize the loanAmount using the borrowing limit
      // this.loanAmount = this.getBorrowableAmount();
    }
  
    public getCollateralmount(): number {
      const loan = this.loanAmount * 2
      return loan;
    }

    public getLTVRatio(): number {
      return (this.loanAmount / this.getCollateralmount()) * 100;
    }

        public getLiquidationPrice(): number {
      return (75 / 100) * (this.getCollateralmount());
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

   
  
  
    // public getCollateralFactor(): number {
    //   return this.collateralAmount / this.loanAmount;
    // }
  
    // public getLTVRatio(): number {
    //   return (this.loanAmount / this.collateralValue) * 100;
    // }
  
    // public getLiquidationPrice(): number {
    //   return this.loanAmount / (this.collateralAmount * (this.liquidationThreshold / 100));
    // }
  
    // public getCollateralValueAtLiquidation(): number {
    //   return this.collateralAmount * this.getLiquidationPrice();
    // }
  
    // public getHealthFactor(): number {
    //   return (this.collateralValue * this.getCollateralFactor()) / this.loanAmount;
    // }
  
    public getTotalRepaymentAmount(currentDate: Date): number {
      return this.loanAmount + this.getInterestAccrued(currentDate);
    }
  
    public getAPY(): number {
      const compoundingPeriods = 365; 
      const annualRate = this.interestRate / 100;
      return ((1 + annualRate / compoundingPeriods) ** compoundingPeriods - 1) * 100;
    }
  }
  
  