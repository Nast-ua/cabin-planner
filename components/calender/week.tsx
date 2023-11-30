import useSelectDates from "@/utils/useSelectDates";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import localeData from "dayjs/plugin/localeData";
import updateLocale from "dayjs/plugin/updateLocale";
import utc from "dayjs/plugin/utc";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekday from "dayjs/plugin/weekday";
import Day, { DayType } from "./day";

dayjs.extend(weekday);
dayjs.extend(utc);
dayjs.extend(weekOfYear);
dayjs.extend(localeData);
dayjs.extend(isBetween);

dayjs.extend(updateLocale);
dayjs.updateLocale("en", {
  months: [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ],
  weekdaysShort: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
  weekStart: 1,
});

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

    const reservedType: DayType | undefined = reservedDates
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
      day: day.date(),
      month: day.get("month"),
      key: day.format("YYYYMMDD"),
      highlightType:
        day.get("month") !== currentMonth
          ? ("notCurrentMonth" as DayType)
          : reservedType,
      eventName: (reservedType === "eventStart" && reservedDates?.name) || null,
    };
  });

  // todo: Abstract logic
  const handlePickDates = (date: string) => {
    setIsError(false);

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

    if (
      selectedDates?.startDate &&
      selectedDates?.startDate !== date &&
      dayjs(date).isBefore(dayjs(selectedDates.startDate))
    ) {
      if (selectedDatesOverlap) {
        setSelectedDates((prevDates) => ({
          startDate: dayjs(selectedDatesOverlap.startDate)
            .add(selectedDatesOverlap.duration + 1, "days")
            .format("YYYYMMDD"),
          endDate: prevDates?.startDate!,
        }));
        setIsError(true);
      } else
        setSelectedDates((prevDates) => ({
          startDate: date,
          endDate: prevDates?.startDate!,
        }));
    } else if (selectedDatesOverlap) {
      setSelectedDates((prevDates) => ({
        ...(prevDates as { startDate: string; endDate: string }),
        endDate: dayjs(selectedDatesOverlap.startDate)
          .subtract(1, "days")
          .format("YYYYMMDD"),
      }));
      setIsError(true);
    } else if (selectedDates?.startDate && selectedDates?.startDate !== date) {
      setSelectedDates((prevDates) => ({
        ...(prevDates as { startDate: string }),
        endDate: prevDates?.endDate === date ? null : date,
      }));
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
    <div className="flex relative">
      {weekdays.map(({ key, day, highlightType, eventName }) => (
        <div key={key} className="relative flex flex-auto">
          <p className="hidden sm:flex sm:shrink-0 sm:z-30 w-max sm:absolute sm:left-[12px] sm:top-[40%] sm:pt-1">
            {eventName}
          </p>

          <Day
            day={day}
            highlightType={
              highlightType ||
              (!highlightType &&
                ((selectedDates?.startDate &&
                selectedDates.endDate &&
                dayjs(key).isBetween(
                  dayjs(selectedDates.startDate),
                  dayjs(selectedDates.endDate),
                  null,
                  "()"
                )
                  ? "withinEvent"
                  : selectedDates?.startDate &&
                    !selectedDates.endDate &&
                    dayjs(key).isSame(dayjs(selectedDates.startDate))
                  ? "single"
                  : selectedDates?.startDate &&
                    selectedDates.endDate &&
                    dayjs(key).isSame(dayjs(selectedDates.startDate))
                  ? "eventStart"
                  : selectedDates?.endDate &&
                    dayjs(key).isSame(dayjs(selectedDates.endDate))
                  ? "eventEnd"
                  : undefined) as DayType))
            }
            disabled={
              highlightType === "eventStart" ||
              highlightType === "eventEnd" ||
              highlightType === "withinEvent"
            }
            onPressDay={() => handlePickDates(key)}
          />
        </div>
      ))}
    </div>
  );
};

export default Week;
