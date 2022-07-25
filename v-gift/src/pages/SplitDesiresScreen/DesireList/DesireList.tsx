import { Desire } from "./Desire/Desire";
import GridLayout from "react-grid-layout";

export interface DesireListProps {
  name: string;
  editable?: boolean;
}

const desires = ["Велосипед", "Арбуз", "Велоцираптор", "Пушка"];

export const DesireList = ({ name, editable = false }: DesireListProps) => {
  
  const layout = [
    { i: "Велосипед", x: 0, y: 0, w: 1, h: 2, static: true },
    { i: "Арбуз", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
    { i: "Велоцираптор", x: 4, y: 0, w: 1, h: 2 },
    { i: "Пушка", x: 4, y: 0, w: 1, h: 2 }
  ];

  return (
    <div className="p-2">
      <h1 className="text-3xl border-b border-neutral-700 mb-2">{name}</h1>
      <GridLayout layout={layout} style={{height: undefined}} >
        {desires.map((desire) => (
          <Desire key={desire} desire={desire} editable={editable} />
        ))}
      </GridLayout>
    </div>
  );
};
