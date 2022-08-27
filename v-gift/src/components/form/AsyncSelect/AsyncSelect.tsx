import { SelectOption } from "@/types/selectOption";
import AsyncSelectReactSelect from "react-select/async";

interface AsyncSelectProps {
  value?: SelectOption | null;
  onChange: (newValue: SelectOption | null) => void;
  className?: string;
  loadOptions?: (
    inputValue: string,
    callback: (options: SelectOption[]) => void
  ) => void;
}

export const AsyncSelect = ({
  className,
  value,
  onChange,
  loadOptions,
}: AsyncSelectProps) => {
  return (
    <AsyncSelectReactSelect
      className={className}
      cacheOptions
      loadOptions={loadOptions}
      value={value}
      // defaultOptions
      onChange={onChange}
    />
  );
};
