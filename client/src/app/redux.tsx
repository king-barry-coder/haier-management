"use client";

import { useRef } from "react";
import {
  configureStore,
  combineReducers,
  type Store,
} from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
  Provider,
} from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query/react";
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
import { PersistGate } from "redux-persist/integration/react";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

import globalReducer from "@/app/state";
import cartReducer from "@/app/cart/cartSlice";
import { api } from "@/app/state/api";

// Fallback for server-side rendering
const createNoopStorage = () => ({
  getItem: async (): Promise<string | null> => null,
  setItem: async (_: string, value: string): Promise<string> => value,
  removeItem: async (): Promise<void> => {},
});

const storage =
  typeof window === "undefined"
    ? createNoopStorage()
    : createWebStorage("local");

// Redux persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["global", "cart"],
};

// Combine reducers
const rootReducer = combineReducers({
  global: globalReducer,
  cart: cartReducer,
  [api.reducerPath]: api.reducer,
});

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
export const makeStore = () =>
  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(api.middleware),
  });

// Types
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// StoreProvider component
export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<Store | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
    setupListeners(storeRef.current.dispatch);
  }

  const persistor = persistStore(storeRef.current);

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}




// "use client";

// import { useRef } from "react";
// import {
//   combineReducers,
//   configureStore,
//   type Store,
// } from "@reduxjs/toolkit";
// import {
//   TypedUseSelectorHook,
//   useDispatch,
//   useSelector,
//   Provider,
// } from "react-redux";
// import globalReducer from "@/app/state";
// import cartReducer from "@/app/cart/cartSlice"; // ✅ Import your cart slice
// import { api } from "@/app/state/api";
// import { setupListeners } from "@reduxjs/toolkit/query";

// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";
// import { PersistGate } from "redux-persist/integration/react";
// import createWebStorage from "redux-persist/lib/storage/createWebStorage";

// // 🧠 Setup fallback for server
// const createNoopStorage = () => ({
//   getItem() {
//     return Promise.resolve(null);
//   },
//   setItem(_key: any, value: any) {
//     return Promise.resolve(value);
//   },
//   removeItem() {
//     return Promise.resolve();
//   },
// });

// const storage = typeof window === "undefined"
//   ? createNoopStorage()
//   : createWebStorage("local");

// // 🧠 Persist only global and cart slices (if needed)
// const persistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["global", "cart"], // ✅ Make sure 'cart' is listed
// };

// // 🧠 Combine reducers
// const rootReducer = combineReducers({
//   global: globalReducer,
//   cart: cartReducer, // ✅ Register cart slice
//   [api.reducerPath]: api.reducer,
// });

// // 🧠 Wrap in persistence
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// // 🧠 Make store
// export const makeStore = () => {
//   return configureStore({
//     reducer: persistedReducer,
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware({
//         serializableCheck: {
//           ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//         },
//       }).concat(api.middleware),
//   });
// };

// // 🧠 Types
// export type AppStore = ReturnType<typeof makeStore>;
// export type RootState = ReturnType<AppStore["getState"]>;
// export type AppDispatch = AppStore["dispatch"];
// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// // 🧠 Store Provider
// export default function StoreProvider({ children }: { children: React.ReactNode }) {
//   const storeRef = useRef<Store | null>(null);

//   if (!storeRef.current) {
//     storeRef.current = makeStore();
//     setupListeners(storeRef.current.dispatch);
//   }

//   const persistor = persistStore(storeRef.current);

//   return (
//     <Provider store={storeRef.current}>
//       <PersistGate loading={null} persistor={persistor}>
//         {children}
//       </PersistGate>
//     </Provider>
//   );
// };





