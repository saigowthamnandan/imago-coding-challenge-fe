import { twMerge } from "tailwind-merge";

type SelectProps = {
  displayKey: string;
  displayValue: string;
  options: { displayKey: string; displayValue: string }[];
  onChange: (value: string) => void;
  name: string;
  value: string;
  className?: string;
};

export default function Select({
  options,
  onChange,
  name,
  displayKey,
  displayValue,
  className,
  value,
}: SelectProps) {
  return (
    <select
      defaultValue={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      className={twMerge(
        `w-full text-black border border-gray-400 focus:border-gray-600 hover:border-gray-500 px-3 py-2 rounded  disabled:bg-stone-100  focus:outline-none`,
        className
      )}
    >
      <option value="" disabled className="text-xs p-0">
        {name}
      </option>
      {options?.length > 0 &&
        options.map((option: { [key: string]: string }, i) => {
          return option[displayKey] ? (
            <option
              // selected={option[displayValue] === value}
              value={option[displayValue]}
              key={`${i}${option[displayValue]}`}
            >
              {option[`${displayKey}`]}{" "}
            </option>
          ) : null;
        })}
    </select>
  );
}
