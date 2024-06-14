import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href={"https://github.com/min23asdw/todo_and_api"}>Todo & api Github</Link>
    </main>
  );
}
