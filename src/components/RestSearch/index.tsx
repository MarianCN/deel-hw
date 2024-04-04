import { FC } from "react";
import { useRestApiList } from "../../hooks/useRestApiList";

interface Props {
  searchedString: string;
}

export const RestSearch: FC<Props> = ({ searchedString }) => {
  const { data, isLoading, error } = useRestApiList(searchedString);

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
