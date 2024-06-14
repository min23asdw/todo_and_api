import { useEffect } from "react";
import { TodoItem } from "./page";

interface ItemProp {
  item: TodoItem;
  onClick?: () => void;
}

export default function Item(props: ItemProp) {
  const { item, onClick } = props;

  useEffect(() => {
  //...
  }, [ ])
  
  return (
    <button className=" bg-slate-400" onClick={onClick}>
      <div>
        {item.name}
        {item.type}
      </div>
    </button>
  );
}
