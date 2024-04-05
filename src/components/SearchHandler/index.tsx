import { FC, useContext } from "react";

import { GlobalContext } from "../../providers/GlobalContext";
import { Item } from "./Item";

import "./styles.css";

interface Props {
  handleSelectItem: (value: string) => void;
}

export const SearchHandler: FC<Props> = ({ handleSelectItem }) => {
  const { data, highlightedIndex, searchedString } = useContext(GlobalContext);

  const { results, isLoading, error } = data;

  // The styling here can be improved by adding a gray hover background to the Item, and removing highlightedIndex.
  // This would be better than adding a mouseEnter/mouseLeave handler for each Item.
  const handleClick = (value: string): void => {
    handleSelectItem(value);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!searchedString) {
    return null;
  }

  if (results.length === 0) {
    return <p>No results found</p>;
  }

  return (
    <div className="searchHandler">
      {results.map((item, index) => (
        <Item
          highlighted={highlightedIndex === index}
          key={item.name}
          value={item.name}
          onClick={handleClick}
        />
      ))}
    </div>
  );
};
