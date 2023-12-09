"use client";
import useSelectDates from "@/utils/useSelectDates";
import dayjs from "dayjs";
import { useState } from "react";
import ControlledDateInput from "./controlled-date-input";
import ErrorMessage from "./error-message";

function DatesInput() {
  const [validationError, setValidationError] = useState<
    "start" | "end" | null
  >(null);

  const { selectedDates } = useSelectDates();

  const handleValidateInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "start" | "end",
    fallbackDate: string
  ) => {
    setValidationError(null);
    if (
      type === "start" &&
      dayjs(event.target.value).isAfter(
        dayjs(selectedDates?.endDate || fallbackDate)
      )
    )
      setValidationError("start");
    else if (
      type === "end" &&
      dayjs(event.target.value).isBefore(
        dayjs(selectedDates?.startDate || fallbackDate)
      )
    )
      setValidationError("end");
  };

  return (
    <div className="relative flex mb-6 xs:flex-col">
      <div className="flex flex-col">
        <label htmlFor="from-date" className="text-[12px] pl-1">
          From
        </label>

        <ControlledDateInput
          id="startDate"
          name="startDate"
          type="start"
          onChangeDate={(...args) => handleValidateInput(...args)}
          validationError={validationError}
        />
      </div>

      <div className="flex flex-col ml-2 mb-4 xs:ml-0 xs:mt-4">
        <label htmlFor="to-date" className="text-[12px] pl-1">
          To
        </label>

        <ControlledDateInput
          id="endDate"
          name="endDate"
          type="end"
          onChangeDate={(...args) => handleValidateInput(...args)}
          validationError={validationError}
        />
      </div>

      {validationError && (
        <ErrorMessage
          text="The start date should be earlier than the end date."
          className="absolute top-[76px]"
        />
      )}
    </div>
  );
}

export default DatesInput;
