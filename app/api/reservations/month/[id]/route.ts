import { getUserByClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";
import dayjs from "dayjs";

export async function GET(
  _request: Request,
  params: { id: string } | undefined
) {
  const user = await getUserByClerkID();

  if (!user) throw new Error("user-not-found");

  const today = dayjs();

  const queryMonth = params?.id ? parseInt(params.id) : today.get("month");

  const from = today.set("month", queryMonth).startOf("month");
  const to = from.endOf("month");

  try {
    const reservations = await prisma.event.findMany({
      where: {
        startDate: { gte: from.toDate() },
        endDate: { lte: to.toDate() },
      },
      orderBy: {
        startDate: "desc",
      },
    });

    return Response.json({ data: reservations });
  } catch (e) {
    console.log(e);
  }
}
