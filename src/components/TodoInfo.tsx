import { useEffect, useState } from "react";

interface Todo {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
}

const TodoInfo = ({ id }: { id: number }) => {
  console.log("TodoInfo render");
  const { data, isLoading } = useTodoInfo(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>{data?.title}</div>
    </div>
  );
};

export default TodoInfo;

const getTodo = async (id: number) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
  const data = await res.json();
  return data;
};

const useTodoInfo = (id: number) => {
  const [data, setData] = useState<Todo>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        setIsLoading(true);
        const user = await getTodo(id);

        if (!ignore) {
          setData(user);
        }

        setIsLoading(false);
      } catch (err) {
        const error = err as Error;
        setError(error.message);
      }
    };

    let ignore = false;
    fetchTodo();
    return () => {
      ignore = true;
    };
  }, [id]);

  return { data, isLoading, error };
};
