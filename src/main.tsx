import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import FetchCache from "./fetchCache.ts";
import { FetchCacheProvider } from "./FetchCacheProvider.tsx";

const fetchCache = new FetchCache();

createRoot(document.getElementById("root")!).render(
  <FetchCacheProvider fetchCache={fetchCache}>
    <App />
  </FetchCacheProvider>
);
