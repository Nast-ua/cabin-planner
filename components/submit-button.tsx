"use client";

import useSelectDates from "@/utils/useSelectDates";
import { useFormStatus } from "react-dom";
import PrimaryButton, { PrimaryButtonProps } from "./primary-button";

export type SubmitButtonProps = Omit<
  PrimaryButtonProps,
  "isLoading" | "label" | "disabled" | "onClick"
>;

export const SubmitButton = ({ ...rest }: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  const { isError, setSelectedDates } = useSelectDates();

  return (
    <PrimaryButton
      isLoading={pending}
      disabled={(!!isError && isError !== "dates-reserved") || pending}
      label={isError === "dates-reserved" ? "Join" : "Book"}
      // onClick={() => setSelectedDates(null)}
      {...rest}
    />
  );
};

export default SubmitButton;
