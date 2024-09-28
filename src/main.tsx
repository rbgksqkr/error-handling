import { createRoot } from "react-dom/client";
import "./index.css";
import TestApp from "./TestApp.tsx";

createRoot(document.getElementById("root")!).render(<TestApp />);
