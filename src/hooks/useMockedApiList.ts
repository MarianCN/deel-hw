import { useEffect, useState } from "react";

export interface Country {
  name: string;
}

const countries = [
  {
    name: "Moldova",
  },
];
interface DataState {
  data: Country[];
  isLoading: boolean;
  error: string | null;
}

export const useMockedApiList = (value: string) => {
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

    setTimeout(() => {
      const filteredCountries = countries.filter((country) =>
        country.name.toLowerCase().includes(value.toLowerCase())
      );

      setDataState({
        data: filteredCountries,
        isLoading: false,
        error: null,
      });
    }, 1000);
  }, [value]);

  return dataState;
};
