import { configureStore, combineReducers } from "@reduxjs/toolkit";

import userReducer from "../reducers/UserReducer";
import { persistReducer, persistStore } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
import localStorage from "redux-persist/es/storage";

const persistConfig = {
  key: "root",
  storage: localStorage,
  transforms: [
    encryptTransform({
      secretKey: process.env.REACT_APP_SECRET_KEY,
    }),
  ],
};

const mainReducer = combineReducers({
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, mainReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
