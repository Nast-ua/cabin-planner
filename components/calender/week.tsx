import useSelectDates from "@/utils/useSelectDates";
import dayjs from "dayjs";

import useActiveReservation from "@/utils/useActiveReservation";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import Day, { DayType } from "./day";
import ReservedFlag from "./reserved-flag";

dayjs.extend(isSameOrAfter);

const Week = ({
  startOfWeek,
  reservations = [
    { startDay: "20231126", duration: 4 },
    { startDay: "20231203", duration: 7 },
  ], // todo: get real data
  currentMonth,
}: {
  startOfWeek: string;
  currentMonth: number;
  reservations?: { startDay: string; duration: number }[];
}) => {
  const [activeReservation, setActiveReservation] = useActiveReservation();

  const { selectedDates, setSelectedDates, setIsError } = useSelectDates();

  const daysOfWeek = dayjs().localeData().weekdaysShort();

  const weekStart = dayjs(startOfWeek);

  // Map reserved days to the current week
  const weekdays = daysOfWeek.map((_, i) => {
    const day = dayjs(startOfWeek).add(i, "days");

    const isReserved =
      (!!reservations?.length &&
        reservations?.find(({ startDay, duration }) =>
          day.isBetween(
            dayjs(startDay),
            dayjs(startDay).add(duration, "day"),
            "days",
            "[]"
          )
        )) ||
      false;

    return {
      key: day.format("YYYYMMDD"),
      day: day.date(),
      disabled: day.isBefore(dayjs(), "day") || !!isReserved,
      highlight:
        day.get("month") !== currentMonth || day.isBefore(dayjs(), "day")
          ? "pastDay"
          : day.isSame(dayjs(), "day")
          ? "today"
          : undefined,
    };
  });

  const handlePickDates = (date: string) => {
    setIsError(null);

    // Overlap can occur only if startDate is has been already selected
    const selectedDatesOverlap = selectedDates?.startDate
      ? Boolean(
          !!reservations?.length &&
            reservations.find(({ startDay, duration }) =>
              dayjs(startDay).isBetween(
                dayjs(selectedDates.startDate),
                dayjs(date),
                null,
                "[]"
              )
            )
        )
      : false;

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
    <div className="relative flex items-center overflow-hidden sm:items-end ">
      {weekdays.map(({ key, day, disabled, highlight }) => (
        <div key={key} className="flex flex-1">
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

      {!!reservations?.length &&
        reservations.map(({ startDay, duration }) => (
          <ReservedFlag
            key={startOfWeek + startDay}
            startOfWeek={startOfWeek}
            start={startDay}
            duration={duration}
            isActive={activeReservation === startDay}
            onClick={() => setActiveReservation(startDay)}
          />
        ))}
    </div>
  );
};

export default Week;
