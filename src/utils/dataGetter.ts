import { countries } from "../mocks";
import { ApiType, DataState } from "../types";

export interface ItemType {
  name: string;

  // There are more fields returned in the API response, but for this example, I'm only using the name
  [key: string]: unknown;
}

interface Result {
  results: ItemType[];
}

export const dataGetter = (
  apiType: ApiType,
  value: string
): Promise<DataState> => {
  // Here is an example of the use of a promise to handle the async data fetching,
  // and also to split the code in multiple functions to make it more readable and maintainable
  return new Promise<DataState>((resolve) => {
    if (apiType === ApiType.MOCKED_PROMISE) {
      setTimeout(() => {
        const filteredCountries = countries.filter((country) =>
          country.name.toLowerCase().includes(value.toLowerCase())
        );

        resolve({
          results: filteredCountries,
          isLoading: false,
          error: null,
        });
      }, 1000);
    } else {
      fetch(`https://swapi.dev/api/people/?search=${value}`)
        .then((response) => response.json())
        .then((data: Result) => {
          resolve({
            results: data.results,
            isLoading: false,
            error: null,
          });
        })
        .catch((error) => {
          // I could also use reject(), but in this case I'm just resolving with an error message
          resolve({
            results: [],
            isLoading: false,
            error: error.message,
          });
        });
    }
  });
};
