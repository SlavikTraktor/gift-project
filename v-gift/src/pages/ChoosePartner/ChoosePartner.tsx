import { searchPartners } from "@/api/partner/searchPartners";
import { AsyncSelect } from "@/components/form/AsyncSelect/AsyncSelect";
import { SelectOption } from "@/types/selectOption";
import { useCallback, useState } from "react";

export const ChoosePartner = () => {
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
          }))
        );
      });
    },
    []
  );

  return (
    <>
      <div className="p-36">
        <h1 className="text-5xl mb-6">Выберите партнёра</h1>

        <AsyncSelect
          className="w-1/2 m-auto"
          value={value}
          onChange={onChange}
          loadOptions={loadOptions}
        />
      </div>
    </>
  );
};
