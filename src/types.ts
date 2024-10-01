export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Todo {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
}
