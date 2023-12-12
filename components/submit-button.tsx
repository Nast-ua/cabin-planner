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

  const { isError } = useSelectDates();

  return (
    <PrimaryButton
      isLoading={pending}
      disabled={pending}
      label={isError === "dates-reserved" ? "Join" : "Book"}
      {...rest}
    />
  );
};

export default SubmitButton;
