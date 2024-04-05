import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";

import { useDebounce } from "../../hooks/useDebounce";
import { GlobalContext } from "../../providers/GlobalContext";

import "./styles.css";

interface Props {
  onSearch: (value: string) => void;
  handleSelectItem: (value: string) => void;
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
}

export const SearchInput: FC<Props> = ({
  onSearch,
  handleSelectItem,
  inputValue,
  setInputValue,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { highlightedIndex, setHighlightedIndex, data } =
    useContext(GlobalContext);

  const { results } = data;

  const debouncedSearch = useDebounce(onSearch, 500);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);

    debouncedSearch(e.target.value);
  };

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        // e.preventDefault() is needed to prevent the cursor from moving to the beginning or to the end of the input
        e.preventDefault();

        setHighlightedIndex((prev) =>
          // This is needed to have the highlight between 0 and results.length - 1
          prev === null ? 0 : Math.min(results.length - 1, prev + 1)
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev === null ? null : Math.max(0, prev - 1)
        );
      } else if (e.key === "Enter") {
        if (highlightedIndex !== null) {
          setInputValue(results[highlightedIndex].name);
          handleSelectItem(results[highlightedIndex].name);
        }
      }
    },
    [
      setHighlightedIndex,
      results,
      highlightedIndex,
      handleSelectItem,
      setInputValue,
    ]
  );

  useEffect(() => {
    // needed for eslint(react-hooks/exhaustive-deps)
    const _inputRef = inputRef.current;

    _inputRef?.addEventListener("keydown", onKeyDown);

    return () => {
      _inputRef?.removeEventListener("keydown", onKeyDown);
    };
  }, [inputRef, onKeyDown, setHighlightedIndex]);

  // This is needed to reset the highlighted index when the input value changes
  useEffect(() => {
    return () => {
      setHighlightedIndex(null);
    };
  }, [setHighlightedIndex]);

  return (
    <input
      ref={inputRef}
      placeholder="Search..."
      value={inputValue}
      onChange={onInputChange}
    />
  );
};
