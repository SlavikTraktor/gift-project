import { updateWish, UpdateWishParams } from "@/api/wish/updateWish";
import { Button } from "@/components/form/Button/Button";
import { WishType } from "@/types/Wish";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";

export interface WishProps {
  editable: boolean;
  wish: WishType;
}

// function getCaretPosition(element: HTMLElement) {
//   let caretOffset = 0;
//   const doc = element.ownerDocument;
//   const win = doc.defaultView;
//   let sel;
//   if (win && typeof win.getSelection != "undefined") {
//     sel = win.getSelection();
//     if (sel && sel.rangeCount > 0) {
//       const range = sel.getRangeAt(0);
//       const preCaretRange = range.cloneRange();
//       preCaretRange.selectNodeContents(element);
//       preCaretRange.setEnd(range.endContainer, range.endOffset);
//       caretOffset = preCaretRange.toString().length;
//     }
//   } else if ((sel = (doc as any).selection) && sel.type !== "Control") {
//     const textRange = sel.createRange();
//     const preCaretTextRange = (doc as any).body.createTextRange();
//     preCaretTextRange.moveToElementText(element);
//     preCaretTextRange.setEndPoint("EndToEnd", textRange);
//     caretOffset = preCaretTextRange.text.length;
//   }
//   return caretOffset;
// }

// function setCaretPosition(element: HTMLElement, pos: number) {
//   var range = document.createRange();
//   var sel = window.getSelection();

//   range.setStart(element.childNodes[0], pos);
//   range.collapse(true);

//   sel?.removeAllRanges();
//   sel?.addRange(range);
//   element.focus();
// }

export const Wish = ({ wish, editable }: WishProps) => {
  const editableProps = useMemo(
    () => ({
      contentEditable: editable,
    }),
    [editable]
  );
  const [title, setTitle] = useState(wish.title);
  const [description, setDescription] = useState(wish.description);

  const saveWishMutation = useMutation((wishParams: UpdateWishParams) => {
    return updateWish(wishParams);
  });

  const isChanged = useMemo(() => {
    if (title !== wish.title) {
      return true;
    }
    if (description !== wish.description) {
      return true;
    }

    return false;
  }, [title, wish.title, wish.description, description]);

  const onSave = useCallback(() => {
    if (!isChanged) {
      return;
    }
    saveWishMutation.mutate({
      id: wish.id,
      title,
      description,
    });
  }, [isChanged, title, description, wish.id, saveWishMutation]);

  return (
    <div className="flex-1 text-center p-2">
      <h3
        className="mb-2 text-lg rounded outline-none focus:ring-1 focus:ring-secondary-500"
        {...editableProps}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            return;
          }
        }}
        onInput={(e) => {
          setTitle(e.currentTarget.innerHTML);
        }}
        dangerouslySetInnerHTML={{
          __html: wish.title,
        }}
      />
      <div
        className="rounded outline-none focus:ring-1 focus:ring-secondary-500"
        {...editableProps}
        onInput={(e) => {
          setDescription(e.currentTarget.innerHTML);
        }}
        dangerouslySetInnerHTML={{
          __html: wish.description,
        }}
      />

      <Button disabled={!isChanged} onClick={onSave}>
        Save
      </Button>
    </div>
  );
};
