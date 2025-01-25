import { type HistoryConfig } from "prisma/extensions/history/types";

// Append only history key type
// NOTE: guidance should be given here that these keys should never be removed
enum HistoryKey {
  KEY_1 = "hk_1",
  KEY_2 = "hk_2",
}

export const historyConfig: HistoryConfig<HistoryKey> = {
  User: {
    name: {
      historyKey: HistoryKey.KEY_1,
    },
  },
  Todo: {
    name: {
      historyKey: HistoryKey.KEY_2,
    },
  },
  // Task: { // typescript won't allow this - Task no longer exists as a model
  //   historyKey: HistoryKey.KEY_2, // note:  KEY_2 still exists in the type
  // }
};
