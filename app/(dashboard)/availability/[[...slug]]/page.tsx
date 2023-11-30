"use client";
import Calender from "@/components/calender/calender";
import { SelectedDateProvider } from "@/utils/useSelectDates";

const CalenderPage = ({
  searchParams,
}: {
  searchParams?: { initialDate?: string };
}) => {
  return (
    <SelectedDateProvider>
      <h4 className="text-lg mb-6">
        Select a start day of your stay and press book!
      </h4>

      <Calender initialDate={searchParams?.initialDate} />
    </SelectedDateProvider>
  );
};

export default CalenderPage;
