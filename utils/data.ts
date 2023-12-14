import { prisma } from "@/utils/db";
import { getUserByClerkID } from "./auth";

export const getMyEvents = async () => {
  try {
    const user = await getUserByClerkID();

    return await prisma.event.findMany({
      where: {
        startDate: { gte: new Date() },
        userId: user!.id,
      },
      orderBy: {
        startDate: "asc",
      },
    });
  } catch (e) {
    // TODO: Add error handling
    console.log(e);
  }
};

export const getEventById = async (id: string) => {
  try {
    const user = await getUserByClerkID();

    return await prisma.event.findUnique({
      where: {
        userId_id: {
          id,
          userId: user!.id,
        },
      },
    });
  } catch (e) {
    // TODO: Add error handling
    console.log(e);
  }
};
