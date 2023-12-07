"use client";
import checkIfDatesOverlap from "@/utils/checkIfDatesOverlap";
import useSelectDates from "@/utils/useSelectDates";
import dayjs from "dayjs";
import { DetailedHTMLProps, useCallback } from "react";
import ErrorMessage from "./error-message";

export type ControlledDateInputProps = {
  type: "start" | "end";
} & Omit<
  DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  "type | required | value | onChange | className"
>;

const ControlledDateInput = ({ type, ...rest }: ControlledDateInputProps) => {
  const { selectedDates, setSelectedDates, isError, setIsError } =
    useSelectDates();

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

    if (
      type === "start" &&
      selectedDates?.endDate &&
      dayjs(e.target.value).isAfter(dayjs(selectedDates?.endDate))
    )
      setIsError("start-date-less-than-end-date");
    else if (
      type === "end" &&
      selectedDates?.startDate &&
      dayjs(e.target.value).isBefore(dayjs(selectedDates?.startDate))
    )
      setIsError("end-date-less-than-start-date");

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

    console.log(
      selectedDatesOverlap,
      selectedDates?.startDate,
      selectedDates?.endDate,
      e.target.value
    );

    if (selectedDatesOverlap) setIsError("dates-reserved");
  };

  const showError =
    (type === "start" && isError === "start-date-less-than-end-date") ||
    (type === "end" && isError === "end-date-less-than-start-date");

  return (
    <div>
      <input
        {...rest}
        type="date"
        min={dayjs().startOf("day").format("YYYY-MM-DD")}
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
          showError ? "border-red-300" : "border-black/5"
        } rounded-lg px-4 py-2 mt-2`}
      />

      {showError && (
        <ErrorMessage
          text="The start date should be earlier than the end date."
          className="max-w-[168px] pl-2 -mb-[36px]"
        />
      )}
    </div>
  );
};

export default ControlledDateInput;
