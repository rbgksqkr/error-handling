let dataCache: unknown = null;
let promiseCache: Promise<void> | null = null;

type Resolve = (value: void | PromiseLike<void>) => void;

const fetchData = <T>(url: string): T => {
  if (dataCache) return dataCache as T;

  if (!promiseCache) {
    promiseCache = new Promise((resolve) => {
      const getData = async (resolve: Resolve) => {
        const res = await fetch(url);
        const result = await res.json();
        dataCache = result;
        resolve();
      };

      getData(resolve);
    });
  }

  throw promiseCache;
};

export default fetchData;
