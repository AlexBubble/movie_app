import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { appReducer } from "./reducers/appReducer/appReducer";
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
import { getPersistConfig } from "redux-deep-persist";

// создаем корневой reducer
const rootReducer = combineReducers({
  // каждый reducer отвечает за свою ветку в state
  app: appReducer,
});

// задаем конфигурацию для reducer из пакета redux-persist
const persistConfig = getPersistConfig({
  key: "root",
  storage,
  whitelist: ["app.moviesFavorites"], // указываем, что именно нужно хранить в localStorage
  rootReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// store конфигурируем через стандартную configureStore с доп. инструкциями для middleware (из-за использования redux-persist)
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// укажем собственные типы для store, state и dispatch
export type AppStore = ReturnType<typeof configureStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
