import ControlledDateInput from "@/components/controlled-date-input";
import SecondaryButton from "@/components/secondary-button";
import SelectInput from "@/components/select-input";
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

        <div className="flex mb-6 xs:flex-col">
          <SelectInput
            label="Select a Family Tree?"
            inputName="family-tree-names"
            inputId="family-tree-select"
            options={[
              { id: "richard", title: "Family Richard" },
              { id: "irmgard", title: "Family Irmgard" },
              { id: "eberhard", title: "Family Eberhard" },
              { id: "albert", title: "Family Albert" },
              { id: "ulrich", title: "Family Ulrich" },
            ]}
            className="flex-1"
          />

          <SelectInput
            label="How many visitors?"
            inputName="visitors"
            inputId="visitors"
            options={Array.from({ length: 13 })}
            className="ml-2 xs:ml-0 xs:mt-4 "
          />
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
