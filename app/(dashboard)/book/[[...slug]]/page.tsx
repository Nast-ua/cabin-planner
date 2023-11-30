"use client";
import SecondaryButton from "@/components/secondary-button";
import SubmitButton from "@/components/submit-button";
import { handleBook } from "@/utils/actions";
import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import Link from "next/link";
import { useState } from "react";

dayjs.extend(updateLocale);
dayjs.updateLocale("en", {
  weekStart: 1,
}); // todo: Move this to a global place

const BookPage = ({
  searchParams,
}: {
  searchParams?: { startDate: string | null; endDate: string | null };
}) => {
  const endOfWeek = dayjs().endOf("week");

  const [startDate, setStartDate] = useState(
    searchParams?.startDate ||
      endOfWeek.subtract(2, "days").format("YYYY-MM-DD")
  );

  return (
    <div>
      <h4 className="text-lg">Fill out the form & book your weekend!</h4>

      <form className="flex flex-col mt-4 max-w-[480px]">
        <label htmlFor="name" className="text-[12px] pl-1">
          Name
        </label>

        <input
          name="name"
          id="name"
          type="text"
          required
          placeholder="Your Name"
          className="border-2 border-black/5 rounded-lg px-4 py-2 mt-1 mb-4"
        />

        <label htmlFor="family-tree-select" className="text-[12px] pl-1">
          Select a Family Tree
        </label>

        <select
          name="family-tree-names"
          id="family-tree-select"
          required
          className="border-2 border-black/5 rounded-lg px-4 py-2 mt-2 mb-4 appearance-none
          bg-chevron-down bg-no-repeat bg-right-4 bg-[length:16px_16px]"
        >
          <option value="richard">Family Richard</option>
          <option value="irmgard">Family Irmgard</option>
          <option value="eberhard">Family Eberhard</option>
          <option value="albert">Family Albert</option>
          <option value="ulrich">Family Ulrich</option>
        </select>

        <div className="flex mb-4 flex-wrap">
          <div className="flex flex-col">
            <label htmlFor="from-date" className="text-[12px] pl-1">
              From
            </label>

            <input
              name="from-date"
              id="from-date"
              type="date"
              required
              value={startDate}
              onChange={(e) => {
                e.preventDefault();
                setStartDate(e.target.value);
              }}
              className="border-2 border-black/5 rounded-lg px-4 py-2 mt-2"
            />
          </div>

          <div className="flex flex-col ml-2 mb-4 xxs:ml-0 xxs:mt-4">
            <label htmlFor="to-date" className="text-[12px] pl-1">
              To
            </label>

            <input
              name="to-date"
              id="to-date"
              type="date"
              required
              defaultValue={
                searchParams?.endDate || endOfWeek.format("YYYY-MM-DD")
              }
              className="border-2 border-black/5 rounded-lg px-4 py-2 mt-2"
            />
          </div>
          {/* <ControlledDateInput
              type="start"
              initialDate={searchParams?.startDate}
            /> */}
        </div>

        <div className="flex xxs:flex-col items-center xxs:justify-center xxs:self-center">
          <Link
            href={{
              pathname: "/availability",
              query: {
                initialDate: startDate,
              },
            }}
          >
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
