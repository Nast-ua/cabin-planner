"use client";
import Header from "@/components/calender/header";
import Month from "@/components/calender/month";
import Year from "@/components/calender/year";
import useSelectDates from "@/utils/useSelectDates";
import dayjs from "dayjs";
import Link from "next/link";
import { useState } from "react";
import ErrorMessage from "../error-message";
import PrimaryButton from "../primary-button";

const Calender = ({ initialDate }: { initialDate?: string }) => {
  // TODO: setIsError(null) on change route + fix calender jumping between month &year
  const { selectedDates, isError, setIsError } = useSelectDates();

  const [selectedView, setSelectedView] = useState<"month" | "year">("month");

  const [selectedDate, setSelectedDate] = useState(
    dayjs(initialDate).format("YYYYMMDD")
  );

  const months = dayjs().localeData().months();

  const handlePressNext = () => {
    setSelectedDate((date) =>
      dayjs(date)
        .add(1, selectedView === "month" ? "month" : "year")
        .format("YYYYMMDD")
    );
  };

  const handlePressPrevious = () => {
    setSelectedDate((date) =>
      dayjs(date)
        .subtract(1, selectedView === "month" ? "month" : "year")
        .format("YYYYMMDD")
    );
  };

  const handleChooseMonth = (month: number) => {
    setSelectedDate((date) => dayjs(date).month(month).format("YYYYMMDD"));
    setSelectedView("month");
  };

  const selectedMonth = dayjs(selectedDate).get("month");
  const selectedYear = dayjs(selectedDate).get("year");

  return (
    <div className="max-w-[860px]">
      <Header
        name={
          selectedView === "month"
            ? `${months[selectedMonth]} ${selectedYear}`
            : selectedYear
        }
        view={selectedView}
        onChangeView={setSelectedView}
        onPressNext={handlePressNext}
        onPressPrevious={handlePressPrevious}
      />

      {selectedView === "month" ? (
        <Month month={selectedMonth} year={selectedYear} />
      ) : (
        <Year onPressMonth={handleChooseMonth} />
      )}

      {isError === "dates-reserved" ? (
        <ErrorMessage text="Please, select dates, which do not overlap with existing event!" />
      ) : (
        <div className="h-[18px]" />
      )}

      <Link
        href={{
          pathname: "/book",
          query: selectedDates
            ? {
                startDate:
                  selectedDates.startDate &&
                  dayjs(selectedDates.startDate).format("YYYY-MM-DD"),
                endDate:
                  selectedDates.endDate &&
                  dayjs(selectedDates.endDate).format("YYYY-MM-DD"),
              }
            : undefined,
        }}
        className="flex justify-center mt-4"
      >
        <PrimaryButton
          type="submit"
          disabled={!selectedDates?.startDate}
          label="Book"
        />
      </Link>
    </div>
  );
};

export default Calender;
