import { useContext } from "react";
import { GlobalContext } from "../providers/GlobalContext";
import { dataGetter } from "../utils/dataGetter";
import { ApiType } from "../types";

export const useSearch = (activteApi: ApiType) => {
  const { setHighlightedIndex, setSearchedString, setData } =
    useContext(GlobalContext);

  const onSearch = (value: string) => {
    setHighlightedIndex(null);
    setSearchedString(value);

    if (!value) {
      setData({
        results: [],
        isLoading: false,
        error: null,
      });

      return;
    }

    setData({
      results: [],
      isLoading: true,
      error: null,
    });

    dataGetter(activteApi, value).then((result) => {
      setData(result);
    });
  };

  return onSearch;
};
