"use client";
import useQueryReservations from "@/utils/useQueryReservations";
import useSelectDates from "@/utils/useSelectDates";
import dayjs from "dayjs";
import { useState } from "react";
import ControlledDateInput from "./controlled-date-input";
import ErrorMessage from "./error-message";

function DatesInput() {
  const today = dayjs();
  const reservations = useQueryReservations({
    from: today.format("YYYY-MM-DD"),
  });

  const [validationError, setValidationError] = useState<
    "start" | "end" | null
  >(null);

  const { selectedDates } = useSelectDates();

  const endOfWeek = dayjs().endOf("week");

  const initialStartDate = (
    (selectedDates?.startDate && dayjs(selectedDates?.startDate)) ||
    endOfWeek.subtract(2, "days")
  ).format("YYYY-MM-DD");

  const initialEndDate = (
    (selectedDates?.endDate && dayjs(selectedDates?.endDate)) ||
    endOfWeek
  ).format("YYYY-MM-DD");

  const handlValidateFromInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValidationError(null);

    if (
      dayjs(event.target.value).isAfter(
        dayjs(selectedDates?.endDate || initialEndDate)
      )
    )
      setValidationError("start");
  };

  const handlValidateToInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValidationError(null);

    if (
      dayjs(event.target.value).isBefore(
        dayjs(selectedDates?.startDate || initialStartDate)
      )
    )
      setValidationError("end");
  };

  return (
    <div className="relative flex mb-6 xs:flex-col">
      <div className="flex-1 flex-col">
        <label htmlFor="startDate" className="text-[12px] pl-1">
          From
        </label>

        <ControlledDateInput
          id="startDate"
          name="startDate"
          type="start"
          reservations={reservations}
          initialDate={initialStartDate}
          onChangeDate={handlValidateFromInput}
          validationError={validationError}
        />
      </div>

      <div className="flex-1 flex-col ml-2 mb-4 xs:ml-0 xs:mt-4">
        <label htmlFor="endDate" className="text-[12px] pl-1">
          To
        </label>

        <ControlledDateInput
          id="endDate"
          name="endDate"
          type="end"
          reservations={reservations}
          initialDate={initialEndDate}
          onChangeDate={handlValidateToInput}
          validationError={validationError}
        />
      </div>

      {validationError && (
        <ErrorMessage
          text="The start date should be earlier than the end date."
          className="absolute top-[82px]"
        />
      )}
    </div>
  );
}

export default DatesInput;
