import { useEffect } from "react";
import { TodoItem } from "./page";

interface ItemProp {
  item: TodoItem;
  count: boolean;
  onClick: () => void;
}

export default function Item(props: ItemProp) {
  const { item, count, onClick } = props;

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (count) {
      console.log("start couter");
      timeout = setTimeout(() => {
        // console.log('auto call pop')
        onClick();
      }, 5000);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [count,onClick]);

  return (
    <button
      className={`rounded ${count ? "bg-red-200" : "bg-green-200"} shadow-lg`}
      onClick={onClick}
    >
      <div className="relative py-2 px-4">
        <div className="absolute top-0 right-0 text-xs bg-gray-200 px-2 py-1 rounded">
          {item.type}
        </div>
        <div className="w-full     rounded mt-2">{item.name}</div>
      </div>
    </button>
  );
}
