"use client";
import useSelectDates from "@/utils/useSelectDates";
import dayjs from "dayjs";
import { DetailedHTMLProps, useState } from "react";

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
  const endOfWeek = dayjs().endOf("week");
  const defaultDate =
    type === "start"
      ? endOfWeek.subtract(2, "days").format("YYYY-MM-DD")
      : endOfWeek.format("YYYY-MM-DD");

  const [date, setDate] = useState<string>(initialDate || defaultDate);
  const { setSelectedDates } = useSelectDates();

  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setDate(e.target.value);
    setSelectedDates((prevDates) => {
      if (type === "start")
        return {
          startDate: e.target.value,
          endDate: prevDates?.endDate || null,
        };
      else
        return {
          startDate: prevDates?.endDate || null,
          endDate: e.target.value,
        };
    });
  };

  return (
    <input
      {...rest}
      type="date"
      required
      value={date}
      onChange={handleChangeDate}
      className="border-2 border-black/5 rounded-lg px-4 py-2 mt-2"
    />
  );
};

export default ControlledDateInput;
