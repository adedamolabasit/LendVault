/*
 * Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features
 */
import {
  LiquidityPool,
  LiquidityPool_BorrowLog,
  LiquidityPool_Withdraw,
  LiquidityPool_Deposit,
  LiquidityPool_StrLog,
} from "generated";

LiquidityPool.BorrowLog.handler(async ({ event, context }) => {
  const entity: LiquidityPool_BorrowLog = {
    id: `${event.chainId}_${event.block.height}_${event.logIndex}`,
  };

  context.LiquidityPool_BorrowLog.set(entity);
});


LiquidityPool.Withdraw.handler(async ({ event, context }) => {
  const entity: LiquidityPool_Withdraw = {
    id: `${event.chainId}_${event.block.height}_${event.logIndex}`,
  };

  context.LiquidityPool_Withdraw.set(entity);
});


LiquidityPool.Deposit.handler(async ({ event, context }) => {
  const entity: LiquidityPool_Deposit = {
    id: `${event.chainId}_${event.block.height}_${event.logIndex}`,
  };

  context.LiquidityPool_Deposit.set(entity);
});


LiquidityPool.StrLog.handler(async ({ event, context }) => {
  const entity: LiquidityPool_StrLog = {
    id: `${event.chainId}_${event.block.height}_${event.logIndex}`,
  };

  context.LiquidityPool_StrLog.set(entity);
});

