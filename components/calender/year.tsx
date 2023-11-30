import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrBefore);

const Year = ({ onPressMonth }: { onPressMonth: (month: number) => void }) => {
  const months = dayjs().localeData().months();

  return (
    <div className="flex flex-wrap flex-1 -m-1 min-h-[324px] sm:min-h-[524px] sm:overflow-clip  ">
      {[
        months.map((month, index) => (
          <div
            key={month}
            onClick={(e) => {
              e.preventDefault();
              onPressMonth(index);
            }}
            className="flex flex-1 cursor-pointer m-1 min-w-[23%] border border-black/5 rounded-lg hover:bg-slate-200/60 hover:opacity-60"
          >
            <p className="text-center m-auto select-none">{month}</p>
          </div>
        )),
      ]}
    </div>
  );
};

export default Year;
