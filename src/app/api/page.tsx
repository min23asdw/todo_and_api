"use client";
import { useEffect, useState } from "react";
import Department from "./model/department";
import Service from "./fecthData";
import { Employee, User } from "./model/user";

function ApiPage() {
  const [userData, setUserData] = useState<Employee>();

  const onClick = async () => {
    try {
      const response = await Service.fetchData();
      if (response) {
        setUserData(response);
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    console.log(userData);
    console.log(typeof userData);
  }, [userData]);

  return (
    <div className="justify-center">
      <button onClick={() => onClick()}>ดึงข้อมูล</button>
    </div>
  );
}

export default ApiPage;
