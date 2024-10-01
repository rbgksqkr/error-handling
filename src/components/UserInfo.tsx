import { User } from "../types";

export const UserInfo = ({ user }: { user: User }) => {
  console.log("UserInfo render");

  if (!user) {
    return <div>UserInfo Loading...</div>;
  }

  return (
    <div>
      <h1>name: {user.name}</h1>
      <h2>Email: {user.email}</h2>
    </div>
  );
};
