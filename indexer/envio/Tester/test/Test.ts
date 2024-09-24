import assert from "assert";
import { 
  TestHelpers,
  LendVault_BorrowLog
} from "generated";
const { MockDb, LendVault } = TestHelpers;

describe("LendVault contract BorrowLog event tests", () => {
  // Create mock db
  const mockDb = MockDb.createMockDb();

  // Creating mock for LendVault contract BorrowLog event
  const event = LendVault.BorrowLog.mock({data: {} /* It mocks event fields with default values, so you only need to provide data */});

  it("LendVault_BorrowLog is created correctly", async () => {
    // Processing the event
    const mockDbUpdated = await LendVault.BorrowLog.processEvent({
      event,
      mockDb,
    });

    // Getting the actual entity from the mock database
    let actualLendVaultBorrowLog = mockDbUpdated.entities.LendVault_BorrowLog.get(
      `${event.chainId}_${event.block.height}_${event.logIndex}`
    );

    // Creating the expected entity
    const expectedLendVaultBorrowLog: LendVault_BorrowLog = {
      id: `${event.chainId}_${event.block.height}_${event.logIndex}`,
    };
    // Asserting that the entity in the mock database is the same as the expected entity
    assert.deepEqual(actualLendVaultBorrowLog, expectedLendVaultBorrowLog, "Actual LendVaultBorrowLog should be the same as the expectedLendVaultBorrowLog");
  });
});
