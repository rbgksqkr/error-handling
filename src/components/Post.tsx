import useFetch from "../hooks/useFetch";

const Post = ({ userId }: { userId: number }) => {
  const [data, isPending, error, reload] = useFetch(
    `https://jsonplaceholder.typicode.com/users/${userId}/posts`
  );

  if (isPending) return <div>로딩중...</div>;
  if (error) return <div>에러 발생!</div>;

  return (
    <div>
      <ol style={{ width: 300, textAlign: "left", margin: "auto" }}>
        {data.map(({ title }: { title: string }) => (
          <li key={title}>{title}</li>
        ))}
      </ol>
      <button onClick={() => reload()}>Refresh posts</button>
    </div>
  );
};

export default Post;
