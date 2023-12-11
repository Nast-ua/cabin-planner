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
  name,
}: {
  startOfWeek: string;
  start: string;
  duration: number;
  isActive?: boolean;
  onClick?: () => void;
  name?: string;
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
      reservationStart.isSameOrAfter(weekStart, "day") &&
      reservationEnd.isSameOrBefore(weekEnd, "days")
        ? duration
        : reservationStart.isSameOrBefore(weekStart, "days")
        ? reservationEnd.diff(weekStart, "day")
        : weekEnd.diff(weekStart, "day") + 1;

    const maxIndex = 31;
    const colorIndex = Math.round(
      (parseInt(start.slice(-2), 10) / maxIndex) * COLORS.length
    );
    console.log(colorIndex);
    return (
      <div
        id={`reserved${start}`}
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          onClick && onClick();
        }}
        className={`absolute ${LEFT[daysDiff < 0 ? 0 : daysDiff + 1]} ${
          WIDTH[
            daysDiff < 0 && daysDuration <= 6
              ? daysDuration + 1
              : daysDuration > 6
              ? WIDTH.length - 1
              : daysDuration
          ]
        } shadow-md xs:shadow-md h-9 xs:h-7 
        ${
          isActive
            ? ACTIVE_STYLE[Math.min(colorIndex, maxIndex)]
            : COLORS[Math.min(colorIndex, maxIndex)]
        } rounded-lg focus:outline-none focus:ring-2 focus:ring-inset focus:ring-zinc-900/90
        sm:shadow-lg sm:rounded-md pl-4 sm:bottom-[7%] cursor-pointer hover:opacity-70`}
      >
        <p className="hidden truncate sm:block mt-[6px] ">{name}</p>
      </div>
    );
  }
};

export default ReservedFlag;

const LEFT = [
  "left-[calc(100%/7*-1)]",
  "left-[calc(100%/7*0)]",
  "left-[calc(100%/7*1)]",
  "left-[calc(100%/7*2)]",
  "left-[calc(100%/7*3)]",
  "left-[calc(100%/7*4)]",
  "left-[calc(100%/7*5)]",
  "left-[calc(100%/7*6)]",
];

const WIDTH = [
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

const COLORS = [
  "bg-emerald-600/70 active:bg-emerald-600/70 ",
  "bg-amber-600/70 active:bg-amber-600/70",
  "bg-sky-600/70 active:bg-sky-600/70",
  "bg-orange-600/70 active:bg-orange-600/70",
  "bg-red-600/70 active:bg-red-600/70",
  "bg-teal-600/70 active:bg-teal-600/70",
  "bg-stone-600/70 active:bg-stone-600/70",
  "bg-lime-600/70 active:bg-lime-600/70",
  "bg-slate-600/70 active:bg-slate-600/70",
  "bg-violet-600/70 active:bg-violet-600/70",
];

const ACTIVE_STYLE = [
  "bg-emerald-600/90 bg-emerald-600/90 border-[1.5px] border-emerald-800/90",
  "bg-amber-600/90 bg-amber-600/90 border-[1.5px] border-amber-800/90",
  "bg-sky-600/90 bg-sky-600/90 border-[1.5px] border-sky-800/90",
  "bg-orange-600/90 bg-orange-600/90 border-[1.5px] border-orange-800/90",
  "bg-red-600/90 bg-red-600/90 border-[1.5px] border-red-800/90",
  "bg-teal-600/90 bg-teal-600/90 border-[1.5px] border-teal-800/90",
  "bg-stone-600/90 bg-stone-600/90 border-[1.5px] border-stone-800/90",
  "bg-lime-600/90 bg-lime-600/90 border-[1.5px] border-lime-800/90",
  "bg-slate-600/90 bg-slate-600/90 border-[1.5px] border-slate-800/90",
  "bg-violet-600/90 bg-violet-600/90 border-[1.5px] border-violet-800/90",
];
