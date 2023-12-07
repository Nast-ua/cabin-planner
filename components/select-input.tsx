export type SelectInputProps = {
  label: string;
  options: ({ id: string; title: string } | undefined)[];
  inputName?: string;
  inputId?: string;
  className?: string;
};

const SelectInput = ({
  label,
  options,
  inputName,
  inputId,
  className,
}: SelectInputProps) => {
  return (
    <div className={`flex flex-col ${className ?? ""}`}>
      <label htmlFor={inputId} className="text-[12px] pl-1">
        {label}
      </label>

      <select
        name={inputName}
        id={inputId}
        required
        className="border-2 border-black/5 rounded-lg px-4 py-2 mt-2 appearance-none
          bg-chevron-down bg-no-repeat bg-right-4 bg-[length:16px_16px]"
      >
        {options.map((item, index) => (
          <option
            key={item?.toString() + index.toString()}
            value={item?.id || index + 1}
          >
            {item?.title || index + 1}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
