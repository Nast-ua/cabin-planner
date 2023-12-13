"use client";
import dayjs from "dayjs";

import { deleteReservation } from "@/utils/actions";
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
  id,
  title,
  startDate,
  endDate,
  participants,
  approved,
  style,
}: {
  title: string;
  startDate: string;
  endDate: string;
  participants: number;
  approved?: boolean;
  id?: string;
  style?: string;
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
    <div
      className={`flex-1  flex-col border-2 border-black/5 rounded-lg px-4 pt-2 pb-3 ${style}`}
    >
      <div className="flex flex-row xxs:flex-col">
        <div className="flex max-w-[35%] xs:max-w-[50%] xxs:max-w-full py-2 xxs:pb-4 pr-4 xxs:pr-0 border-r xxs:border-r-0 xxs:border-b border-black/5">
          <div className="flex flex-1 justify-center items-center bg-sky-700/30 rounded-md p-2 ">
            <div className="text-center text-4 text-sky-900">{`${startFormatted} - ${endFormatted}`}</div>
          </div>
        </div>

        <div className="ml-4 py-2 my-auto flex flex-col items-start relative xxs:ml-0">
          <h3 className="text-xl text-left xxs:max-w-[53%]">{title}</h3>

          <p className="text-left text-black/50 text-[12px] xxs:max-w-[53%]">{`reserved for ${participants} people`}</p>

          {approved !== undefined && (
            <div
              className={`mt-1 text-[10px] ${
                approved
                  ? "text-green-800 bg-green-500/60 border border-green-800"
                  : "text-violet-800 bg-violet-400/60 border border-violet-800"
              } rounded-full px-2 py-1 xxs:absolute xxs:right-0 xxs:max-w-[40%] xxs:rounded-lg xxs:text-center`}
            >
              {approved ? "approved" : "request sent"}
            </div>
          )}
        </div>
      </div>

      {id && (
        <div className="flex xxs:flex-col-reverse items-center xxs:self-center mt-4 xxs:mt-3">
          <SecondaryButton
            size="small"
            label="Delete"
            gradient={["from-red-400", "to-red-400"]}
            labelColor="text-red-400"
            style="xxs:mt-1 mr-4"
            onClick={async () => deleteReservation(id)}
          />

          <PrimaryButton size="small" label="Edit" />
        </div>
      )}
    </div>
  );
};

export default EventCard;
