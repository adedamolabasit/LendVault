import assert from "assert";
import { 
  TestHelpers,
  LendVault_StrLog
} from "generated";
const { MockDb, LendVault } = TestHelpers;

describe("LendVault contract StrLog event tests", () => {
  // Create mock db
  const mockDb = MockDb.createMockDb();

  // Creating mock for LendVault contract StrLog event
  const event = LendVault.StrLog.mock({data: {} /* It mocks event fields with default values, so you only need to provide data */});

  it("LendVault_StrLog is created correctly", async () => {
    // Processing the event
    const mockDbUpdated = await LendVault.StrLog.processEvent({
      event,
      mockDb,
    });

    // Getting the actual entity from the mock database
    let actualLendVaultStrLog = mockDbUpdated.entities.LendVault_StrLog.get(
      `${event.chainId}_${event.block.height}_${event.logIndex}`
    );

    // Creating the expected entity
    const expectedLendVaultStrLog: LendVault_StrLog = {
      id: `${event.chainId}_${event.block.height}_${event.logIndex}`,
    };
    // Asserting that the entity in the mock database is the same as the expected entity
    assert.deepEqual(actualLendVaultStrLog, expectedLendVaultStrLog, "Actual LendVaultStrLog should be the same as the expectedLendVaultStrLog");
  });
});
