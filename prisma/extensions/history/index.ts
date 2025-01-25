import { Prisma } from "@prisma/client";
import { type HistoryConfig } from "./types";
import { validateConfig } from "./validateConfig";
import { defaultCreateFn } from "./writers";
import {
  DefaultArgs,
  DynamicQueryExtensionArgs,
  InternalArgs,
  PrismaClientOptions,
  TypeMapDef,
} from "@prisma/client/runtime/library";

export const initHistoryExtension = (config: HistoryConfig) => {
  // validate config
  if (validateConfig(config)) {
    throw new Error("Config is invalid");
  }
  // create and return extension, constructing from config
  return Prisma.defineExtension((client) =>
    client.$extends({
      name: "addHistory",
      query: {
        $allModels: {
          create: (args) => defaultCreateFn({ client, config, args }),
          // update: (args) => defaultUpdateFn({ client, config, args }),
        },
      },
    }),
  );
};

// would be nice but tricky (and not needed)
// const _templateExtension = (
//   config: HistoryConfig,
//   client: ExtensionPrismaClient,
// ): DynamicQueryExtensionArgs<
//   keyof HistoryConfig,
//   any
// > => {
//   // gather model/field/historyKey into query object
//   const temp = [];
//   for (const [modelName, modelConfig] of Object.entries(config)) {
//     for (const [fieldName, fieldConfig] of Object.entries(modelConfig)) {
//       const historyKey = fieldConfig.historyKey;
//       temp.push({
//         modelName: modelName as keyof HistoryConfig,
//         fieldName: fieldName as keyof ModelHistoryConfig<keyof HistoryConfig>,
//         historyKey,
//       });
//     }
//   }
//   return temp.reduce(
//     (acc, { modelName, fieldName, historyKey }) => {
//       acc[modelName][fieldName] = {
//         create: (args) => defaultCreateFn({ client, ...args }),
//         update: (args) => defaultUpdateFn({ client, ...args }),
//       };
//       return acc;
//     },
//     {} as Record<
//       keyof HistoryConfig,
//       Record<
//         keyof ModelHistoryConfig<keyof HistoryConfig>,
//         {
//           create: <M extends Prisma.ModelName>(
//             args: PrismaCreateFnArgs<M>,
//           ) => Promise<unknown>;
//           update: <M extends Prisma.ModelName>(
//             args: PrismaUpdateFnArgs<M>,
//           ) => Promise<unknown>;
//         }
//       >
//     >,
//   );
// };
