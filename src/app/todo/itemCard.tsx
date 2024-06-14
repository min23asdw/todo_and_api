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
        console.log('start couter')
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
  }, []);

  return (
    <button className=" bg-slate-400" onClick={onClick}>
      <div>
        {item.name}
        {item.type}
        {count ? ":t" : ":f"}
      </div>
    </button>
  );
}
