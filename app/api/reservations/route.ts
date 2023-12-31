import { prisma } from "@/utils/db";
import { auth } from "@clerk/nextjs";
import dayjs from "dayjs";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { userId } = auth();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;

  const month = searchParams.get("month");
  const year = searchParams.get("year");

  // TODO: Add server-side date validation!
  const from = searchParams.get("from");

  let where = {};

  if (month && month !== "undefined" && year && year !== "undefined") {
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

  if (from && from !== "undefined") {
    where = { ...where, startDate: { gte: new Date(from) } };
  }

  const reservations = await prisma.event.findMany({
    where,
    orderBy: {
      startDate: "asc",
    },
  });

  return Response.json({ data: reservations });
}
