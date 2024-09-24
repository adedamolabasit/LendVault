import assert from "assert";
import { 
  TestHelpers,
  LendVault_Withdraw
} from "generated";
const { MockDb, LendVault } = TestHelpers;

describe("LendVault contract Withdraw event tests", () => {
  // Create mock db
  const mockDb = MockDb.createMockDb();

  // Creating mock for LendVault contract Withdraw event
  const event = LendVault.Withdraw.mock({data: {} /* It mocks event fields with default values, so you only need to provide data */});

  it("LendVault_Withdraw is created correctly", async () => {
    // Processing the event
    const mockDbUpdated = await LendVault.Withdraw.processEvent({
      event,
      mockDb,
    });

    // Getting the actual entity from the mock database
    let actualLendVaultWithdraw = mockDbUpdated.entities.LendVault_Withdraw.get(
      `${event.chainId}_${event.block.height}_${event.logIndex}`
    );

    // Creating the expected entity
    const expectedLendVaultWithdraw: LendVault_Withdraw = {
      id: `${event.chainId}_${event.block.height}_${event.logIndex}`,
    };
    // Asserting that the entity in the mock database is the same as the expected entity
    assert.deepEqual(actualLendVaultWithdraw, expectedLendVaultWithdraw, "Actual LendVaultWithdraw should be the same as the expectedLendVaultWithdraw");
  });
});
