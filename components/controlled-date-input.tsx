"use client";
import useSelectDates from "@/utils/useSelectDates";
import dayjs from "dayjs";
import { DetailedHTMLProps, useCallback, useEffect, useState } from "react";
import ErrorMessage from "./error-message";

export type ControlledDateInputProps = {
  type: "start" | "end";
  initialDate?: string | null;
} & Omit<
  DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  "type | required | value | onChange | className"
>;

const ControlledDateInput = ({
  type,
  initialDate,
  ...rest
}: ControlledDateInputProps) => {
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

  const [date, setDate] = useState<string>(initialDate || defaultDate);

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

  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setIsError(null);
    setDate(e.target.value);
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
  };

  // On mount set synchronize context
  useEffect(() => {
    synchronizeSelectedDates(initialDate || defaultDate);
  }, [defaultDate, initialDate, synchronizeSelectedDates]);

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
        value={date}
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
