"use client";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export type SecondaryButtonProps = {
  label: string;
  gradient?: [string, string];
  labelColor?: string;
  style?: string;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const SecondaryButton = ({
  label,
  gradient,
  labelColor,
  style,
  ...rest
}: SecondaryButtonProps) => {
  return (
    <button
      {...rest}
      className={`cursor-pointer bg-gradient-to-r ${
        gradient ? gradient[0] : "from-cyan-500"
      } ${
        gradient ? gradient[1] : "to-blue-500"
      } text-white p-[2px] rounded-full mr-2 xxs:mr-0 hover:opacity-60 xxs:flex xxs:justify-center xxs:min-w-full ${style}`}
    >
      <div
        className={`flex-1 bg-white text-center ${
          labelColor ?? "text-cyan-600"
        } px-[46px] py-[6px] rounded-full`}
      >
        {label}
      </div>
    </button>
  );
};

export default SecondaryButton;
