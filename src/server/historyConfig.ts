import { type HistoryConfig } from "prisma/extensions/history/types";

// Append only history key type
// NOTE: guidance should be given here that these keys should NEVER be removed (even if the model/field no longer exists)
// I think some entopy here would be advisable also
enum HistoryKey {
  KEY_1 = "hk_1",
  KEY_2 = "hk_2", // see below - this key should stick around even if the model/field pair no longer exists (to avoid erroneous history)
  KEY_3 = "hk_3",
}

export const historyConfig: HistoryConfig = {
  User: {
    name: {
      historyKey: HistoryKey.KEY_1,
    },
  },
  Todo: {
    name: {
      historyKey: HistoryKey.KEY_3,
    },
  },
  // Task: { // typescript won't allow this - Task no longer exists as a model (renamed to Todo)
  //   historyKey: HistoryKey.KEY_2, // note:  KEY_2 still exists in the enum
  // }
};
