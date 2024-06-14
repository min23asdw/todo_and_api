"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import data from "./data.json";
import Item from "./itemCard";
export interface TodoItem {
  type: "Fruit" | "Vegetable";
  name: string;
}
export default function Todo() {
  const [todoItems, settodoItems] = useState<TodoItem[]>([]);
  const [fruitItems, setFruitItems] = useState<TodoItem[]>([]);
  const [vegetableItems, setVegetableItems] = useState<TodoItem[]>([]);

  useEffect(() => {
    const initData: TodoItem[] = data.map(
      (item: { type: string; name: string }) => ({
        type: item.type as "Fruit" | "Vegetable",
        name: item.name,
      })
    );
    settodoItems(initData);
  }, [data]);

  const ItemSorted = (
    item: TodoItem,
    from: Dispatch<SetStateAction<TodoItem[]>>,
    to: Dispatch<SetStateAction<TodoItem[]>>
  ) => {
    from((prv) => prv.filter((i) => i.name !== item.name));
    to((prv) => [...prv, item]);
    // console.log('Sorted')
  };

  const handleItemSort = (
    item: TodoItem,
    from: Dispatch<SetStateAction<TodoItem[]>>
  ) => {
    if (item.type === "Fruit") {
      ItemSorted(item, from, setFruitItems);
      // console.log('call sorted f')
    } else if (item.type === "Vegetable") {
      ItemSorted(item, from, setVegetableItems);
      // console.log('call sorted v')
    }
  };

  const ItemUnsorted = (
    item: TodoItem,
    from: Dispatch<SetStateAction<TodoItem[]>>
  ) => {
    from((prv) => prv.filter((i) => i.name !== item.name));
    settodoItems((prv) => [...prv, item]);
    // console.log('Pop')
  };
  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 p-4  w-[80%] mx-auto my-12">
        <div className="h-[600px] overflow-auto bg-slate-50 gap-4 p-4 rounded-lg shadow">
          <div className="flex flex-col gap-4">
            {todoItems.map((item) => (
              <Item
                key={item.name}
                item={item}
                count={false}
                onClick={() => handleItemSort(item, settodoItems)}
              />
            ))}
          </div>
        </div>

        <div className="h-[600px]  overflow-auto bg-slate-50 gap-4 p-4  rounded-lg shadow">
          <div>Fruit</div>
          <div className="flex flex-col gap-4">
            {fruitItems.map((item) => (
              <Item
                key={item.name}
                item={item}
                count={true}
                onClick={() => ItemUnsorted(item, setFruitItems)}
              />
            ))}
          </div>
        </div>

        <div className="h-[600px]  overflow-auto bg-slate-50   p-4  rounded-lg shadow">
          <div>Vegetable</div>
          <div className="flex flex-col gap-4">
            {vegetableItems.map((item) => (
              <Item
                key={item.name}
                item={item}
                count={true}
                onClick={() => ItemUnsorted(item, setVegetableItems)}
              />
            ))}{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
