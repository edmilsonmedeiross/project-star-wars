import { useState } from 'react';

export default function useFetch() {
  const [data, setData] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const makeFetch = async () => {
    setIsloading(true);

    const response = await fetch('https://swapi.dev/api/planets');
    const obj = await response.json();

    const residentsExcluded = obj.results.map((pla) => {
      delete pla.residents;
      return pla;
    });
    setData(residentsExcluded);
    setIsloading(false);
  };
  return [data, makeFetch, isLoading, setData];
}
