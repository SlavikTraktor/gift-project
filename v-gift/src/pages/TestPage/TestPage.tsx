import { AsyncSelect } from "@/components/form/AsyncSelect/AsyncSelect";
import { useCallback, useState } from "react";
import { searchPartners } from "@/api/partner/searchPartners";
import { SelectOption } from "@/types/selectOption";

export const TestPage = () => {
  const [value, setValue] = useState<SelectOption | null>(null);

  const onChange = useCallback((newVal: SelectOption | null) => {
    setValue(newVal);
  }, []);

  const loadOptions = useCallback(
    (inputValue: string, callback: (options: SelectOption[]) => void) => {
      searchPartners(inputValue).then((res) => {
        callback(
          res.data.users.map((v) => ({
            value: v.id,
            label: v.name,
          })),
        );
      });
    },
    [],
  );

  return (
    <div className="w-9/12 m-auto pt-5">
      <AsyncSelect
        className="w-1/2 m-auto"
        value={value}
        onChange={onChange}
        loadOptions={loadOptions}
      />
    </div>
  );
};
