import { type Prisma } from "@prisma/client";
import {
  type ExtensionPrismaClient,
  type HistoryConfig,
  type PrismaCreateFnArgs,
  type PrismaUpdateFnArgs,
} from "./types";

export const defaultCreateFn = async <M extends Prisma.ModelName>(args: {
  client: ExtensionPrismaClient;
  config: HistoryConfig;
  args: PrismaCreateFnArgs<M>;
}) => {
  const { client, config, args: createParams } = args;
  const result = await createParams.query(createParams.args);
  if (!_shouldWriteHistory(config, "Todo", "todo")) return result;
  // write history
};

// export const defaultUpdateFn = async <M extends Prisma.ModelName>(
//   args: UpdateFnArgs<M>,
// ) => {
//   console.log(args);
// };

const _shouldWriteHistory = (
  config: HistoryConfig,
  model: Prisma.ModelName,
  fieldName: string,
) => {
  // const modelSet = new Set(Object.keys(config));
  // const fieldSet = new Set(Object.keys(config[model] ?? []));
  // if (modelSet.has(model) && fieldSet.has(fieldName)) {
  //   return true
  // }
  // return false
  // TODO: do something here to inspect config and the query result (/type) to understand if we should write history
  return false;
};
