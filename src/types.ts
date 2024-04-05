import { ItemType } from "./utils/dataGetter";

export enum ApiType {
  MOCKED_PROMISE = "mocked_promise",
  REST_API = "rest_api",
}

export interface DataState {
  results: ItemType[];
  isLoading: boolean;
  error: string | null;
}
