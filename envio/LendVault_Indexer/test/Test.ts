import assert from "assert";
import { 
  TestHelpers,
  SRC6_Withdraw
} from "generated";
const { MockDb, SRC6 } = TestHelpers;

describe("SRC6 contract Withdraw event tests", () => {
  // Create mock db
  const mockDb = MockDb.createMockDb();

  // Creating mock for SRC6 contract Withdraw event
  const event = SRC6.Withdraw.mock({data: {} /* It mocks event fields with default values, so you only need to provide data */});

  it("SRC6_Withdraw is created correctly", async () => {
    // Processing the event
    const mockDbUpdated = await SRC6.Withdraw.processEvent({
      event,
      mockDb,
    });

    // Getting the actual entity from the mock database
    let actualSRC6Withdraw = mockDbUpdated.entities.SRC6_Withdraw.get(
      `${event.transactionId}_${event.receiptIndex}`
    );

    // Creating the expected entity
    const expectedSRC6Withdraw: SRC6_Withdraw = {
      id: `${event.transactionId}_${event.receiptIndex}`,
    };
    // Asserting that the entity in the mock database is the same as the expected entity
    assert.deepEqual(actualSRC6Withdraw, expectedSRC6Withdraw, "Actual SRC6Withdraw should be the same as the expectedSRC6Withdraw");
  });
});
