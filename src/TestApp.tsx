import { Suspense, useEffect, useState } from "react";
import "./App.css";

// Cache to store user data or promise
const cache: Record<number, { data?: UserInfo; promise?: Promise<void> }> = {};

const TestApp = () => {
  console.log("TestApp render");

  return (
    <Suspense fallback={<LoadingFallback />}>
      <UserInfo id={1} />
    </Suspense>
  );
};

export default TestApp;

const LoadingFallback = () => {
  return <div>로딩중...</div>;
};

const ErrorFallback = ({ error }: { error: string }) => {
  return <div>{error}</div>;
};

interface UserInfo {
  id: number;
  name: string;
  email: string;
}

export const UserInfo = ({ id }: { id: number }) => {
  console.log("UserInfo render");
  const data = useUserInfo(id);

  //   if (error) return <ErrorFallback error={error} />;

  return (
    <div>
      <h1>name: {data?.name}</h1>
      <h2>Email: {data?.email}</h2>
    </div>
  );
};

const useUserInfo = (id: number): UserInfo => {
  if (!cache[id]) {
    const promise = getUser(id).then((data) => {
      console.log("resolve promise");
      cache[id] = { data };
    });

    console.log("throw promise");
    cache[id] = { promise };
    throw promise;
  }

  if (cache[id].promise) {
    throw cache[id].promise;
  }

  console.log("return cache data", cache[id].data!);
  return cache[id].data!;
};

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

const getUser = async (id: number) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  const data = await res.json();
  return data;
};
