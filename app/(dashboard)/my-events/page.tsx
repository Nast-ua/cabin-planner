import EventCard from "@/components/event-card";
import { getMyEvents } from "@/utils/data";

const MyEventsPage = async () => {
  const myEvents = await getMyEvents();

  return (
    <div className="flex flex-1 flex-col">
      <div className="mb-6">My Events Page</div>

      <div className="px-1 mb-1">Jahr 2023</div>

      {myEvents.map(
        ({ id, name, startDate, endDate, participants, approved }) => (
          <EventCard
            key={id}
            title={name}
            startDate={startDate.toString()}
            endDate={endDate.toString()}
            participants={participants}
            approved={approved}
          />
        )
      )}
    </div>
  );
};

export default MyEventsPage;
