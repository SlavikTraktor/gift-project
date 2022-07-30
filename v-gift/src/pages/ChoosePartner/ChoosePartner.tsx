import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import { getPartnersList } from "../../api/partner/getPartnersList";
import { PARTNERS_LIST_QUERY, PARTNER_QUERY } from "../../api/partner/partner";
import { updatePartner } from "../../api/partner/updatePartner";

export const ChoosePartner = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");

  const {data: partnersList} = useQuery([PARTNERS_LIST_QUERY], getPartnersList);

  const mutation = useMutation(updatePartner, {
    onSuccess: () => {
      queryClient.invalidateQueries([PARTNER_QUERY]);
    },
  });

  const namesFiltered = useMemo(() => {
    if (search === "" || !partnersList) {
      return [];
    }

    const newNames: string[] = [];
    for (let i = 0; i < partnersList.length; i++) {
      if (partnersList[i].toLowerCase().includes(search.toLowerCase())) {
        newNames.push(partnersList[i]);
      }
    }

    return newNames;
  }, [partnersList, search]);

  return (
    <>
      <div className="p-36">
        <h1 className="text-neutral-100 text-5xl mb-6">Выберите партнёра</h1>

        <input
          className="bg-neutral-900 border-neutral-600 text-neutral-100 px-4 py-1.5 border rounded-sm outline-none focus:border-blue-400"
          defaultValue={search}
          onChange={(v) => setSearch(v.target.value)}
          type="text"
        />
      </div>
      <div>
        {namesFiltered.map((v) => {
          return (
            <div
              key={v}
              onClick={() => mutation.mutate(v)}
              className="text-2xl duration-100 cursor-pointer hover:text-blue-400"
            >
              {v}
            </div>
          );
        })}
      </div>
    </>
  );
};
