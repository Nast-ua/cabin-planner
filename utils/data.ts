import { prisma } from "@/utils/db";

import { auth } from "@clerk/nextjs";

export const getMyEvents = async () => {
  const { userId } = await auth();

  return await prisma.event.findMany({
    where: {
      startDate: { gte: new Date() },
      users: { some: { clerkId: userId as string } },
    },
    orderBy: {
      startDate: "desc",
    },
  });
};

export const getEventById = async (id: string) => {
  return await prisma.event.findUnique({
    where: { id },
  });
};
