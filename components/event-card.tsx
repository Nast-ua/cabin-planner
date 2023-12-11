import dayjs from "dayjs";

import localeData from "dayjs/plugin/localeData";
import updateLocale from "dayjs/plugin/updateLocale";
import PrimaryButton from "./primary-button";
import SecondaryButton from "./secondary-button";

dayjs.extend(localeData);
dayjs.extend(updateLocale);

dayjs.updateLocale("de", {
  monthsShort: [
    "Jan",
    "Feb",
    "Mär",
    "Apr",
    "Mai",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Okt",
    "Nov",
    "Dez",
  ],
});

const EventCard = ({
  title,
  startDate,
  endDate,
  participants,
  approved,
}: {
  title: string;
  startDate: string;
  endDate: string;
  participants: number;
  approved: boolean;
}) => {
  const start = dayjs(startDate);
  const end = dayjs(endDate);

  const months = dayjs().localeData().monthsShort();
  const weekdays = dayjs().localeData().weekdaysShort();

  const startFormatted = `${weekdays[start.get("day")]}, ${start.get("date")} ${
    months[start.get("month")]
  }`;
  const endFormatted = `${weekdays[end.get("day")]}, ${end.get("date")} ${
    months[end.get("month")]
  }`;

  return (
    <div className="flex flex-col border-2 border-black/5 rounded-lg p-2 max-w-[480px]">
      <div className="flex flex-row">
        <div className="flex max-w-[30%] xs:max-w-[40%] py-1 pr-4 border-r border-black/5">
          <div className="flex items-center bg-sky-700/30 rounded-md p-2">
            <div className="text-4 text-sky-900">{`${startFormatted} - ${endFormatted}`}</div>
          </div>
        </div>

        <div className="ml-4 my-auto p-1 flex flex-col items-start">
          <h3 className="text-xl text-left">{title}</h3>

          <p className="text-left text-black/50 text-[12px]">{`reserved for ${participants} people`}</p>

          <div
            className={`mt-1 text-[10px] ${
              approved
                ? "text-green-800 bg-green-500/60 border border-green-800"
                : "text-violet-800 bg-violet-400/60 border border-violet-800"
            } rounded-full px-2 py-1 `}
          >
            {approved ? "approved" : "request sent"}
          </div>
        </div>
      </div>

      <div className="flex xxs:flex-col-reverse items-center xxs:self-start mt-4 xxs:mt-3">
        <SecondaryButton
          label="Delete"
          gradient={["from-red-400", "to-red-400"]}
          labelColor="text-red-400"
          style="xxs:mt-1 "
        />

        <PrimaryButton label="Edit" />
      </div>
    </div>
  );
};

export default EventCard;
