import { Todo } from "../types";

export const getTodo = async (id: number): Promise<Todo> => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
  const data = await res.json();
  return data;
};
