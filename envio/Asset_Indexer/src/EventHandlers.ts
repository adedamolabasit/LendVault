/*
 * Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features
 */
import {
  LiquidityPool,
  LiquidityPool_StrLog,
  LiquidityPool_Withdraw,
  LiquidityPool_Deposit,
  LiquidityPool_BorrowLog,
} from "generated";

LiquidityPool.StrLog.handler(async ({ event, context }) => {
  const entity: LiquidityPool_StrLog = {
    id: `${event.chainId}_${event.block.height}_${event.logIndex}`,
  };

  context.LiquidityPool_StrLog.set(entity);
});

LiquidityPool.Withdraw.handler(async ({ event, context }) => {
  context.VaultWidrawal.set({
    id: event.params.receiver.payload.bits,
    vaultId: event.params.vault_sub_id,
    assetId: event.params.underlying_asset.bits,
    withdrawnAmount: event.params.withdrawn_amount,
    burnedShares: event.params.burned_shares,
  });
});

LiquidityPool.Deposit.handler(async ({ event, context }) => {
  context.VaultDeposit.set({
    id: event.params.receiver.payload.bits,
    vaultId: event.params.vault_sub_id,
    assetId: event.params.underlying_asset.bits,
    collateralLocked: event.params.deposited_amount,
    tokenMinted: event.params.minted_shares,
  });
});

LiquidityPool.BorrowLog.handler(async ({ event, context }) => {
  context.BorrowerDetails.set({
    id: event.params.recipient.bits,
    collateralLocked: event.params.locked_assets,
    tokenMinted: event.params.minted_amount,
    interest:event.params.interest_rate,
    duration: event.params.borrow_duration
  });
});
