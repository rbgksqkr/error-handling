import { useEffect, useState } from "react";
import { getUser } from "../apis/user";
import { User } from "../types";

const cache: Record<number, { data?: User; promise?: Promise<void> }> = {};

export const useUserInfo = (id: number) => {
  const [data, setData] = useState<User>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const user = await getUser(id);

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
    fetchUser();
    return () => {
      ignore = true;
    };
  }, [id]);

  return { data, isLoading, error };
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
