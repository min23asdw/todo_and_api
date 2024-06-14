import { TodoItem } from "./page";

interface ItemProp {
  item: TodoItem;
  sorted?: () => void;
  unsorted?: () => void;
}

export default function Item(props: ItemProp) {
  const { item, sorted } = props;
  return (
    <button className=" bg-slate-400" onClick={sorted}>
      <div>
        {item.name}
        {item.type}
      </div>
    </button>
  );
}
