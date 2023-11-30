import { getUserByClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";

const getMyEvents = async () => {
  const user = await getUserByClerkID({});

  const events = await prisma.event.findMany({
    where: { userId: user.id, startDate: { gte: new Date() } },
    orderBy: { startDate: "asc" },
  });
  return events;
};

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
