import EventCard from "@/components/event-card";
import { getMyEvents } from "@/utils/data";

const MyEventsPage = async () => {
  const myEvents = await getMyEvents();

  let eventsByYear = [];

  return (
    <div className="flex flex-1 flex-col">
      <div className="mb-6">My Events Page</div>
      <div className="flex py-2 border-l ml-7">
        <div className="flex-1 flex-col ">
          {myEvents.map(
            (
              { id, name, startDate, endDate, participants, approved },
              index
            ) => (
              <div key={id} className="flex">
                {index === 0 && (
                  <div className="flex mr-3 -ml-7 -mt-2 bg-white self-center">
                    <div className="bg-slate-100/25 px-1 py-2 flex text-xl ">
                      2023
                    </div>
                  </div>
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
          )}
        </div>
      </div>
    </div>
  );
};

export default MyEventsPage;
