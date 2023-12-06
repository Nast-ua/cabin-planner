import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export type PrimaryButtonProps = {
  label: string;
  isLoading?: boolean;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const PrimaryButton = ({
  label,
  disabled,
  isLoading,
  ...rest
}: PrimaryButtonProps) => {
  return (
    <button
      className={`cursor-pointer relative ${
        disabled
          ? "bg-slate-500/60 cursor-default"
          : "bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer"
      } text-white text-center px-12 py-2 rounded-full  hover:opacity-60 xxs:mt-2 xxs:flex xxs:justify-center xxs:min-w-full`}
      {...rest}
    >
      {isLoading && (
        <svg
          className="animate-spin h-5 w-5 left-4 top-[24%] absolute"
          viewBox="0 0 24 24"
        >
          <path
            d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
            opacity=".25"
            className="fill-white"
          />
          <path
            className="fill-white"
            opacity=".7"
            d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"
          />
        </svg>
      )}
      {label}
    </button>
  );
};

export default PrimaryButton;
