import "./App.css";
import { UserInfo } from "./components/UserInfo";

// Cache to store user data or promise
// const cache: Record<number, { data?: UserInfo; promise?: Promise<void> }> = {};

const TestApp = () => {
  console.log("TestApp render");

  return <UserInfo id={1} />;
};

export default TestApp;
