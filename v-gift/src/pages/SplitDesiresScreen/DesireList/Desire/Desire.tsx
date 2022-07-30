import { DensitySmall } from "@mui/icons-material";
import { useEffect, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Identifier, XYCoord } from "dnd-core";

import cx from "classnames";

export interface DesireProps {
  editable: boolean;
  desire: string;
  index: number;
  moveDnd: (dragIndex: number, hoverIndex: number) => void;
  dndnamespace: string;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

export const Desire = ({ desire, index, moveDnd, dndnamespace }: DesireProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: "desire" + dndnamespace,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // console.log(dragIndex, hoverIndex);
      // Time to actually perform the action
      moveDnd(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag, dragPreview] = useDrag({
    type: "desire" + dndnamespace,
    item: () => {
      return { desire, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drop(dragPreview(ref));

  return (
    
    <div
      ref={ref}
      className={cx("border border-neutral-700 rounded m-3 p-2 flex h-56", {
        "opacity-0": isDragging,
      })}
    >
      <div
        ref={drag}
        className="w-4 flex items-center cursor-pointer"
        data-handler-id={handlerId}
      >
        <DensitySmall />
      </div>
      <div className="flex-1 text-center">{desire}</div>
    </div>
  );
};
