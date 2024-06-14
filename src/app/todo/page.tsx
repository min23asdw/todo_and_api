"use client";
import { useEffect, useState } from "react";
import data from "./data.json";
import Item from "./itemCard";
export interface TodoItem {
  type: string;
  name: string;
}
export default function Todo() {
  const [todoItems, settodoItems] = useState<TodoItem[]>([]);
  const [fruitItems, setFruitItems] = useState<TodoItem[]>([]);
  const [vegetableItems, setVegetableItems] = useState<TodoItem[]>([]);

  useEffect(() => {
    settodoItems(data);
  }, [data]);

  return (
    <div className="min-h-screen">
      <div className=" grid grid-cols-3 gap-4 p-4 bg-slate-500">
        <div className=" bg-slate-50 flex flex-col gap-4 p-4">
          {todoItems.map((item) => (
            <Item item={item} />
          ))}
        </div>

        <div className=" bg-slate-50">
          Fruit
          {fruitItems.map((item) => (
            <div>{item.name}</div>
          ))}
        </div>

        <div className=" bg-slate-50">
          Vegetable
          {vegetableItems.map((item) => (
            <div>{item.name}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
