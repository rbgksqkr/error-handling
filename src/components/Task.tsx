import fetchData from "../fetchData";

interface Todo {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
}

const Task = () => {
  const data = fetchData<Todo>("https://jsonplaceholder.typicode.com/todos/1");

  return <div>{data.title}</div>;
};

export default Task;
