"use client";

import { useFormStatus } from "react-dom";
import PrimaryButton, { PrimaryButtonProps } from "./primary-button";

export type SubmitButtonProps = Omit<PrimaryButtonProps, "isLoading">;

export const SubmitButton = ({
  label,
  disabled,
  ...rest
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <PrimaryButton
      isLoading={pending}
      disabled={pending || disabled}
      label={label}
      {...rest}
    />
  );
};

export default SubmitButton;
