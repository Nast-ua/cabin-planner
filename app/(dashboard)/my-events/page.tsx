import EventCard from "@/components/event-card";
import { getMyEvents } from "@/utils/data";

const MyEventsPage = async () => {
  const myEvents = await getMyEvents();

  console.log(myEvents);
  return (
    <div className="flex flex-1 flex-col">
      My Events Page
      <EventCard />
      {myEvents.map((event) => (
        <div key={event.id}>{event.id}</div>
      ))}
    </div>
  );
};
export default MyEventsPage;
