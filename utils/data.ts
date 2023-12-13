import { prisma } from "@/utils/db";
import { auth } from "@clerk/nextjs";

export const getMyEvents = async () => {
  const { userId } = await auth();

  if (!userId) throw new Error("No auth user");

  return await prisma.event.findMany({
    where: {
      startDate: { gte: new Date() },
      users: { some: { clerkId: userId as string } },
    },
    orderBy: {
      startDate: "asc",
    },
  });
};

export const getEventById = async (id: string) => {
  const { userId } = await auth();

  if (!userId) throw new Error("No auth user");

  return await prisma.event.findUnique({
    where: { id },
  });
};
