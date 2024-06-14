import { useState, useEffect } from 'react';

interface FetchState<T> {
          data: T | null;
          loading: boolean;
          error: Error | null;
}

export default function useFetch<T>(url: string, params: Record<string, string> = {}): FetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true); 
    setError(null); 

    const queryString = new URLSearchParams(params).toString();
    const fullUrl = queryString ? `${url}&${queryString}` : url;

    fetch(fullUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(responseJson => {
        setData(responseJson.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error); 
        setLoading(false); 
      });
  }, [url , ...Object.values(params)]);

  return { data, loading, error };
}