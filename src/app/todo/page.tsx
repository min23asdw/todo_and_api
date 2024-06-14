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
  };

  const handleItemSort = (
    item: TodoItem,
    from: Dispatch<SetStateAction<TodoItem[]>>
  ) => {
    if (item.type === "Fruit") {
      ItemSorted(item, from, setFruitItems);
    } else if (item.type === "Vegetable") {
      ItemSorted(item, from, setVegetableItems);
    }
  };

  const ItemUnsorted = (
    item: TodoItem,
    from: Dispatch<SetStateAction<TodoItem[]>>
  ) => {
    from((prv) => prv.filter((i) => i.name !== item.name));
    settodoItems((prv) => [...prv, item]);
  };
  return (
    <div className="min-h-screen">
      <div className=" grid grid-cols-3 gap-4 p-4 bg-slate-500">
        <div className=" bg-slate-50 flex flex-col gap-4 p-4">
          {todoItems.map((item) => (
            <Item
              key={item.name}
              item={item}
              onClick={() => handleItemSort(item, settodoItems)}
            />
          ))}
        </div>

        <div className=" bg-slate-50 flex flex-col gap-4 p-4">
          Fruit
          {fruitItems.map((item) => (
            <Item
              key={item.name}
              item={item}
              onClick={() => ItemUnsorted(item, setFruitItems)}
            />
          ))}
        </div>

        <div className=" bg-slate-50 flex flex-col gap-4 p-4">
          Vegetable
          {vegetableItems.map((item) => (
            <Item
              key={item.name}
              item={item}
              onClick={() => ItemUnsorted(item, setVegetableItems)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
