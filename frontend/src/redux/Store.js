import { configureStore } from "@reduxjs/toolkit";
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
import storage from "redux-persist/lib/storage";
import bookReducer from "./BookSlice";
import userReducer from "./UserSlice"; // Kullanıcı dilimini dahil edin

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// Persisted reducers
const persistedBookReducer = persistReducer(persistConfig, bookReducer);
const persistedUserReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    book: persistedBookReducer,
    user: persistedUserReducer, // Kullanıcı dilimini Redux store'a dahil edin
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
