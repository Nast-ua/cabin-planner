import DatesInput from "@/components/dates-input";
import SecondaryButton from "@/components/secondary-button";
import SelectInput from "@/components/select-input";
import SubmitButton from "@/components/submit-button";
import { createReservation } from "@/utils/actions";

import Link from "next/link";

const BookPage = () => {
  return (
    <div>
      <h4 className="text-lg">Fill out the form & book your weekend!</h4>

      <form className="flex flex-col mt-6 max-w-[480px]">
        <label htmlFor="name" className="text-[12px] pl-1">
          Your Name
        </label>

        <input
          name="name"
          id="name"
          type="text"
          autoComplete="name"
          required
          placeholder="Your Name"
          className="border-2 border-black/5 rounded-lg px-4 py-2 mt-1 mb-6"
        />

        <div className="flex mb-6 xs:flex-col">
          <SelectInput
            label="Select a Family Tree?"
            inputName="family-tree"
            inputId="family-tree"
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
            inputName="participants"
            inputId="participants"
            options={Array.from({ length: 13 })}
            className="ml-2 xs:ml-0 xs:mt-4 "
          />
        </div>

        <DatesInput />

        <div className="flex xxs:flex-col items-center xxs:justify-center xxs:self-center">
          <Link href={{ pathname: "/availability" }}>
            <SecondaryButton
              value="check-availability"
              type="submit"
              label="Check Availability"
            />
          </Link>

          <SubmitButton value="book" formAction={createReservation} />
        </div>
      </form>
    </div>
  );
};

export default BookPage;
