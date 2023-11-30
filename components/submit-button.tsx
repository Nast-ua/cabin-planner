"use client";

import useSelectDates from "@/utils/useSelectDates";
import { useFormStatus } from "react-dom";
import PrimaryButton, { PrimaryButtonProps } from "./primary-button";

export type SubmitButtonProps = Omit<PrimaryButtonProps, "isLoading">;

export const SubmitButton = ({
  label,
  disabled,
  ...rest
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  const { isError } = useSelectDates();

  return (
    <PrimaryButton
      isLoading={pending}
      disabled={!!isError || pending || disabled}
      label={label}
      {...rest}
    />
  );
};

export default SubmitButton;
