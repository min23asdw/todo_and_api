"use client";
import { useEffect, useState } from "react";
import Department from "./model/department";
import Service from "./fecthData";
import { Employee, User } from "./model/user";

function ApiPage() {
  const [userData, setUserData] = useState<Employee>();

  const [displayDepartment, setDisplayDepartment] = useState<
    Map<string, Department>
  >(new Map<string, Department>());

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

  let departDict = new Map<string, Department>();
  // ใช้  HashMap เก็บ Department รวดเร็วกว่า  ไม่ต้อง loob ไล่ว่ามี Department อันนี้ในระบบรึยัง
  // โดย loop ไปทีละคน ตาม processUser  ถ้าคนนี้เป็ฯคนแรก ใส่เข้า HashMap  else ดึงค่ามาคำนวณ และใส่กลับเข้าไป
  // O(N) ?

  const processUser = () => {
    if (!userData) {
      alert("ดึงข้อมูล ก่อนนะครับ");
    }

    userData?.users.map((user, i) => {
      const userDepartment = user.company.department;
      if (!departDict.has(userDepartment)) {
        // คนนี้เป็นคนแรกของ department so -> เอาค่าคนนี้ไปใส่ก่อนน
        processUser_newDepartment(user);
      } else {
        // คนนี้เป็นคน 2.3.4 ..... ของ department so -> เปรียบเทียบค่าที่มีอยู่
        processUser_hadDepartment(user);
      }
    });

    console.log(departDict);
    setDisplayDepartment(departDict);
  };
  const processUser_newDepartment = (user: User) => {
    const frist_user: Department = {
      male: user.gender === "male" ? 1 : 0,
      female: user.gender === "female" ? 1 : 0,
      ageRange: `${user.age}-${user.age}`,
      hair: {
        [user.hair.color]: 1,
      },
      addressUser: {
        [`${user.firstName}${user.lastName}`]: user.address.postalCode,
      },
    };
    departDict.set(user.company.department, frist_user);
  };

  const processUser_hadDepartment = (user: User) => {
    const temp = departDict.get(user.company.department);
    if (temp) {
      temp.male += user.gender === "male" ? 1 : 0;
      temp.female += user.gender === "female" ? 1 : 0;
      const ageRange = temp.ageRange.split("-");

      // เปรียบเทียบ min และ max กับ อายุของคนนี้ และใช้ค่าที่น้อยกว่า
      temp.ageRange = `${
        user.age < Number(ageRange[0]) ? user.age : ageRange[0]
      }-${user.age > Number(ageRange[1]) ? user.age : ageRange[1]}`;

      temp.hair[user.hair.color] = (temp.hair[user.hair.color] || 0) + 1;

      temp.addressUser[`${user.firstName}${user.lastName}`] =
        user.address.postalCode;
      departDict.set(user.company.department, temp);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="flex justify-center gap-4 py-12">
        <button
          disabled={userData != undefined}
          className="bg-yellow-400 rounded p-2 hover:bg-yellow-500 active:bg-yellow-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          onClick={() => onClick()}
        >
          ดึงข้อมูล
        </button>
        <div className="pt-1">{"->"}</div>
        <button
          disabled={userData === undefined}
          className="bg-red-400 rounded p-2 hover:bg-red-500 active:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          onClick={() => processUser()}
        >
          process ข้อมูล
        </button>
      </div>
      <div className=" items-center w-80 mx-auto py-4">
        {/* Thank to stack overflow 🥲🥲  (เกือยจะโชว์ใน    console.log())*/}
        {Array.from(displayDepartment.entries()).map(([key, value]) => (
          <div key={key}>
            <p>{key}</p>
            <pre>{JSON.stringify(value, null, 4)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ApiPage;
