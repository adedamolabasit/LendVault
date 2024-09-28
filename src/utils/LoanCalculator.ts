export class LoanCalculator {
  private interestRate: number;
  private loanAmount: number;
  private liquidationThreshold: number;
  private loanStartDate: Date;
  private loanDurationDays: number;
  private borrowingLimit: number;

  constructor(
    interestRate: number,
    loanAmount: number,
    liquidationThreshold: number,
    loanStartDate: Date,
    loanDurationDays: number,
    borrowingLimit: number
  ) {
    this.interestRate = interestRate;
    this.loanAmount = loanAmount;
    this.liquidationThreshold = liquidationThreshold;
    this.loanStartDate = loanStartDate;
    this.loanDurationDays = loanDurationDays;
    this.borrowingLimit = borrowingLimit;
  }

  public getCollateralmount(): number {
    const loan = this.loanAmount * 2;
    return loan;
  }

  public getLTVRatio(): number {
    return (this.loanAmount / this.getCollateralmount()) * 100;
  }

  public getLiquidationPrice(): number {
    return (75 / 100) * this.getCollateralmount();
  }

  public getInterestAccrued(currentDate: Date): number {
    const daysElapsed = Math.floor(
      (+currentDate - +this.loanStartDate) / (1000 * 60 * 60 * 24)
    );
    const dailyInterestRate = this.interestRate / 100 / 365;
    return this.loanAmount * dailyInterestRate * daysElapsed;
  }

  public getDueDate(): Date {
    const dueDate = new Date(this.loanStartDate);
    dueDate.setDate(dueDate.getDate() + this.loanDurationDays);
    return dueDate;
  }

  public getTotalRepaymentAmount(currentDate: Date): number {
    return this.loanAmount + this.getInterestAccrued(currentDate);
  }

  public getAPY(): number {
    const compoundingPeriods = 365;
    const annualRate = this.interestRate / 100;
    return (
      ((1 + annualRate / compoundingPeriods) ** compoundingPeriods - 1) * 100
    );
  }

  public getNone(): number {
    const threshold = this.liquidationThreshold;
    const limit = this.borrowingLimit;
    return threshold + limit;
  }
}
