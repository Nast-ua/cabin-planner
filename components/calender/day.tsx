// TODO: Refactor & abstract logic
export type DayType =
  | "eventStart"
  | "eventEnd"
  | "single"
  | "withinEvent"
  | "notCurrentMonth";

const Day = ({
  day,
  onPressDay,
  highlightType,
  disabled,
}: {
  day: number;
  onPressDay: () => void;
  highlightType?: DayType;
  disabled?: boolean;
}) => {
  // TODO: Mark selected dates with a different color
  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        !disabled && onPressDay();
      }}
      className={`relative overflow-hidden bg-white flex-auto xs:w-12 s:w-14 h-14 sm:w-[72px] sm:h-[72px] sm:rounded-none md:w-20 md:h-20 lg:w-30 lg:h-30 ${
        highlightType === "notCurrentMonth" ? "sm:bg-zinc-100/90" : ""
      }  ${
        !disabled ? "sm:hover:bg-zinc-200/90 cursor-pointer" : "cursor-default"
      }`}
    >
      <div className="hidden sm:flex sm:absolute sm:w-full sm:h-full sm:border sm:border-1 sm:border-black/5 " />

      {highlightType && highlightType !== "notCurrentMonth" && (
        <ReservedFlagLargeScreens type={highlightType} />
      )}

      {highlightType && highlightType !== "notCurrentMonth" && (
        <ReservedFlagSmallScreens type={highlightType} />
      )}

      <div
        className={`py-1 max-w-[32px] mt-[10px] m-auto rounded-full ${
          disabled
            ? "bg-white cursor-default"
            : highlightType === "single"
            ? "bg-emerald-600/70"
            : "bg-zinc-100/90 hover:bg-zinc-200/90 cursor-pointer"
        } ${
          highlightType === "notCurrentMonth" ? "opacity-30" : ""
        } sm:m-0 sm:bg-transparent sm:max-w-none`}
      >
        <p className="select-none text-center sm:text-right sm:pr-1">{day}</p>
      </div>
    </div>
  );
};

const ReservedFlagSmallScreens = ({ type }: { type?: DayType }) => {
  const style =
    type === "eventStart"
      ? "left-[20%] rounded-tl-full rounded-bl-full"
      : type === "eventEnd"
      ? "right-[20%] rounded-tr-full rounded-br-full"
      : type === "single"
      ? "hidden"
      : "";

  return (
    <div
      className={`absolute shadow-md mt-[10px] py-1 bg-emerald-600/70 w-full h-8 sm:hidden ${style}`}
    />
  );
};

const ReservedFlagLargeScreens = ({ type }: { type?: DayType }) => {
  const style = type === "eventEnd" ? "rounded-tr-md rounded-br-md" : "";

  return (
    <div
      className={`hidden shadow-md sm:absolute sm:top-[40%] sm:w-full sm:h-8 sm:flex ${
        type === "eventEnd" ? "sm:right-2" : ""
      }`}
    >
      {(type === "eventStart" || type === "single") && (
        <div className="border border-emerald-700/90 bg-emerald-700/70 w-2" />
      )}

      <div className={`bg-emerald-600/70 opacity-100 w-full ${style}`} />
    </div>
  );
};

export default Day;
