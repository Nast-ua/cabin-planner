import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export type SecondaryButtonProps = {
  label: string;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const SecondaryButton = ({ label, ...rest }: SecondaryButtonProps) => {
  return (
    <button
      {...rest}
      className="cursor-pointer bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-[2px] rounded-full mr-2 hover:opacity-60 xxs:flex xxs:justify-center xxs:min-w-full"
    >
      <div className="flex flex-1 bg-white text-cyan-600 px-5 py-[6px] rounded-full">
        {label}
      </div>
    </button>
  );
};

export default SecondaryButton;
