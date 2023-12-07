"use server";
import { prisma } from "@/utils/db";

import { getUserByClerkID } from "./auth";

export const getMyEvents = async () => {
  const user = await getUserByClerkID({});

  const events = await prisma.event.findMany({
    where: { userId: user.id, startDate: { gte: new Date() } },
    orderBy: { startDate: "asc" },
  });
  return events;
};
