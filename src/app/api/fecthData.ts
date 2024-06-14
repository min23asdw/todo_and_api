import { Employee } from "./model/user";

const fetchData = async (): Promise<Employee> => {
  try {
    const response = await fetch("https://dummyjson.com/users")
    const data: Employee = await response.json()
    console.log(data)
    return data
  } catch (error) {
    throw error;
  }
};

const Service = {
  fetchData,
};

export default Service;