import EventCard from "@/components/event-card";
import { getMyEvents } from "@/utils/data";

const MyEventsPage = async () => {
  const myEvents = await getMyEvents();

  console.log(myEvents);
  return (
    <div className="flex flex-1">
      My Events Page
      <EventCard />
      {myEvents.map((event) => (
        <div key={event.id}>
          {(event.name, event.startDate, event.approved)}
        </div>
      ))}
    </div>
  );
};
export default MyEventsPage;
