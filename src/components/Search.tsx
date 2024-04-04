import { FC, useCallback, useState } from "react";
import { SearchInput } from "./SearchInput";
import { ApiType } from "../types";
import { RestSearch } from "./RestSearch";
import { MockedSearch } from "./MockedSearch";

interface Props {
  apiType: ApiType;
}

export const Search: FC<Props> = ({ apiType }) => {
  const [searchedString, setSearchedString] = useState<string>("");

  const handleSearch = useCallback((value: string): void => {
    setSearchedString(value);
  }, []);

  return (
    <>
      <SearchInput onSearch={handleSearch} />

      {apiType === ApiType.REST_API && (
        <RestSearch searchedString={searchedString} />
      )}
      {apiType === ApiType.MOCKED_PROMISE && (
        <MockedSearch searchedString={searchedString} />
      )}
    </>
  );
};
