export type DayType = "pastDay" | "today" | "selected";

const Day = ({
  day,
  onPressDay,
  disabled,
  highlight,
}: {
  day: number;
  onPressDay: () => void;
  highlight?: "pastDay" | "today" | "selected";
  disabled?: boolean;
}) => {
  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        !disabled && onPressDay();
      }}
      className={`flex w-full items-center justify-center sm:justify-start sm:items-start xs:min-w-[40px] xs:min-h-[40px] s:min-h-[54px] sm:min-w-[72px] sm:min-h-[72px] sm:border sm:border-black/5 md:min-w-20 md:min-h-20 lg:min-w-30 lg:min-h-30  ${
        highlight === "selected"
          ? "sm:bg-zinc-200/90"
          : highlight === "pastDay"
          ? "sm:bg-zinc-100/90"
          : highlight === "today"
          ? "sm:bg-sky-700/50 "
          : "sm:bg-white"
      }  ${
        !disabled ? "sm:hover:bg-zinc-200/90 cursor-pointer" : "cursor-default"
      }`}
    >
      <div
        className={`flex items-center justify-center min-w-[36px] min-h-[36px] xs:min-w-[28px] xs:min-h-[28px]  rounded-full ${
          disabled
            ? "bg-white cursor-default"
            : "bg-zinc-100/90 hover:bg-zinc-200/90 cursor-pointer"
        } ${
          highlight === "selected"
            ? "border-2 border-zinc-300/90 bg-zinc-300/80 hover:opacity-70 sm:border-none"
            : highlight === "pastDay"
            ? "opacity-30"
            : highlight === "today"
            ? "bg-sky-700/50"
            : "bg-zinc-100/90"
        }  sm:bg-transparent`}
      >
        <p className="select-none text-center sm:text-right sm:pr-1">{day}</p>
      </div>
    </div>
  );
};

export default Day;
