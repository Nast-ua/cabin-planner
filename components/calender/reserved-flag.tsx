import useActiveReservation from "@/utils/useActiveReservation";
import useClickOutside from "@/utils/useClickOutside";
import dayjs from "dayjs";
import { useCallback } from "react";

const ReservedFlag = ({
  startOfWeek,
  start,
  duration,
  isActive,
  onClick,
}: {
  startOfWeek: string;
  start: string;
  duration: number;
  isActive?: boolean;
  onClick?: () => void;
}) => {
  const [, setActiveReservation] = useActiveReservation();

  const handleClickOutside = useCallback(
    (id?: string) => !id?.startsWith("reserved") && setActiveReservation(null),
    [setActiveReservation]
  );

  const ref = useClickOutside(handleClickOutside);

  const weekStart = dayjs(startOfWeek);
  const weekEnd = weekStart.endOf("week");

  const reservationStart = dayjs(start);
  const reservationEnd = dayjs(start).add(duration, "days");

  if (
    reservationStart.isBetween(weekStart, weekEnd, "days", "[]") ||
    reservationEnd.isBetween(
      weekStart,
      weekStart.endOf("week"),
      "days",
      "[]"
    ) ||
    (weekStart.isBetween(reservationStart, reservationEnd, "days", "[]") &&
      weekEnd.isBetween(reservationStart, reservationEnd, "days", "[]"))
  ) {
    const daysDiff = reservationStart.diff(weekStart, "day");

    const daysDuration =
      weekEnd.diff(reservationEnd, "days") <= 0
        ? reservationEnd.diff(weekStart, "days")
        : duration;

    const left = [
      "left-[calc(100%/7*-1)]",
      "left-[calc(100%/7*0)]",
      "left-[calc(100%/7*1)]",
      "left-[calc(100%/7*2)]",
      "left-[calc(100%/7*3)]",
      "left-[calc(100%/7*4)]",
      "left-[calc(100%/7*5)]",
      "left-[calc(100%/7*6)]",
    ];

    const width = [
      "w-[calc(100%/7*0.9)]",
      "w-[calc(100%/7*1.9)]",
      "w-[calc(100%/7*2.9)]",
      "w-[calc(100%/7*3.9)]",
      "w-[calc(100%/7*4.9)]",
      "w-[calc(100%/7*5.9)]",
      "w-[calc(100%/7*6.9)]",
      "w-[calc(100%/7*7.9)]",
      "w-[120%]",
    ];

    return (
      <div
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          onClick && onClick();
        }}
        className={`absolute ${left[daysDiff < 0 ? 0 : daysDiff + 1]} ${
          width[
            daysDiff < 0 && daysDuration <= 6
              ? daysDuration + 1
              : daysDuration > 6
              ? width.length - 1
              : daysDuration
          ]
        } shadow-md xs:shadow-md h-9 xs:h-7 bg-emerald-600/80 active:bg-emerald-700/80 
        ${
          isActive
            ? "bg-emerald-800/70 border border-emerald-800/70"
            : "bg-emerald-600/80"
        } rounded-lg focus:outline-none focus:ring-2 focus:ring-inset focus:ring-zinc-900/90
        sm:shadow-lg sm:rounded-md pl-4 sm:bottom-[7%] cursor-pointer hover:opacity-70`}
      >
        <p
          id={`reserved${start}`}
          className="hidden truncate sm:block mt-[6px] "
        >
          Event Dolor...
        </p>
      </div>
    );
  }
};

export default ReservedFlag;
