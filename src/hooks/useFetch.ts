import { useContext } from "react";
import { fetchCacheContext } from "../contexts/fetchCacheContext";

const useFetch = (url: string) => {
  const { fetchUrl } = useContext(fetchCacheContext);
  const state = fetchUrl(url);
  const isPending = state.status === "pending";
  const error = state.reason;
  const data = state.value;

  // 데이터 새로 고침 허용
  const reload = () => fetchUrl(url, true);

  return [data, isPending, error, reload];
};

export default useFetch;
