import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // localStorage
import { persistReducer, persistStore } from "redux-persist";

import quickViewReducer from "./features/quickView-slice";
import cartReducer from "./features/cart-slice";
import wishlistReducer from "./features/wishlist-slice";
import productDetailsReducer from "./features/product-details";

import { TypedUseSelectorHook, useSelector } from "react-redux";

// دمج الريدوكسات في reducer واحد
const rootReducer = combineReducers({
  quickViewReducer,
  cartReducer,
  wishlistReducer,
  productDetailsReducer,
});

// إعدادات redux-persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cartReducer", "wishlistReducer"], // خزّن cart و wishlist فقط
};

// دمج التخزين مع rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// إنشاء الـ store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // لتفادي التحذيرات من redux-persist
    }),
});

// إنشاء persistor لاستخدامه في البروفايدر
export const persistor = persistStore(store);

// أنواع TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// hook جاهز
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
