/*
 * Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features
 */
import {
  SRC6,
  SRC6_Withdraw,
  SRC6_Deposit,
} from "generated";

SRC6.Withdraw.handler(async ({ event, context }) => {
  const entity: SRC6_Withdraw = {
    id: `${event.transactionId}_${event.receiptIndex}`,
  };

  context.SRC6_Withdraw.set(entity);
});


SRC6.Deposit.handler(async ({ event, context }) => {

  context.Vault.set({
    id: event.data.receiver.payload.bits,
    vaultId: event.data.vault_sub_id,
    assetId: event.data.underlying_asset.bits,
    collateralLocked: event.data.deposited_amount,
    tokenMinted: event.data.minted_shares
  });

});

