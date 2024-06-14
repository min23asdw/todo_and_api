"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Nav: React.FC = () => {
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path ? "text-blue-500" : "text-gray-700";

  return (
    <nav className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto p-2 flex justify-around">
        <Link href="/" className={`px-4 py-2 rounded ${isActive("/")}`}>
          Home
        </Link>
        <Link href="/todo" className={`px-4 py-2 rounded ${isActive("/todo")}`}>
          Todo
        </Link>
        <Link href="/api" className={`px-4 py-2 rounded ${isActive("/api")}`}>
          API
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
