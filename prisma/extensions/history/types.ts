import { type PrismaClient, type Prisma } from "@prisma/client";
import {
  type DynamicClientExtensionThis,
  type DefaultArgs,
  type DynamicQueryExtensionCbArgs,
  type InternalArgs,
} from "@prisma/client/runtime/library";

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
type ActiveFieldConfig = {
  status: "active";
  historyKey: string;
};

type InactiveFieldConfig = {
  status: "inactive";
  historyKey: string;
};

type ModelHistoryConfig<M extends Prisma.ModelName> = {
  [F in keyof PrismaClient[Uncapitalize<M>]["fields"]]?: ActiveFieldConfig; // model fields in the current schema must be active if in history config
} & Record<string, InactiveFieldConfig>; // other fields must be inactive but should be present to avoid key reuse across time

export type HistoryConfig = {
  readonly [M in Prisma.ModelName]?: ModelHistoryConfig<M>;
};
