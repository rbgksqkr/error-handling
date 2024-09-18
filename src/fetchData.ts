const dataCache: Record<string, unknown> = {};
const promiseCache: Record<string, Promise<void>> = {};

type Resolve = (value: void | PromiseLike<void>) => void;

const fetchData = <T>(url: string): T => {
  if (dataCache[url]) return dataCache[url] as T;

  if (!promiseCache[url]) {
    promiseCache[url] = new Promise((resolve) => {
      const getData = async (resolve: Resolve) => {
        const res = await fetch(url);
        const result = await res.json();
        dataCache[url] = result;
        resolve();
      };

      getData(resolve);
    });
  }

  throw promiseCache[url];
};

export default fetchData;
