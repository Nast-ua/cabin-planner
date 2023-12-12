import useSelectDates from "@/utils/useSelectDates";
import dayjs from "dayjs";

import checkIfDatesOverlap from "@/utils/checkIfDatesOverlap";
import { Reservation } from "@/utils/types";
import useActiveReservation from "@/utils/useActiveReservation";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import Day, { DayType } from "./day";
import ReservedFlag from "./reserved-flag";

dayjs.extend(isSameOrAfter);

const Week = ({
  startOfWeek,
  reservations,
  currentMonth,
}: {
  startOfWeek: string;
  currentMonth: number;
  reservations?: Reservation[];
}) => {
  const [activeReservation, setActiveReservation] = useActiveReservation();

  const { selectedDates, setSelectedDates, setIsError } = useSelectDates();

  const daysOfWeek = dayjs().localeData().weekdaysShort();

  // Map reserved days to the current week
  const weekdays = daysOfWeek.map((_, i) => {
    const day = dayjs(startOfWeek).add(i, "days");

    return {
      key: day.format("YYYYMMDD"),
      day: day.date(),
      disabled: day.isBefore(dayjs(), "day"),
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
    setActiveReservation(null);

    const selectedDatesOverlap =
      !!reservations?.length &&
      Boolean(
        reservations.find(({ startDate, endDate }) =>
          checkIfDatesOverlap({
            start1: startDate,
            end1: endDate,
            start2: selectedDates?.startDate || date,
            end2:
              selectedDates?.endDate === date || !selectedDates?.startDate
                ? undefined
                : date,
          })
        )
      );

    if (
      selectedDatesOverlap &&
      ((selectedDates?.endDate && selectedDates?.startDate === date) ||
        selectedDates?.startDate !== date)
    )
      setIsError("dates-reserved");

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

  const handleClickReservation = (startDate: string) => {
    setActiveReservation(startDate);
    setSelectedDates(null);
    setIsError(null);
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
        reservations.map(({ id, startDate, duration, name }) => (
          <ReservedFlag
            key={id}
            startOfWeek={startOfWeek}
            start={startDate}
            duration={duration}
            name={name}
            isActive={activeReservation === startDate}
            onClick={() => handleClickReservation(startDate)}
          />
        ))}
    </div>
  );
};

export default Week;
