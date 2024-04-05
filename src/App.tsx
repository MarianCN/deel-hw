import { useState } from "react";

import { ApiType } from "./types";
import { Search } from "./components/Search";
import { useSearch } from "./hooks/useSearch";

// I used CSS instead of SCSS for simplicity of this task
import "./styles.css";

export const App = () => {
  const [activeApi, setActiveApi] = useState<ApiType>(ApiType.MOCKED_PROMISE);
  const [inputValue, setInputValue] = useState("");

  const handleSearch = useSearch(activeApi);

  const getButtonClassName = (apiType: ApiType): string =>
    activeApi === apiType ? "active" : "";

  const handleApiChange = (apiType: ApiType) => () => {
    setActiveApi(apiType);
  };

  return (
    <div className="app">
      <div className="content">
        {/* apiChooser is for showing both Mocked and RestAPI responses */}
        <div className="apiChooser">
          <button
            className={getButtonClassName(ApiType.MOCKED_PROMISE)}
            onClick={handleApiChange(ApiType.MOCKED_PROMISE)}
          >
            Mocked Promise
          </button>
          <button
            className={getButtonClassName(ApiType.REST_API)}
            onClick={handleApiChange(ApiType.REST_API)}
          >
            Rest API
          </button>
        </div>

        <Search
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleSearch={handleSearch}
        />
      </div>
    </div>
  );
};
