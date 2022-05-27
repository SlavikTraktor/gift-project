import React, { useEffect, useMemo, useState } from "react";

const names = ["Слава", "Вика", "Дима", "Антон", "Алиса", "Вероника"];

export const ChoosePartner = () => {
  const [search, setSearch] = useState("");
  
  
  const namesFiltered = useMemo(() => {
    if(search === "") {
        return [];
    }

    const newNames: string[] = [];
    for(let i =0; i < names.length; i++) {
        if(names[i].toLowerCase().includes(search.toLowerCase())) {
            newNames.push(names[i]);
        }
    }

    return newNames;
  }, [search]);

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
        {/* {names} */}
        {namesFiltered.map((v) => {
          return (
            <div key={v} className="text-2xl duration-100 cursor-pointer hover:text-blue-400">
              {v}
            </div>
          );
        })}
      </div>
    </>
  );
};
