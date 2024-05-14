import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { Api } from "../api/api";
import paintings from "../slice/paintingsSlice";

import filters from "../slice/filtersSlice";

export const store = configureStore({
  reducer: {
    paintings,
    filters,
    [Api.reducerPath]: Api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(Api.middleware),
});

setupListeners(store.dispatch);

export default store;
export type RootState = ReturnType<typeof store.getState>;
