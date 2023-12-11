import EventCard from "@/components/event-card";
import { getMyEvents } from "@/utils/data";

const MyEventsPage = async () => {
  const myEvents = await getMyEvents();

  const firstYear = myEvents?.[0].startDate.getFullYear();
  const lastYear = myEvents?.[myEvents.length - 1].startDate.getFullYear();

  let eventsByYear: { [key: string]: typeof myEvents } = { [firstYear]: [] };

  for (let year = firstYear; year <= lastYear; year++) {
    myEvents?.forEach((event) => {
      if (event?.startDate.getFullYear() === year)
        eventsByYear[year] = [...eventsByYear[year], event];
    });
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="mb-6">My Events Page</div>

      <div className="flex py-2 border-l ml-7 xs:ml-0 xs:border-0 xs:py-0">
        <div className="flex-1 flex-col ">
          {Object.entries(eventsByYear).map(([year, events]) =>
            events.map(
              (
                { id, name, startDate, endDate, participants, approved },
                index
              ) => (
                <div
                  key={id}
                  className={`flex xs:flex-col ${index > 0 ? "mt-8" : ""}`}
                >
                  {index === 0 ? (
                    <div className="flex max-w-[60px] mr-3 -ml-7 -mt-2 xs:mt-0 xs:mb-2 xs:mx-auto bg-white self-center">
                      <div className="bg-slate-100/25 px-1 py-2 flex text-xl ">
                        {year}
                      </div>
                    </div>
                  ) : (
                    <div className="w-[60px] mr-3 -ml-7 xs:hidden" />
                  )}

                  <EventCard
                    title={name}
                    startDate={startDate.toString()}
                    endDate={endDate.toString()}
                    participants={participants}
                    approved={approved}
                  />
                </div>
              )
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default MyEventsPage;
