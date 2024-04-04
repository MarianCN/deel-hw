import { FC, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";

interface Props {
  onSearch: (value: string) => void;
}

export const SearchInput: FC<Props> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");

  const debouncedSearch = useDebounce(onSearch, 500);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);

    debouncedSearch(e.target.value);
  };

  return (
    <>
      <input placeholder="Write" value={inputValue} onChange={onInputChange} />
    </>
  );
};
