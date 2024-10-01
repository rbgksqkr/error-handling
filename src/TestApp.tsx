import { useEffect, useState } from "react";
import { getTodo } from "./apis/todo";
import { getUser } from "./apis/user";
import "./App.css";
import TodoInfo from "./components/TodoInfo";
import { Todo, User } from "./types";

const fetchUserAndPost = async (userId: number, todoId: number) => {
  const [user, todo] = await Promise.all([getUser(userId), getTodo(todoId)]);
  return { user, todo };
};

const promise = ({ userId, todoId }: { userId: number; todoId: number }) =>
  fetchUserAndPost(userId, todoId);

const TestApp = () => {
  const [user, setUser] = useState<User | null>(null);
  const [todo, setTodo] = useState<Todo | null>(null);

  useEffect(() => {
    promise({ userId: 1, todoId: 2 }).then((data) => {
      setUser(data.user);
      setTodo(data.todo);
    });
  }, []);

  if (!user) return <div>data loading...</div>;

  return (
    <>
      <h1>{user.name}</h1>
      <TodoInfo todo={todo} />
    </>
  );
};

export default TestApp;
