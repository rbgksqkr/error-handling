import useFetch from "../hooks/useFetch";
import Post from "./Post";

export const User = ({ id }: { id: number }) => {
  const [data, isPending, error, reload] = useFetch(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );

  if (isPending) return <div>로딩중...</div>;
  if (error) return <div>에러 발생!</div>;

  return (
    <div>
      <button onClick={() => reload()}>Refresh user</button>
      <h2>{data.name}</h2>
      <p>Email: {data.email}</p>
      <h3>Posts</h3>
      <Post userId={id} />
    </div>
  );
};
