import ControlledDateInput from "@/components/controlled-date-input";
import SecondaryButton from "@/components/secondary-button";
import SubmitButton from "@/components/submit-button";
import { handleBook } from "@/utils/actions";

import Link from "next/link";

const BookPage = ({
  searchParams,
}: {
  searchParams?: { startDate: string | null; endDate: string | null };
}) => {
  return (
    <div>
      <h4 className="text-lg">Fill out the form & book your weekend!</h4>

      <form className="flex flex-col mt-6 max-w-[480px]">
        <label htmlFor="name" className="text-[12px] pl-1">
          Name
        </label>

        <input
          name="name"
          id="name"
          type="text"
          required
          placeholder="Your Name"
          className="border-2 border-black/5 rounded-lg px-4 py-2 mt-1 mb-6"
        />

        <label htmlFor="family-tree-select" className="text-[12px] pl-1">
          Select a Family Tree
        </label>

        <select
          name="family-tree-names"
          id="family-tree-select"
          required
          className="border-2 border-black/5 rounded-lg px-4 py-2 mt-2 mb-6 appearance-none
          bg-chevron-down bg-no-repeat bg-right-4 bg-[length:16px_16px]"
        >
          <option value="richard">Family Richard</option>
          <option value="irmgard">Family Irmgard</option>
          <option value="eberhard">Family Eberhard</option>
          <option value="albert">Family Albert</option>
          <option value="ulrich">Family Ulrich</option>
        </select>

        <div className="flex mb-6 xs:flex-col">
          <div className="flex flex-1 flex-col">
            <label htmlFor="family-tree-select" className="text-[12px] pl-1">
              Select a Family Tree
            </label>

            <select
              name="family-tree-names"
              id="family-tree-select"
              required
              className="border-2 border-black/5 rounded-lg px-4 py-2 mt-2 appearance-none
          bg-chevron-down bg-no-repeat bg-right-4 bg-[length:16px_16px]"
            >
              <option value="richard">Family Richard</option>
              <option value="irmgard">Family Irmgard</option>
              <option value="eberhard">Family Eberhard</option>
              <option value="albert">Family Albert</option>
              <option value="ulrich">Family Ulrich</option>
            </select>
          </div>

          <div className="flex flex-col sm:mt-0 ml-2 xs:ml-0 xs:mt-4">
            <label htmlFor="family-tree-select" className="text-[12px] pl-1">
              How many visitors?
            </label>

            <select
              name="visitors"
              id="visitors"
              required
              className="border-2 border-black/5 rounded-lg px-4 py-2 mt-2 appearance-none
          bg-chevron-down bg-no-repeat bg-right-4 bg-[length:16px_16px]"
            >
              {Array.from({ length: 13 }).map((_, index) => (
                <option key={index.toString()} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex mb-6 xs:flex-col">
          <div className="flex flex-col">
            <label htmlFor="from-date" className="text-[12px] pl-1">
              From
            </label>

            <ControlledDateInput type="start" />
          </div>

          <div className="flex flex-col ml-2 mb-4 xs:ml-0 xs:mt-4">
            <label htmlFor="to-date" className="text-[12px] pl-1">
              To
            </label>

            <ControlledDateInput type="end" />
          </div>
        </div>

        <div className="flex xxs:flex-col items-center xxs:justify-center xxs:self-center">
          <Link href={{ pathname: "/availability" }}>
            <SecondaryButton
              value="check-availability"
              type="submit"
              label="Check Availability"
            />
          </Link>

          <SubmitButton value="book" label="Book" formAction={handleBook} />
        </div>
      </form>
    </div>
  );
};

export default BookPage;
