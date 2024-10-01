import { useSuspenseQuery } from "@tanstack/react-query";
import TodoInfo, { Todo } from "./TodoInfo";

const getTodo = async (id: number): Promise<Todo> => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
  const data = await res.json();
  return data;
};

const getUser = async (id: number): Promise<UserInfo> => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  const data = await res.json();
  return data;
};

// const fetchUserAndPost = async (userId: number, todoId: number) => {
//   const [user, todo] = await Promise.all([getUser(userId), getTodo(todoId)]);

//   return { user, todo };
// };

// const promise = ({ userId, todoId }: { userId: number; todoId: number }) =>
//   fetchUserAndPost(userId, todoId);

interface UserInfo {
  id: number;
  name: string;
  email: string;
}

export const UserInfo = ({ id }: { id: number }) => {
  console.log("UserInfo render");

  const { data: user } = useSuspenseQuery({
    queryKey: ["user", id],
    queryFn: () => getUser(1),
  });

  const { data: todo } = useSuspenseQuery({
    queryKey: ["todo", id],
    queryFn: () => getTodo(2),
  });

  // const result = useSuspenseQueries({
  //   queries: [
  //     { queryKey: ["user", id], queryFn: () => getUser(3) },
  //     { queryKey: ["todo", id], queryFn: () => getTodo(4) },
  //   ],
  // });

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>name: {user.name}</h1>
      <h2>Email: {user.email}</h2>
      <TodoInfo todo={todo} />
    </div>
  );
};

// const useUserInfo = (id: number): UserInfo => {
//   if (!cache[id]) {
//     const promise = getUser(id).then((data) => {
//       console.log("resolve promise");
//       cache[id] = { data };
//     });

//     console.log("throw promise");
//     cache[id] = { promise };
//     throw promise;
//   }

//   if (cache[id].promise) {
//     throw cache[id].promise;
//   }

//   console.log("return cache data", cache[id].data!);
//   return cache[id].data!;
// };

// const useUserInfo = (id: number) => {
//   const [data, setData] = useState<UserInfo>();
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         setIsLoading(true);
//         const user = await getUser(id);

//         if (!ignore) {
//           setData(user);
//         }

//         setIsLoading(false);
//       } catch (err) {
//         const error = err as Error;
//         setError(error.message);
//       }
//     };

//     let ignore = false;
//     fetchUser();
//     return () => {
//       ignore = true;
//     };
//   }, [id]);

//   return { data, isLoading, error };
// };
