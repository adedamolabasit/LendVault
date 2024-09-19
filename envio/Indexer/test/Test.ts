import assert from "assert";
import { 
  TestHelpers,
  LiquidityPool_BorrowLog
} from "generated";
const { MockDb, LiquidityPool } = TestHelpers;

describe("LiquidityPool contract BorrowLog event tests", () => {
  // Create mock db
  const mockDb = MockDb.createMockDb();

  // Creating mock for LiquidityPool contract BorrowLog event
  const event = LiquidityPool.BorrowLog.mock({data: {} /* It mocks event fields with default values, so you only need to provide data */});

  it("LiquidityPool_BorrowLog is created correctly", async () => {
    // Processing the event
    const mockDbUpdated = await LiquidityPool.BorrowLog.processEvent({
      event,
      mockDb,
    });

    // Getting the actual entity from the mock database
    let actualLiquidityPoolBorrowLog = mockDbUpdated.entities.LiquidityPool_BorrowLog.get(
      `${event.chainId}_${event.block.height}_${event.logIndex}`
    );

    // Creating the expected entity
    const expectedLiquidityPoolBorrowLog: LiquidityPool_BorrowLog = {
      id: `${event.chainId}_${event.block.height}_${event.logIndex}`,
    };
    // Asserting that the entity in the mock database is the same as the expected entity
    assert.deepEqual(actualLiquidityPoolBorrowLog, expectedLiquidityPoolBorrowLog, "Actual LiquidityPoolBorrowLog should be the same as the expectedLiquidityPoolBorrowLog");
  });
});
