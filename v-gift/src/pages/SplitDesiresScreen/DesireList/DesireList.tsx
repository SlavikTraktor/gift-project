import { useCallback, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Desire } from "./Desire/Desire";

export interface DesireListProps {
  name: string;
  editable?: boolean;
}

export const DesireList = ({ name, editable = false }: DesireListProps) => {
  const [desires, setDesires] = useState(["Велосипед", "Арбуз", "Велоцираптор", "Пушка"]);
  const moveDnd = useCallback((dragIndex: number, hoverIndex: number) => {
      const item = desires[dragIndex];
      desires[dragIndex] = desires[hoverIndex];
      desires[hoverIndex] = item;
      setDesires([...desires]);
  }, [desires]);


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
