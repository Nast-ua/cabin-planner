"use client";
import Header from "@/components/calender/header";
import Month from "@/components/calender/month";
import Year from "@/components/calender/year";
import useSelectDates from "@/utils/useSelectDates";
import dayjs from "dayjs";
import {
  default as isBetween,
  default as isSameOrAfter,
} from "dayjs/plugin/isBetween";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

import localeData from "dayjs/plugin/localeData";
import updateLocale from "dayjs/plugin/updateLocale";
import utc from "dayjs/plugin/utc";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekday from "dayjs/plugin/weekday";

import useActiveReservation from "@/utils/useActiveReservation";
import Link from "next/link";
import { useState } from "react";
import ErrorMessage from "../error-message";
import PrimaryButton from "../primary-button";

dayjs.extend(localeData);
dayjs.extend(updateLocale);
dayjs.updateLocale("en", {
  months: [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ],
  weekdaysShort: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
  weekStart: 1,
});
dayjs.extend(weekday);
dayjs.extend(utc);
dayjs.extend(weekOfYear);
dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const Calender = ({ initialDate }: { initialDate?: string }) => {
  const { selectedDates, isError } = useSelectDates();
  const [activeReservation] = useActiveReservation();

  const [selectedView, setSelectedView] = useState<"month" | "year">("month");

  const [selectedDate, setSelectedDate] = useState(
    dayjs(initialDate || selectedDates?.startDate).format("YYYYMMDD")
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
    <div className="flex flex-col max-w-[860px]">
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

      {/* TODO: */}
      {activeReservation && (
        <div className="mt-4">
          Info about event...., 5 people, from... to... {activeReservation}
        </div>
      )}

      {!selectedDates?.startDate && !activeReservation ? (
        <div className="flex self-center mt-4">
          <PrimaryButton
            type="submit"
            disabled
            label={
              activeReservation || isError === "dates-reserved"
                ? "Request To Join"
                : "Book"
            }
          />
        </div>
      ) : (
        <Link
          href={{
            pathname: "/book",
            // query: activeReservation, // TODO: id activeReservation, pass its dates
          }}
          className="flex self-center mt-4"
        >
          <PrimaryButton
            type="submit"
            label={
              activeReservation || isError === "dates-reserved"
                ? "Request To Join"
                : "Book"
            }
          />
        </Link>
      )}
    </div>
  );
};

export default Calender;
