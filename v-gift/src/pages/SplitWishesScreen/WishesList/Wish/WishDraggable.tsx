import { DensitySmall } from "@mui/icons-material";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Identifier, XYCoord } from "dnd-core";

import cx from "classnames";
import { WishType } from "@/types/Wish";
import { Wish } from "./Wish";

export interface WishDraggableProps {
  editable: boolean;
  wish: WishType;
  index: number;
  moveDnd: (dragIndex: number, hoverIndex: number) => void;
  onDrop: () => void;
  dndnamespace: string;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

export const WishDraggable = ({
  wish,
  index,
  moveDnd,
  dndnamespace,
  editable,
  onDrop,
}: WishDraggableProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: "wish" + dndnamespace,
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

      // Time to actually perform the action
      moveDnd(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
    drop: () => {
      onDrop();
    },
  });

  const [{ isDragging }, drag, dragPreview] = useDrag({
    type: "wish" + dndnamespace,
    item: () => {
      return { wish: wish.id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drop(dragPreview(ref));

  return (
    <div
      ref={ref}
      className={cx("bg-main-250 rounded m-3 p-2 flex", {
        "opacity-0": isDragging,
      })}
    >
      <div
        ref={editable ? drag : undefined}
        className={cx("flex items-center cursor-pointer", {
          "cursor-default": !editable,
        })}
        data-handler-id={editable ? handlerId : undefined}
      >
        <DensitySmall
          className={cx({
            "text-main-200": !editable,
          })}
        />
      </div>
      <Wish wish={wish} editable={editable} />
    </div>
  );
};
