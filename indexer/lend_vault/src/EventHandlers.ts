/*
 * Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features
 */
import {
  LendVault,
  LendVault_Withdraw,
  LendVault_LoanReturned,
  LendVault_StrLog,
  LendVault_BorrowLog,
  LendVault_Deposit,
} from "generated";

LendVault.Withdraw.handler(async ({ event, context }) => {
  const entity: LendVault_Withdraw = {
    id: `${event.chainId}_${event.block.height}_${event.logIndex}`,
  };

  context.LendVault_Withdraw.set(entity);
});


LendVault.LoanReturned.handler(async ({ event, context }) => {
  const entity: LendVault_LoanReturned = {
    id: `${event.chainId}_${event.block.height}_${event.logIndex}`,
  };

  context.LendVault_LoanReturned.set(entity);
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
    collateralLocked: event.params.locked_assets,
    tokenMinted: event.params.minted_amount,
    interest: event.params.interest_rate,
    duration: event.params.borrow_duration,
  });
  console.log(event.params,"ieiwow")
});


LendVault.Deposit.handler(async ({ event, context }) => {
  const entity: LendVault_Deposit = {
    id: `${event.chainId}_${event.block.height}_${event.logIndex}`,
  };

  context.LendVault_Deposit.set(entity);
});

