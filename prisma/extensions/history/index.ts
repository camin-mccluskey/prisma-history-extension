export const addHistory = (config: HistoryConfig) => {
  // validate config
  if (validateConfig(config)) {
    throw new Error("Config is invalid");
  }
  // create and return extension, constructing from config
  return Prisma.defineExtension((client) =>
    client.$extends({
      name: "addHistory",
      query: {
        // productApplication: {
        //   create: (args) => createFn({ client, ...args }),
        //   update: (args) => updateFn({ client, ...args }),
        // },
        // bestFor: {
        //   create: (args) => createFn({ client, ...args }),
        //   update: (args) => updateFn({ client, ...args }),
        // },
        // etc for all models - we could generate this list from some config (or just define it here type-safely if only Stackfix is using this extension)
      },
    }),
  );
};
