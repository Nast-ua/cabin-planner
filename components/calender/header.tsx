const Header = ({
  name,
  view,
  onChangeView,
  onPressNext,
  onPressPrevious,
}: {
  name: string | number;
  view: "month" | "year";
  onChangeView: (value: "month" | "year") => void;
  onPressNext: () => void;
  onPressPrevious: () => void;
}) => {
  return (
    <div className="flex flex-wrap xxs:flex-col justify-between items-center mx-1 mb-6">
      <div className="flex items-center ml-2 xxs:ml-0 xxs:mb-2">
        <div
          className="flex p-2 cursor-pointer"
          onClick={(event) => {
            event.preventDefault();
            onPressPrevious();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 380 480"
          >
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
          </svg>
        </div>

        <h4 className="mx-2 text-center min-w-[128px] select-none">{name}</h4>

        <div
          className="flex p-2 cursor-pointer"
          onClick={(event) => {
            event.preventDefault();
            onPressNext();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 320 480"
          >
            <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
          </svg>
        </div>
      </div>

      <div className="flex">
        {(["month", "year"] as ["month", "year"]).map((currentView) => (
          <div
            key={currentView}
            onClick={(e) => {
              e.preventDefault();
              onChangeView(currentView);
            }}
            className={`select-none flex flex-1 min-w-[48px] justify-center py-1 px-2 text-white opacity-60 mx-1 text-[14px] capitalize sm:min-w-[64px] sm:py-2 sm:text-md cursor-pointer rounded-md ${
              view !== currentView ? "bg-sky-700 opacity-[35%]" : "bg-sky-700"
            }`}
          >
            {currentView}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Header;
