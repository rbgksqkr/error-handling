import { useEffect, useState } from "react";
import "./App.css";

const TestApp = () => {
  return <Component id={1} />;
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

export const Component = ({ id }: { id: number }) => {
  const { data, isLoading, error } = useUserInfo(id);

  if (isLoading) return <LoadingFallback />;

  if (error) return <ErrorFallback error={error} />;

  return (
    <div>
      <h1>name: {data?.name}</h1>
      <h2>Email: {data?.email}</h2>
    </div>
  );
};

const useUserInfo = (id: number) => {
  const [data, setData] = useState<UserInfo>();
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

const getUser = async (id: number) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  const data = await res.json();
  return data;
};
