"use client";
import Header from "@/components/calender/header";
import Month from "@/components/calender/month";
import Year from "@/components/calender/year";
import useSelectDates from "@/hooks/useSelectDates";
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

import useActiveReservation from "@/hooks/useActiveReservation";
import useQueryReservations from "@/hooks/useQueryReservations";
import { selectReservation } from "@/utils/selectors";
import "dayjs/locale/de";
import { useRouter } from "next/navigation";
import { MouseEventHandler, useState } from "react";
import EventCard from "../event-card";
import InfoText from "../info-text";
import PrimaryButton from "../primary-button";

// TODO: Extract this to util/helpers
dayjs.locale("de");
dayjs.extend(localeData);
dayjs.extend(updateLocale);
dayjs.updateLocale("de", {
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

const Calender = () => {
  const router = useRouter();

  const { selectedDates, isError, setSelectedDates } = useSelectDates();
  const [activeReservation] = useActiveReservation();

  const [selectedView, setSelectedView] = useState<"month" | "year">("month");

  const [selectedDate, setSelectedDate] = useState(
    dayjs(selectedDates?.startDate).format("YYYYMMDD")
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

  const selectedMonth = dayjs(selectedDate || undefined).get("month");
  const selectedYear = dayjs(selectedDate || undefined).get("year");

  const reservations = useQueryReservations<
    ReturnType<typeof selectReservation> | undefined
  >(
    {
      month: selectedMonth,
      year: selectedYear,
    },
    (data) =>
      activeReservation ? selectReservation(data, activeReservation) : undefined
  ) as
    | {
        title: string;
        startDate: string;
        endDate: string;
        participants: number;
      }
    | undefined;

  const handleClickCTA: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    activeReservation &&
      reservations &&
      setSelectedDates({
        startDate: dayjs(reservations.startDate).format("YYYY-MM-DD"),
        endDate: dayjs(reservations.endDate).format("YYYY-MM-DD"),
      });

    router.push("/book");
  };

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

      {selectedView === "year" ? (
        <Year onPressMonth={handleChooseMonth} />
      ) : (
        <div className="flex flex-col">
          <Month month={selectedMonth} year={selectedYear} />

          {activeReservation && reservations && (
            <div className="mt-4">
              <EventCard {...reservations} />
            </div>
          )}

          {isError === "dates-reserved" && (
            <InfoText
              label="The dates you have selected overlap with an existing event. Do you want
            to request to join it instead?"
            />
          )}

          <div className="flex self-center mt-8">
            <PrimaryButton
              id="button"
              type="submit"
              disabled={!selectedDates?.startDate && !activeReservation}
              onClick={handleClickCTA}
              label={
                activeReservation || isError === "dates-reserved"
                  ? "Request To Join"
                  : "Book"
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Calender;
