import { TodoItem } from "./page";

interface ItemProp {
  item: TodoItem;
}

export default function Item(props: ItemProp) {
  const { item } = props;
  return (
    <button className=" bg-slate-400">
      <div>
        {item.name}
        {item.type}
      </div>
    </button>
  );
}
