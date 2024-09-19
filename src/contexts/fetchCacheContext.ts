import { createContext } from "react";

type Status = "pending" | "fulfilled" | "rejected";

interface FetchCacheContext {
  fetchUrl: (url: string, refetch: boolean) => { status: Status };
}

export const fetchCacheContext = createContext<FetchCacheContext | null>(null);
