import dayjs from "dayjs";

import useActiveReservation from "@/utils/useActiveReservation";
import Week from "./week";

const Month = ({ month, year }: { month: number; year: number }) => {
  const [activeReservation] = useActiveReservation();

  const startOfMonth = dayjs().month(month).year(year).startOf("month");
  const endOfMonth = startOfMonth.endOf("month");

  const delta = startOfMonth.day() - startOfMonth.date();

  const startOfFirstWeek =
    delta > 0 ? startOfMonth.subtract(delta, "days") : startOfMonth;

  let weeks: {
    startOfWeek: string;
    key: string;
  }[] = [];

  for (
    let i = startOfFirstWeek;
    i.isSameOrBefore(endOfMonth);
    i = i.add(1, "week")
  ) {
    weeks.push({
      startOfWeek: i.format("YYYYMMDD"),
      key: i.format("YYYYMMDD"),
    });
  }

  const daysOfWeek = dayjs().localeData().weekdaysShort();

  return (
    <div>
      <div className="overflow-x-auto flex-col sm:border border-2 rounded-lg sm:overflow-clip border-black/5">
        <div className="flex flex-auto flex-row bg-white">
          {daysOfWeek.map((day, index) => (
            <div
              key={day + index.toString()}
              className="select-none flex-1 min-w-[72] py-2 sm:border sm:border-1 sm:border-black/5 text-center"
            >
              {day}
            </div>
          ))}
        </div>

        {weeks.map(({ startOfWeek, key }) => (
          <Week
            key={key}
            startOfWeek={startOfWeek}
            currentMonth={startOfMonth.get("month")}
          />
        ))}
      </div>

      {/* TODO: */}
      {activeReservation && (
        <div className="mt-4">Info about event.... {activeReservation}</div>
      )}
    </div>
  );
};

export default Month;
