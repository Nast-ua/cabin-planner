import { getMyEvents } from "@/utils/data";

const MyEventsPage = async () => {
  const myEvents = await getMyEvents();
  return (
    <div className="flex flex-1">
      My Events Page
      {myEvents.map((event) => (
        <div key={event.id}>
          {(event.name, event.startDate, event.approved)}
        </div>
      ))}
    </div>
  );
};
export default MyEventsPage;
