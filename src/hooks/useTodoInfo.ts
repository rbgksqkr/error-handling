import { useEffect, useState } from "react";
import { Todo } from "../types";
import { getTodo } from "../apis/todo";

const cache: Record<number, { data?: Todo; promise?: Promise<void> }> = {};

export const useTodoInfo = (id: number) => {
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

// const useTodoInfo = (id: number): Todo => {
//   if (!cache[id]) {
//     const promise = getTodo(id).then((data) => {
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
