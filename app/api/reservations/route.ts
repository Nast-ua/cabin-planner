import { getUserByClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";
import dayjs from "dayjs";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const user = await getUserByClerkID();

  if (!user) throw new Error("user-not-found");

  const searchParams = request.nextUrl.searchParams;
  const month = searchParams.get("month");
  const year = searchParams.get("year");

  let where = {};

  if (month && year) {
    const from = dayjs()
      .set("year", parseInt(year))
      .set("month", parseInt(month))
      .startOf("month");
    const to = from.endOf("month");

    where = {
      startDate: { gte: from.subtract(1, "month").toDate() },
      endDate: { lte: to.add(1, "month").toDate() },
    };
  }

  try {
    const reservations = await prisma.event.findMany({
      where,
      orderBy: {
        startDate: "asc",
      },
    });

    return Response.json({ data: reservations });
  } catch (e) {
    console.log(e);
  }
}
