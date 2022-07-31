import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getDesires } from "../../../api/desire/getDesires";
import { MY_DESIRES_QUERY } from "../../../api/partner/partner";
import { Desire } from "./Desire/Desire";

export interface DesireListProps {
  name: string;
  editable?: boolean;
}

export const DesireList = ({ name, editable = false }: DesireListProps) => {
  const {data: _desires} = useQuery([MY_DESIRES_QUERY], getDesires);
  const [desires, setDesires] = useState(["Велосипед", "Арбуз", "Велоцираптор", "Пушка"]);
  const moveDnd = useCallback((dragIndex: number, hoverIndex: number) => {
      if(!_desires) return;
      const item = _desires[dragIndex];
      _desires[dragIndex] = _desires[hoverIndex];
      _desires[hoverIndex] = item;
      setDesires([..._desires]);
  }, [_desires]);


  const renderDesire = useCallback((desire: string, index: number) => {
    return <Desire
        key={desire}
        desire={desire}
        editable={editable}
        moveDnd={moveDnd}
        index={index}
        dndnamespace={name}
      />
  }, [editable, moveDnd, name]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-2">
        <h1 className="text-3xl border-b border-neutral-700 mb-2">{name}</h1>
        {desires.map((desire, i) => renderDesire(desire, i))}
      </div>
    </DndProvider>
  );
};
