import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/es/storage";
// console.log(storage);

// Root Reducer
const rootReducer = combineReducers({
  user: userSlice,
});

// Persist Config
const persistConfig = {
  key: "ai-website-builder",
  version: 1,
  storage,
};

// Persisted Reducer
const persistedReducer = persistReducer(
  persistConfig,
  rootReducer
);

// Store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    }),
});

// Persistor
export const persistor = persistStore(store);

// Store Export
export default store;