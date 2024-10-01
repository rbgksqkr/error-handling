import "./App.css";
import TodoInfo from "./components/TodoInfo";
import { useUserInfo } from "./hooks/useUserInfo";

// const fetchUserAndPost = async (userId: number, todoId: number) => {
//   const [user, todo] = await Promise.all([getUser(userId), getTodo(todoId)]);
//   return { user, todo };
// };

// const promise = ({ userId, todoId }: { userId: number; todoId: number }) =>
//   fetchUserAndPost(userId, todoId);

const TestApp = () => {
  const { data: user } = useUserInfo(1);

  if (!user) return <div>data loading...</div>;

  return (
    <>
      <h1>{user.name}</h1>
      <TodoInfo />
    </>
  );
};

export default TestApp;
