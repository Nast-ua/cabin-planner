"use client";
import checkIfDatesOverlap from "@/utils/checkIfDatesOverlap";
import useSelectDates from "@/utils/useSelectDates";
import dayjs from "dayjs";
import { DetailedHTMLProps, useCallback } from "react";

export type ControlledDateInputProps = {
  type: "start" | "end";
  validationError?: "start" | "end" | null;
  onChangeDate?: (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "start" | "end",
    fallbackDate: string
  ) => void;
} & Omit<
  DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  "type | required | value | onChange | className"
>;

const ControlledDateInput = ({
  type,
  validationError,
  onChangeDate,
  ...rest
}: ControlledDateInputProps) => {
  const { selectedDates, setSelectedDates, setIsError } = useSelectDates();

  const endOfWeek = dayjs().endOf("week");

  const defaultDate =
    type === "start"
      ? (
          (selectedDates?.startDate && dayjs(selectedDates?.startDate)) ||
          endOfWeek.subtract(2, "days")
        ).format("YYYY-MM-DD")
      : (
          (selectedDates?.endDate && dayjs(selectedDates?.endDate)) ||
          endOfWeek
        ).format("YYYY-MM-DD");

  const synchronizeSelectedDates = useCallback(
    (date: string) =>
      setSelectedDates((prevDates) => {
        if (type === "start")
          return {
            startDate: dayjs(date).format("YYYYMMDD"),
            endDate: prevDates?.endDate || null,
          };
        else
          return {
            startDate: prevDates?.startDate || null,
            endDate: dayjs(date).format("YYYYMMDD"),
          };
      }),
    [setSelectedDates, type]
  );

  // TODO: fetch reserved dates
  const reservations = [
    { startDay: "20231203", endDay: "20231210", duration: 7 },
    { startDay: "20231213", endDay: "20231219", duration: 6 },
    { startDay: "20231219", endDay: "20231220", duration: 1 },
  ];

  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setIsError(null);
    synchronizeSelectedDates(e.target.value);

    onChangeDate && onChangeDate(e, type, defaultDate);

    const selectedDatesOverlap =
      !!reservations?.length &&
      Boolean(
        reservations.find(({ startDay, endDay }) =>
          checkIfDatesOverlap({
            start1: startDay,
            end1: endDay,
            start2:
              type === "start"
                ? e.target.value
                : selectedDates?.startDate || defaultDate,
            end2: type === "end" ? e.target.value : undefined,
          })
        )
      );

    if (selectedDatesOverlap) setIsError("dates-reserved");
  };

  return (
    <div className="flex-1">
      <input
        {...rest}
        type="date"
        min={
          type === "end"
            ? dayjs(selectedDates?.startDate || undefined).format("YYYY-MM-DD")
            : dayjs().startOf("day").format("YYYY-MM-DD")
        }
        max={
          (type === "start" &&
            selectedDates?.endDate &&
            dayjs(selectedDates.endDate).format("YYYY-MM-DD")) ||
          undefined
        }
        required
        value={
          type === "start"
            ? (selectedDates?.startDate &&
                dayjs(selectedDates.startDate).format("YYYY-MM-DD")) ||
              defaultDate
            : (selectedDates?.endDate &&
                dayjs(selectedDates.endDate).format("YYYY-MM-DD")) ||
              defaultDate
        }
        onChange={handleChangeDate}
        className={`border-2 ${
          validationError === type ? "border-red-300" : "border-black/5"
        } rounded-lg px-4 py-2 mt-2 w-full`}
      />
    </div>
  );
};

export default ControlledDateInput;
