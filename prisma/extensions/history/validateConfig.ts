import { type HistoryConfig } from "./types";

export const validateConfig = (config: HistoryConfig): boolean => {
  // validate no duplicate key
  return !hasDuplicateHistoryKeys(config);
  // maybe there will be other validations we'd like to do later
};

// TODO: this should be checking for duplicated IntitialColumnLocation AND birthdate (startingTrackingDatetime)
/** Checks all keys for duplicates (even legacy, inactive keys)
 * @param config The history config to validate
 * @returns true if there are no duplicate keys, false otherwise
 * */
function hasDuplicateHistoryKeys(config: HistoryConfig): boolean {
  const historyKeys = new Set<string>();
  for (const model of Object.values(config)) {
    for (const column of Object.values(model)) {
      const key = column.historyKey;
      if (historyKeys.has(key)) {
        console.error(`Duplicate history key: ${key}`);
        return true;
      }
      historyKeys.add(key);
    }
  }
  return false;
}
