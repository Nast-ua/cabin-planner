import { auth } from "@clerk/nextjs";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { prisma } from "./db";

export const getUserByClerkID = async ({
  select,
}: {
  select?: Prisma.UserSelect<DefaultArgs> | null | undefined;
}) => {
  const { userId } = await auth();

  const user = await prisma.user.findUniqueOrThrow({
    where: { clerkId: userId as string },
    select,
  });

  return user;
};
