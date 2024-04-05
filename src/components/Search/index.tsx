import { Dispatch, FC, SetStateAction, useContext } from "react";

import { SearchInput } from "../SearchInput";
import { SearchHandler } from "../SearchHandler";
import { GlobalContext } from "../../providers/GlobalContext";

interface Props {
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  handleSearch: (value: string) => void;
}

export const Search: FC<Props> = ({
  handleSearch,
  inputValue,
  setInputValue,
}) => {
  const { setSearchedString } = useContext(GlobalContext);

  const handleSelectItem = (value: string) => {
    // this simulates a selection of an item
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
      {/* SearchHandler styling can be improved by adding a dropdown effect with absolute position */}
      <SearchHandler handleSelectItem={handleSelectItem} />
    </>
  );
};
