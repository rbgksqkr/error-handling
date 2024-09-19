import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { fetchCacheContext } from "./contexts/fetchCacheContext";
import FetchCache from "./fetchCache";

interface FetchCacheProviderProps {
  fetchCache: FetchCache;
}

export const FetchCacheProvider = ({
  children,
  fetchCache,
}: PropsWithChildren<FetchCacheProviderProps>) => {
  // 이 상태 훅은 리렌더를 트리거할 때만 사용됩니다.
  const [, setEmptyState] = useState({});
  const rerender = useCallback(() => setEmptyState({}), []);

  // 구독자를 fetchCache에 등록하는 이펙트
  useEffect(() => {
    const unsubscribe = fetchCache.subscribe(() => rerender());

    return () => {
      unsubscribe();
    };
  }, [fetchCache, rerender]);

  return (
    <fetchCacheContext.Provider
      value={{
        fetchUrl: fetchCache.fetchUrl.bind(fetchCache),
      }}
    >
      {children}
    </fetchCacheContext.Provider>
  );
};
