import { useEffect, useState } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFetch = async () => {
      setLoading(true);
      const response = await fetch(url);
      const newData = await response.json();
      setData(newData);
      setLoading(false);
    };

    getFetch();
  }, [url]);

  // console.log(data);

  return {
    data,
    loading,
  };
};
