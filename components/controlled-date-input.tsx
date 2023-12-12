"use client";
import checkIfDatesOverlap from "@/utils/checkIfDatesOverlap";
import useSelectDates from "@/utils/useSelectDates";
import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import { DetailedHTMLProps, useCallback } from "react";

import { Reservation } from "@/utils/types";
import "dayjs/locale/de";

dayjs.locale("de");
dayjs.extend(updateLocale);
dayjs.updateLocale("de", {
  weekStart: 1,
});

export type ControlledDateInputProps = {
  type: "start" | "end";
  reservations: Reservation[];
  initialDate: string;
  validationError?: "start" | "end" | null;
  onChangeDate?: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & Omit<
  DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  "type" | "required" | "value" | "onChange" | "className"
>;

const ControlledDateInput = ({
  type,
  reservations,
  initialDate,
  validationError,
  onChangeDate,
  ...rest
}: ControlledDateInputProps) => {
  const { selectedDates, setSelectedDates, setIsError } = useSelectDates();

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
    synchronizeSelectedDates(e.target.value);

    onChangeDate && onChangeDate(e);

    const selectedDatesOverlap =
      !!reservations?.length &&
      Boolean(
        reservations.find(({ startDate, endDate }) =>
          checkIfDatesOverlap({
            start1: startDate,
            end1: endDate,
            start2:
              type === "start"
                ? e.target.value
                : selectedDates?.startDate || initialDate,
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
              initialDate
            : (selectedDates?.endDate &&
                dayjs(selectedDates.endDate).format("YYYY-MM-DD")) ||
              initialDate
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
