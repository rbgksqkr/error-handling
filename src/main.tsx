import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import FetchCache from "./fetchCache.ts";
import { FetchCacheProvider } from "./FetchCacheProvider.tsx";
import TestApp from "./TestApp.tsx";

const fetchCache = new FetchCache();

createRoot(document.getElementById("root")!).render(
  <FetchCacheProvider fetchCache={fetchCache}>
    <TestApp />
  </FetchCacheProvider>
);
