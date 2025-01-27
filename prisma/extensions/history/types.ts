import {
  type PrismaClient,
  type Prisma,
  type HistoryKey,
} from "@prisma/client";
import {
  type DynamicClientExtensionThis,
  type DefaultArgs,
  type DynamicQueryExtensionCbArgs,
  type InternalArgs,
} from "@prisma/client/runtime/library";

// Prisma extension query function types
export type ExtensionPrismaClient = DynamicClientExtensionThis<
  Prisma.TypeMap<InternalArgs & DefaultArgs, Prisma.PrismaClientOptions>,
  Prisma.TypeMapCb,
  DefaultArgs,
  object
>;

export type PrismaCreateFnArgs<M extends Prisma.ModelName> =
  DynamicQueryExtensionCbArgs<
    Prisma.TypeMap<InternalArgs & DefaultArgs, Prisma.PrismaClientOptions>,
    "model",
    M,
    "create"
  >;

export type PrismaUpdateFnArgs<M extends Prisma.ModelName> =
  DynamicQueryExtensionCbArgs<
    Prisma.TypeMap<InternalArgs & DefaultArgs, Prisma.PrismaClientOptions>,
    "model",
    M,
    "update"
  >;

export type ExtensionCreateFnArgs<M extends Prisma.ModelName> =
  PrismaCreateFnArgs<M> & {
    client: ExtensionPrismaClient;
    historyKey: HistoryKey;
  };
export type ExtensionUpdateFnArgs<M extends Prisma.ModelName> =
  PrismaUpdateFnArgs<M> & {
    client: ExtensionPrismaClient;
    historyKey: HistoryKey;
  };

// Config types
export type ModelHistoryConfig<M extends Prisma.ModelName> = {
  [F in keyof PrismaClient[Uncapitalize<M>]["fields"]]?: {
    historyKey: HistoryKey;
  };
};

// users' keys must conform to this type - could make this even more clear with e.g. "unique" prefix
// export type HistoryKey = `hk_${string}`;

export type HistoryConfig = {
  readonly [M in Prisma.ModelName]?: ModelHistoryConfig<M>;
};
