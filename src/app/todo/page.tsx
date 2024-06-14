"use client";
import { useEffect, useState } from "react";
import data from "./data.json";
interface TodoItem {
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
      {todoItems.map((item) => (
        <div>{item.name}</div>
      ))}
    </div>
  );
}
