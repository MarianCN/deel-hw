import { useEffect, useState } from "react";

export interface SWCharacter {
  name: string;
}

interface Result {
  results: SWCharacter[];
}

interface DataState {
  data: SWCharacter[];
  isLoading: boolean;
  error: string | null;
}

// API used: https://swapi.dev/documentation
export const useRestApiList = (value: string) => {
  const [dataState, setDataState] = useState<DataState>({
    data: [],
    isLoading: false,
    error: null,
  });

  useEffect(() => {
    if (!value) {
      setDataState({
        data: [],
        isLoading: false,
        error: null,
      });

      return;
    }

    setDataState({
      data: [],
      isLoading: true,
      error: null,
    });

    fetch(`https://swapi.dev/api/people/?search=${value}`)
      .then((response) => response.json())
      .then((data: Result) => {
        setDataState({
          data: data.results,
          isLoading: false,
          error: null,
        });
      })
      .catch((error) => {
        setDataState({
          data: [],
          isLoading: false,
          error: error.message,
        });
      });
  }, [value]);

  return dataState;
};
