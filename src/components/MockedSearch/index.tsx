import { FC } from "react";
import { useMockedApiList } from "../../hooks/useMockedApiList";

interface Props {
  searchedString: string;
}

export const MockedSearch: FC<Props> = ({ searchedString }) => {
  const { data, isLoading, error } = useMockedApiList(searchedString);

  return (
    <div className="asd">
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          {searchedString &&
            data.map((item) => <p key={item.name}>{item.name}</p>)}
        </div>
      )}
    </div>
  );
};
