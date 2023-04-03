import { deleteWish } from "@/api/wish/deleteWish";
import { updateWish, UpdateWishParams } from "@/api/wish/updateWish";
import { IconButton } from "@/components/form/IconButton/IconButton";
import { WISHES_QUERY } from "@/constants/api";
import { WishType } from "@/types/Wish";
import { DeleteForever, SaveOutlined } from "@mui/icons-material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import cx from "classnames";
import { Loader } from "@/components/common/Loader";
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
  const queryClient = useQueryClient();

  const editableProps = useMemo(
    () => ({
      contentEditable: editable,
    }),
    [editable],
  );
  const [wishInit, setWishInit] = useState({ ...wish });
  const [title, setTitle] = useState(wishInit.title);
  const [description, setDescription] = useState(wishInit.description);

  const saveWishMutation = useMutation(
    async (wishParams: UpdateWishParams) => {
      return await updateWish(wishParams);
    },
    {
      onSuccess: () => {
        setWishInit((_wishInit) => ({ ..._wishInit, title, description }));
      },
    },
  );

  const deleteWishMutation = useMutation(
    async (wishId: number) => {
      return await deleteWish(wishId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([WISHES_QUERY]);
      },
    },
  );

  const isChanged = useMemo(() => {
    if (title !== wishInit.title) {
      return true;
    }
    if (description !== wishInit.description) {
      return true;
    }
    return false;
  }, [title, wishInit.title, wishInit.description, description]);

  const onSave = useCallback(() => {
    if (!isChanged) {
      return;
    }

    saveWishMutation.mutate({
      id: wishInit.id,
      title,
      description,
    });
  }, [isChanged, title, description, wishInit.id, saveWishMutation]);

  const onDelete = useCallback(() => {
    deleteWishMutation.mutate(wishInit.id);
  }, [wishInit.id, deleteWishMutation]);

  return (
    <div className="flex-1 text-center p-2">
      <h3
        className="mb-2 text-lg rounded outline-none focus:ring-1 focus:ring-secondary-500"
        {...editableProps}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
        onInput={(e) => {
          setTitle(e.currentTarget.innerHTML);
        }}
        dangerouslySetInnerHTML={{
          __html: wishInit.title,
        }}
      />
      <div
        className="rounded outline-none focus:ring-1 focus:ring-secondary-500"
        {...editableProps}
        onInput={(e) => {
          setDescription(e.currentTarget.innerHTML);
        }}
        dangerouslySetInnerHTML={{
          __html: wishInit.description,
        }}
      />

      {editable && (
        <div className="flex justify-end mt-2">
          {isChanged && (
            <div>
              <Loader
                className={cx({
                  "opacity-0": !saveWishMutation.isLoading,
                  "opacity-100": saveWishMutation.isLoading,
                })}
              />
              <IconButton
                disabled={!isChanged || saveWishMutation.isLoading}
                onClick={onSave}
              >
                <SaveOutlined />
              </IconButton>
            </div>
          )}
          <IconButton onClick={onDelete}>
            <DeleteForever />
          </IconButton>
        </div>
      )}
    </div>
  );
};
