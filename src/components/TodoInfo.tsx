import { useTodoInfo } from "../hooks/useTodoInfo";

const TodoInfo = () => {
  console.log("TodoInfo render");

  const { data: todo } = useTodoInfo(2);

  if (!todo) {
    return <div>TodoInfo Loading...</div>;
  }

  return (
    <div>
      <div>{todo?.title}</div>
    </div>
  );
};

export default TodoInfo;
