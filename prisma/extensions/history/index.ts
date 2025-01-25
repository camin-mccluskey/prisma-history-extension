import { Prisma } from "@prisma/client";
import { HistoryKey, type HistoryConfig } from "./types";
import { validateConfig } from "./validateConfig";
import { defaultCreateFn, defaultUpdateFn } from "./writers";

export const initHistoryExtension = <HK extends HistoryKey>(
  config: HistoryConfig<HK>,
) => {
  // validate config
  if (validateConfig(config)) {
    throw new Error("Config is invalid");
  }
  // create and return extension, constructing from config
  return Prisma.defineExtension((client) =>
    client.$extends({
      name: "addHistory",
      query: {
        todo: {
          create: (args) => defaultCreateFn({ client, ...args }),
          update: (args) => defaultUpdateFn({ client, ...args }),
        },
      },
    }),
  );
};
