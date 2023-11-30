const ErrorMessage = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  return (
    <p className={"text-red-500/80 text-[12px] pl-1 " + (className || "")}>
      {text}
    </p>
  );
};

export default ErrorMessage;
