import { useAtom } from 'jotai';
import * as React from 'react';
import { dataAtom } from '../state/core';

const useFetch = (url: string) => {
  const [data, setData] = useAtom(dataAtom);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, loading, error };
};

export default useFetch;
