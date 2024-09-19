import assert from "assert";
import { 
  TestHelpers,
  LiquidityPool_StrLog
} from "generated";
const { MockDb, LiquidityPool } = TestHelpers;

describe("LiquidityPool contract StrLog event tests", () => {
  // Create mock db
  const mockDb = MockDb.createMockDb();

  // Creating mock for LiquidityPool contract StrLog event
  const event = LiquidityPool.StrLog.mock({data: {} /* It mocks event fields with default values, so you only need to provide data */});

  it("LiquidityPool_StrLog is created correctly", async () => {
    // Processing the event
    const mockDbUpdated = await LiquidityPool.StrLog.processEvent({
      event,
      mockDb,
    });

    // Getting the actual entity from the mock database
    let actualLiquidityPoolStrLog = mockDbUpdated.entities.LiquidityPool_StrLog.get(
      `${event.chainId}_${event.block.height}_${event.logIndex}`
    );

    // Creating the expected entity
    const expectedLiquidityPoolStrLog: LiquidityPool_StrLog = {
      id: `${event.chainId}_${event.block.height}_${event.logIndex}`,
    };
    // Asserting that the entity in the mock database is the same as the expected entity
    assert.deepEqual(actualLiquidityPoolStrLog, expectedLiquidityPoolStrLog, "Actual LiquidityPoolStrLog should be the same as the expectedLiquidityPoolStrLog");
  });
});
