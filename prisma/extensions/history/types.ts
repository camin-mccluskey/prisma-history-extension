import { type PrismaClient, type Prisma } from "@prisma/client";
import {
  type DynamicClientExtensionThis,
  type DefaultArgs,
  type DynamicQueryExtensionCbArgs,
  type InternalArgs,
} from "@prisma/client/runtime/library";
import { EnumLike } from "zod";

// Prisma extension query function types
type ExtensionPrismaClient = DynamicClientExtensionThis<
  Prisma.TypeMap<InternalArgs & DefaultArgs, Prisma.PrismaClientOptions>,
  Prisma.TypeMapCb,
  DefaultArgs,
  object
>;

export type CreateFnArgs<M extends Prisma.ModelName> =
  DynamicQueryExtensionCbArgs<
    Prisma.TypeMap<InternalArgs & DefaultArgs, Prisma.PrismaClientOptions>,
    "model",
    M,
    "create"
  > & { client: ExtensionPrismaClient };

export type UpdateFnArgs<M extends Prisma.ModelName> =
  DynamicQueryExtensionCbArgs<
    Prisma.TypeMap<InternalArgs & DefaultArgs, Prisma.PrismaClientOptions>,
    "model",
    M,
    "update"
  >;

// Config types
type ModelHistoryConfig<M extends Prisma.ModelName, HK extends HistoryKey> = {
  [F in keyof PrismaClient[Uncapitalize<M>]["fields"]]?: {
    historyKey: HK;
  };
};

// users must extend this type - could make this even more clear with e.g. "unique" prefix
export type HistoryKey = `hk_${string}`;

export type HistoryConfig<HK extends HistoryKey> = {
  readonly [M in Prisma.ModelName]?: ModelHistoryConfig<M, HK>;
};
