export interface Todo {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
}

const TodoInfo = ({ todo }: { todo: Todo | null }) => {
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
