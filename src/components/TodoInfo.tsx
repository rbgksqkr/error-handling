export interface Todo {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
}

const TodoInfo = ({ todo }: { todo: Todo }) => {
  console.log("TodoInfo render");

  if (!todo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>{todo?.title}</div>
    </div>
  );
};

export default TodoInfo;

// const getTodo = async (id: number) => {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
//   const data = await res.json();
//   return data;
// };

// const useTodoInfo = (id: number) => {
//   const [data, setData] = useState<Todo>();
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchTodo = async () => {
//       try {
//         setIsLoading(true);
//         const user = await getTodo(id);

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
//     fetchTodo();
//     return () => {
//       ignore = true;
//     };
//   }, [id]);

//   return { data, isLoading, error };
// };
