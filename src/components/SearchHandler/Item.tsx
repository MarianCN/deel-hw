import { FC, useContext, useMemo } from "react";
import { GlobalContext } from "../../providers/GlobalContext";

interface Props {
  value: string;
  highlighted: boolean;
  onClick: (value: string) => void;
}

export const Item: FC<Props> = ({ value, highlighted, onClick }) => {
  const { searchedString } = useContext(GlobalContext);

  const splittedArray = useMemo(
    () => value.toLowerCase().split(searchedString.toLowerCase()),
    [value, searchedString]
  );

  const finalPhrase = useMemo(
    () =>
      splittedArray.reduce<JSX.Element[]>((acc, curr, index) => {
        // we shouldn't use index as a key, but in this case we don't have any other unique identifier
        const regularString = <span key={index}>{curr}</span>;

        // we should not add the highlighted string before the first element
        if (index > 0) {
          const highlightedString = (
            <span className="textHighlighted" key={searchedString + index}>
              {searchedString}
            </span>
          );

          return [...acc, highlightedString, regularString];
        }

        return [...acc, regularString];
      }, []),
    [searchedString, splittedArray]
  );

  return (
    <div
      className={highlighted ? "item highlighted" : "item"}
      onClick={() => {
        onClick(value);
      }}
    >
      {finalPhrase}
    </div>
  );
};
