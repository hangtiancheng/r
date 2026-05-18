import { useState, type ChangeEvent, type ReactNode } from "react";
import Base from "../base";

interface IProps {
  isChanging?: boolean;
  header: ReactNode;
  itemList: string[];
  setItemList: (newItemList: string[]) => void;
}

function Index(props: IProps) {
  const { isChanging = false, header, itemList, setItemList } = props;

  const [newItem, setNewItem] = useState("");

  const handleChangeNewItem = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewItem(e.target.value);
  };

  const handleAddItem = () => {
    if (newItem.trim() === "") {
      return;
    }
    setItemList([...itemList, newItem]);
    setNewItem("");
  };

  const handleChangeItem = (
    e: ChangeEvent<HTMLTextAreaElement>,
    idx: number,
  ) => {
    const updatedItemList = [...itemList];
    updatedItemList[idx] = e.target.value;
    setItemList(updatedItemList);
  };

  const handleRemoveItem = (idx: number) => {
    const updatedItemList = [...itemList];
    updatedItemList.splice(idx, 1);
    setItemList(updatedItemList);
  };

  return (
    <Base header={header}>
      {isChanging ? (
        <ul className="space-y-2">
          <li className="grid gap-2 sm:grid-cols-[1fr_auto]">
            <textarea
              className="textarea textarea-ghost textarea-sm w-full"
              value={newItem}
              placeholder="newItem"
              onChange={handleChangeNewItem}
            />
            <button
              className="btn btn-primary btn-sm w-full sm:w-24"
              onClick={handleAddItem}
            >
              add
            </button>
          </li>
          {itemList.map((item, idx) => (
            <li key={idx} className="grid gap-2 sm:grid-cols-[1fr_auto]">
              <textarea
                className="textarea textarea-ghost textarea-sm w-full"
                value={item}
                placeholder="skill"
                onChange={(e) => handleChangeItem(e, idx)}
              />
              <button
                className="btn btn-outline btn-secondary btn-sm w-full sm:w-24"
                onClick={() => handleRemoveItem(idx)}
              >
                remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="ml-5 list-disc space-y-1 text-sm">
          {itemList.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      )}
    </Base>
  );
}

export default Index;
