import { auth } from "@clerk/nextjs";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { prisma } from "./db";

export const getUserByClerkID = async (
  options?: Omit<Prisma.UserFindUniqueOrThrowArgs<DefaultArgs>, "where">
) => {
  // TODO: Add error handling
  const { userId } = await auth();

  return await prisma.user.findUniqueOrThrow({
    where: { clerkId: userId as string },
  });
};
