/*
 * Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features
 */
import {
  LendVault,
  LendVault_Withdraw,
  LendVault_Deposit,
  LendVault_StrLog,
  LendVault_BorrowLog,
  LendVault_LoanReturned,
} from "generated";

LendVault.Withdraw.handler(async ({ event, context }) => {
  context.SafetyPoolWidrawal.set({
    id: event.params.receiver.payload.bits,
    vaultId: event.params.vault_sub_id,
    assetId: event.params.underlying_asset.bits,
    withdrawnAmount: event.params.withdrawn_amount,
    burnedShares: event.params.burned_shares,
  });
});


LendVault.Deposit.handler(async ({ event, context }) => {
  context.SafetyPoolDeposit.set({
    id: event.params.receiver.payload.bits,
    vaultId: event.params.vault_sub_id,
    assetId: event.params.underlying_asset.bits,
    collateralLocked: event.params.deposited_amount,
    mintedShares: event.params.minted_shares,
  });
});


LendVault.StrLog.handler(async ({ event, context }) => {
  const entity: LendVault_StrLog = {
    id: `${event.chainId}_${event.block.height}_${event.logIndex}`,
  };

  context.LendVault_StrLog.set(entity);
});


LendVault.BorrowLog.handler(async ({ event, context }) => {
  context.BorrowerLog.set({
    id: event.params.recipient.bits,
    collateralAmount: event.params.collateral_amount,
    loanAmount: event.params.loan_amount,
    duration: event.params.maturity_date,
    collateralAtLq: event.params.collateral_price_at_liquidation,
  });
});


LendVault.LoanReturned.handler(async ({ event, context }) => {
  context.ReturnLoanDetails.set({
    id: event.params.recipient.bits,
    returnedAmount: event.params.returned_amount,
    interestPaid: event.params.interest_paid,
    timeStamp: event.params.timestamp,
  });
});

