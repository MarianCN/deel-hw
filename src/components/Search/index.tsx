import { FC, useCallback, useContext, useState } from "react";

import { ApiType } from "../../types";
import { SearchInput } from "../SearchInput";
import { SearchHandler } from "../SearchHandler";
import { GlobalContext } from "../../providers/GlobalContext";
import { dataGetter } from "../../utils/dataGetter";

interface Props {
  apiType: ApiType;
}

export const Search: FC<Props> = ({ apiType }) => {
  const [inputValue, setInputValue] = useState("");

  const { setHighlightedIndex, setSearchedString, setData } =
    useContext(GlobalContext);

  // I could return the results from the useApiList hook
  // but I decided to update the context inside useApiList
  // useApiList(apiType);

  const handleSearch = useCallback(
    (value: string): void => {
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

      dataGetter(apiType, value).then((result) => {
        setData(result);
      });
    },
    [setHighlightedIndex, setSearchedString, setData, apiType]
  );

  const handleSelectItem = (value: string) => {
    // this simulates a selection of an item
    // and in production might be another search after a selection has been made
    setSearchedString("");
    setInputValue(value);
  };

  return (
    <>
      <SearchInput
        onSearch={handleSearch}
        handleSelectItem={handleSelectItem}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
      <SearchHandler handleSelectItem={handleSelectItem} />
    </>
  );
};
