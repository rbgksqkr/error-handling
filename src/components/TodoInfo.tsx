import { Todo } from "../types";

const TodoInfo = ({ todo }: { todo: Todo | null }) => {
  console.log("TodoInfo render");

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
