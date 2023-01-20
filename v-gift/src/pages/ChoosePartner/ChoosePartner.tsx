import { searchPartners } from "@/api/partner/searchPartners";
import { AsyncSelect } from "@/components/form/AsyncSelect/AsyncSelect";
import { SelectOption } from "@/types/selectOption";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import * as ls from "local-storage";
import { choosePartner } from "@/api/partner/updatePartner";
import { PARTNER_NAME_LS } from "@/constants/ls";
import { useNavigate } from "react-router-dom";
import { Routes } from "@/constants/routes";

export const ChoosePartner = () => {
  const [value, setValue] = useState<SelectOption | null>(null);

  const navigate = useNavigate();

  const choosePartnerMutation = useMutation(
    async ({ partnerName }: { partnerName: string }) => {
      return await choosePartner(partnerName);
    },
    {
      onSuccess: (res) => {
        ls.set(PARTNER_NAME_LS, res.data.name);
        navigate(Routes.HOME);
      },
    },
  );

  const onChange = useCallback(
    (newVal: SelectOption | null) => {
      setValue(newVal);

      newVal && choosePartnerMutation.mutate({ partnerName: newVal.label });
    },
    [choosePartnerMutation],
  );

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
