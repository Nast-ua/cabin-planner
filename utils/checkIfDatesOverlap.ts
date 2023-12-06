import dayjs from "dayjs";

export default function checkIfDatesOverlap({
  start1,
  end1,
  start2,
  end2,
}: {
  start1: string;
  end1: string;
  start2: string;
  end2: string;
}) {
  return (
    dayjs(start1).isBetween(dayjs(start2), dayjs(end2), null, "[]") ||
    dayjs(end1).isBetween(dayjs(start2), dayjs(end2), null, "[]") ||
    dayjs(start2).isBetween(dayjs(start1), dayjs(end1), null, "[]")
  );
}
