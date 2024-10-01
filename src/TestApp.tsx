import { Suspense } from "react";
import "./App.css";
import { UserInfo } from "./components/UserInfo";

// Cache to store user data or promise
// const cache: Record<number, { data?: UserInfo; promise?: Promise<void> }> = {};

const TestApp = () => {
  console.log("TestApp render");

  return (
    <Suspense fallback={<div>UserInfo loading...</div>}>
      <UserInfo id={1} />
    </Suspense>
  );
};

export default TestApp;
