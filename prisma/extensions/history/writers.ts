import { type Prisma } from "@prisma/client";
import { type CreateFnArgs, type UpdateFnArgs } from "./types";

export const defaultCreateFn = async <M extends Prisma.ModelName>(
  args: CreateFnArgs<M>,
) => {
  console.log(args);
};

export const defaultUpdateFn = async <M extends Prisma.ModelName>(
  args: UpdateFnArgs<M>,
) => {
  console.log(args);
};
