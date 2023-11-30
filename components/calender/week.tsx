import useSelectDates from "@/utils/useSelectDates";
import dayjs from "dayjs";

import Day, { DayType } from "./day";

const Week = ({
  startOfWeek,
  reservedDays = [
    { startDate: "20231103", duration: 5, name: "Lorem Ipsum Dolor" },
    { startDate: "20231121", duration: 2, name: "Cleaning" },
  ], // todo:
  currentMonth,
}: {
  startOfWeek: string;
  currentMonth: number;
  reservedDays?: { startDate: string; duration: number; name: string }[];
}) => {
  const { selectedDates, setSelectedDates, setIsError } = useSelectDates();

  const daysOfWeek = dayjs().localeData().weekdaysShort();

  // Map reserved days to the current week
  const weekdays = daysOfWeek.map((_, i) => {
    const day = dayjs(startOfWeek).add(i, "days");

    const reservedDates = reservedDays.find(({ startDate, duration }) => {
      return day.isBetween(
        startDate,
        dayjs(startDate).add(duration, "days"),
        null,
        "[]"
      );
    });

    const reservedType: ReservedFlagType | undefined = reservedDates
      ? reservedDates.duration === 0
        ? "single"
        : day.isSame(dayjs(reservedDates.startDate))
        ? "eventStart"
        : day.isSame(
            dayjs(reservedDates.startDate).add(reservedDates?.duration, "days")
          )
        ? "eventEnd"
        : "withinEvent"
      : undefined;

    return {
      key: day.format("YYYYMMDD"),
      day: day.date(),
      disabled: day.isBefore(dayjs(), "day") || !!reservedType,
      highlight:
        day.get("month") !== currentMonth || day.isBefore(dayjs(), "day")
          ? "pastDay"
          : day.isSame(dayjs(), "day")
          ? "today"
          : undefined,
      reservedFlagType: reservedType,
      eventName: (reservedType === "eventStart" && reservedDates?.name) || null,
    };
  });

  const handlePickDates = (date: string) => {
    setIsError(null);

    // Overlap can occur only if startDate is has been already selected
    const selectedDatesOverlap = selectedDates?.startDate
      ? reservedDays?.find(({ startDate }) => {
          return dayjs(startDate).isBetween(
            dayjs(selectedDates.startDate),
            dayjs(date),
            null,
            "[]"
          );
        })
      : null;

    if (selectedDatesOverlap) setIsError("dates-reserved");

    if (selectedDates?.startDate && date !== selectedDates?.startDate) {
      setSelectedDates((prevDates) =>
        dayjs(date).isBefore(dayjs(selectedDates.startDate))
          ? {
              ...(prevDates as { startDate: string }),
              startDate: date,
              endDate: prevDates?.startDate as string,
            }
          : {
              ...(prevDates as { startDate: string }),
              endDate: prevDates?.endDate === date ? null : date,
            }
      );
    } else if (
      selectedDates?.startDate &&
      selectedDates.endDate &&
      selectedDates?.startDate === date
    ) {
      setSelectedDates((prevDates) => ({
        ...(prevDates as { startDate: string }),
        endDate: null,
      }));
    } else
      setSelectedDates((prevDates) => ({
        ...prevDates,
        startDate: prevDates?.startDate === date ? null : date,
        endDate: null,
      }));
  };

  return (
    <div className="flex">
      {weekdays.map(({ key, day, disabled, highlight, eventName }) => (
        <div key={key} className="flex flex-1">
          <p className="hidden sm:flex sm:shrink-0 sm:z-30 w-max sm:absolute sm:left-[12px] sm:top-[40%] sm:pt-1">
            {eventName}
          </p>

          <Day
            day={day}
            highlight={
              selectedDates?.startDate === key ||
              selectedDates?.endDate === key ||
              (selectedDates?.startDate &&
                selectedDates.endDate &&
                dayjs(key).isBetween(
                  dayjs(selectedDates?.startDate),
                  dayjs(selectedDates?.endDate),
                  null,
                  "[]"
                ))
                ? "selected"
                : (highlight as DayType)
            }
            disabled={disabled}
            onPressDay={() => handlePickDates(key)}
          />
        </div>
      ))}
    </div>
  );
};

export default Week;

export type ReservedFlagType =
  | "eventStart"
  | "eventEnd"
  | "single"
  | "withinEvent"
  | "notCurrentMonth";

const ReservedFlagSmallScreens = ({ type }: { type?: ReservedFlagType }) => {
  const style =
    type === "eventStart"
      ? "left-[20%] rounded-tl-full rounded-bl-full"
      : type === "eventEnd"
      ? "right-[20%] rounded-tr-full rounded-br-full"
      : type === "single"
      ? "hidden"
      : "";

  return (
    <div
      className={`absolute shadow-md mt-[10px] py-1 bg-emerald-600/70 w-full h-8 sm:hidden ${style}`}
    />
  );
};

const ReservedFlagLargeScreens = ({ type }: { type?: ReservedFlagType }) => {
  const style = type === "eventEnd" ? "rounded-tr-md rounded-br-md" : "";

  return (
    <div
      className={`hidden shadow-md sm:absolute sm:top-[40%] sm:w-full sm:h-8 sm:flex ${
        type === "eventEnd" ? "sm:right-2" : ""
      }`}
    >
      {(type === "eventStart" || type === "single") && (
        <div className="border border-emerald-700/90 bg-emerald-700/70 w-2" />
      )}

      <div className={`bg-emerald-600/70 opacity-100 w-full ${style}`} />
    </div>
  );
};
