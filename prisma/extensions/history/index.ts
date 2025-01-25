import { Prisma } from "@prisma/client";
import { type HistoryConfig } from "./types";
import { validateConfig } from "./validateConfig";
import { defaultCreateFn, defaultUpdateFn } from "./writers";

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
        todo: {
          create: (args) => defaultCreateFn({ client, ...args }),
          update: (args) => defaultUpdateFn({ client, ...args }),
        },
      },
    }),
  );
};
