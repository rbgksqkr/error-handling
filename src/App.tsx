import "./App.css";
import Task from "./components/Task";
import CustomSuspense from "./CustomSuspense";

const App = () => {
  return (
    <CustomSuspense fallback={<div>Loading...</div>}>
      <Task />
    </CustomSuspense>
  );
};

export default App;
