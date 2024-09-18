import fetchData from "../fetchData";

interface Todo {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
}

const Task = () => {
  const data = fetchData<Todo>("https://jsonplaceholder.typicode.com/todos/1");
  const data2 = fetchData<Todo>("https://jsonplaceholder.typicode.com/todos/2");

  return (
    <div>
      <div>{data.title}</div>
      <div>{data2.title}</div>
    </div>
  );
};

export default Task;
