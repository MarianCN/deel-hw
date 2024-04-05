import { useState } from "react";

import { ApiType } from "./types";
import { Search } from "./components/Search";

// I used CSS instead of SCSS for simplicity of this task
import "./styles.css";

export const App = () => {
  const [activeApi, setActiveApi] = useState<ApiType>(ApiType.MOCKED_PROMISE);

  const getButtonClassName = (apiType: ApiType): string =>
    activeApi === apiType ? "active" : "";

  const handleApiChange = (apiType: ApiType) => () => {
    setActiveApi(apiType);
  };

  return (
    <div className="app">
      <div className="content">
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

        <Search apiType={activeApi} />
      </div>
    </div>
  );
};
