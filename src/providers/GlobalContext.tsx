import {
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { DataState } from "../types";

type HighlightedIndex = number | null;

interface GlobalContextType {
  highlightedIndex: HighlightedIndex;
  // I added here the correct type to be able to pass both value,
  // and callback function with prev value
  setHighlightedIndex: Dispatch<SetStateAction<HighlightedIndex>>;

  data: DataState;
  setData: Dispatch<SetStateAction<DataState>>;

  searchedString: string;
  setSearchedString: Dispatch<SetStateAction<string>>;
}

export const GlobalContext = createContext<GlobalContextType>({
  highlightedIndex: null,
  setHighlightedIndex: () => {},

  data: {
    results: [],
    isLoading: false,
    error: null,
  },
  setData: () => {},

  searchedString: "",
  setSearchedString: () => {},
});

export const GlobalContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [highlightedIndex, setHighlightedIndex] =
    useState<HighlightedIndex>(null);
  const [data, setData] = useState<DataState>({
    results: [],
    isLoading: false,
    error: null,
  });
  const [searchedString, setSearchedString] = useState<string>("");

  return (
    <GlobalContext.Provider
      value={{
        highlightedIndex,
        setHighlightedIndex,

        data,
        setData,

        searchedString,
        setSearchedString,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
