import { type HistoryConfig } from "prisma/extensions/history/types";

// Append only history key type
// NOTE: guidance should be given here that these keys should NEVER be removed (even if the model/field no longer exists)
// I think some entopy here would be advisable also
// FIXME: this now lives in schema
enum HistoryKey {
  KEY_1 = "hk_1",
  KEY_2 = "hk_2", // see below - this key should stick around even if the model/field pair no longer exists (to avoid erroneous history)
  KEY_3 = "hk_3",
  KEY_4 = "hk_Todo_name_27_01_25",
}

// problems
// - Reuse the HistoryKeys (across time)
// - "intent" should be preserved - if we rename a model/field pair the SAME key MUST be used
// - confusion - thinking the key is wrong and changing it
//
//
// Workflows
// 1) new thing under history
// 2) renaming thing currently under history
// 3) deleting something currently under history

export const historyConfig: HistoryConfig = {
  User: {
    name: {
      historyKey: HistoryKey.KEY_4,
    },
  },
  Todo: {
    name: {
      historyKey: "920538un",
    },
  },
  Review: {
    title: {
      initialLocation: InitialLocation.REVIEW_TITLE, // from @prisma/client
      startedTrackingAt: Date("02-11-2024"), //
    },
  },
  // Shell: {
  //  name:{
  //   historyKey: HistoryKey.KEY_2, // note:  KEY_2 is reused but correct
  //   }
  // }
};
