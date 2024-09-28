import { useEffect, useState } from "react";
import TodoInfo, { Todo } from "./TodoInfo";

const getTodo = async (id: number) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
  const data = await res.json();
  return data;
};

const getUser = async (id: number) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  const data = await res.json();
  return data;
};

const fetchUserAndPost = async (userId: number, todoId: number) => {
  const [user, todo] = await Promise.all([getUser(userId), getTodo(todoId)]);

  return { user, todo };
};

const promise = ({ userId, todoId }: { userId: number; todoId: number }) =>
  fetchUserAndPost(userId, todoId);

interface UserInfo {
  id: number;
  name: string;
  email: string;
}

export const UserInfo = ({ id }: { id: number }) => {
  console.log("UserInfo render");

  const [user, setUser] = useState<UserInfo | null>(null);
  const [todo, setTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    promise({ userId: id, todoId: 2 }).then((data) => {
      setUser(data.user);
      setTodo(data.todo);
      setIsLoading(false);
    });
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>name: {user?.name}</h1>
      <h2>Email: {user?.email}</h2>
      <TodoInfo todo={todo} />
    </div>
  );
};
