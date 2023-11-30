import Calender from "@/components/calender/calender";

const CalenderPage = ({
  searchParams,
}: {
  searchParams?: { initialDate?: string };
}) => {
  return (
    <div>
      <h4 className="text-lg mb-6">
        Select a start day of your stay and press book!
      </h4>

      <Calender initialDate={searchParams?.initialDate} />
    </div>
  );
};

export default CalenderPage;
