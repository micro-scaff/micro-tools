import {
  useState,
  useEffect,
  useCallback
} from "react";

interface IUseService<Q, D> {
  data: D | null;
  loading: boolean;
  run: (query: Q) => Promise<D | null>;
}

export default function useService<Q, D>(fetch: (query?: Q) => Promise<D>, query?: Q, initData?: D): IUseService<Q, D> {
  const [
    data,
    setData
  ] = useState<D | null>(initData ?? null);

  const [
    loading,
    setLoading
  ] = useState(false);

  const run = useCallback((query: Q | undefined): Promise<D | null> => {
    setLoading(true);

    return new Promise((resolve, reject) => {
      fetch(query).then(res => {
        setData(res as D);
        resolve(res);
      }).catch(error => {
        setData(null);
        reject(error);
      }).finally(() => {
        return setLoading(false);
      });
    });
  }, [
    fetch
  ]);

  useEffect(() => {
    run(query);
  }, [
    run,
    query
  ]);

  return {
    data,
    loading,
    run
  };
}
