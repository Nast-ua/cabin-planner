import { auth } from "@clerk/nextjs";
import { prisma } from "./db";

export const getUserByClerkID = async () => {
  const { userId } = await auth();

  if (!userId) throw new Error("No auth user");

  return await prisma.user.findUniqueOrThrow({
    where: { clerkId: userId },
  });
};
