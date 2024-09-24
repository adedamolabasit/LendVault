/*
 * Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features
 */
import {
  LendVault,
  LendVault_StrLog,
  LendVault_LoanReturned,
  LendVault_Deposit,
  LendVault_Withdraw,
  LendVault_BorrowLog,
} from "generated";

LendVault.StrLog.handler(async ({ event, context }) => {
  const entity: LendVault_StrLog = {
    id: `${event.chainId}_${event.block.height}_${event.logIndex}`,
  };

  context.LendVault_StrLog.set(entity);
});


LendVault.LoanReturned.handler(async ({ event, context }) => {
  const entity: LendVault_LoanReturned = {
    id: `${event.chainId}_${event.block.height}_${event.logIndex}`,
  };

  context.LendVault_LoanReturned.set(entity);
});


LendVault.Deposit.handler(async ({ event, context }) => {
  const entity: LendVault_Deposit = {
    id: `${event.chainId}_${event.block.height}_${event.logIndex}`,
  };

  context.LendVault_Deposit.set(entity);
});


LendVault.Withdraw.handler(async ({ event, context }) => {
  const entity: LendVault_Withdraw = {
    id: `${event.chainId}_${event.block.height}_${event.logIndex}`,
  };

  context.LendVault_Withdraw.set(entity);
});


LendVault.BorrowLog.handler(async ({ event, context }) => {
  context.BorrowerLog.set({
    id: event.params.recipient.bits,
    collateralLocked: event.params.locked_assets,
    tokenMinted: event.params.minted_amount,
    interest: event.params.interest_rate,
    duration: event.params.borrow_duration,
  });
});

