/*
 * Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features
 */
import {
  LendVault,
  LendVault_Withdraw,
  LendVault_StrLog,
  LendVault_Deposit,
  LendVault_BorrowLog,
  LendVault_LoanReturned,
} from "generated";

LendVault.Withdraw.handler(async ({ event, context }) => {
  const entity: LendVault_Withdraw = {
    id: `${event.chainId}_${event.block.height}_${event.logIndex}`,
  };

  context.LendVault_Withdraw.set(entity);
});


LendVault.StrLog.handler(async ({ event, context }) => {
  const entity: LendVault_StrLog = {
    id: `${event.chainId}_${event.block.height}_${event.logIndex}`,
  };

  context.LendVault_StrLog.set(entity);
});


LendVault.Deposit.handler(async ({ event, context }) => {
  const entity: LendVault_Deposit = {
    id: `${event.chainId}_${event.block.height}_${event.logIndex}`,
  };

  context.LendVault_Deposit.set(entity);
});


LendVault.BorrowLog.handler(async ({ event, context }) => {
  const entity: LendVault_BorrowLog = {
    id: `${event.chainId}_${event.block.height}_${event.logIndex}`,
  };

  context.LendVault_BorrowLog.set(entity);
});


LendVault.LoanReturned.handler(async ({ event, context }) => {
  const entity: LendVault_LoanReturned = {
    id: `${event.chainId}_${event.block.height}_${event.logIndex}`,
  };

  context.LendVault_LoanReturned.set(entity);
});

