import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// 🧩 شكل العنصر الواحد في الكارت
type CartItem = {
  id: number;
  title: string;
  price_in_package: number;
  price_in_box: number;
  quantity_of_packages: number;
  quantity_of_boxs: number;
  quantity_per_package:number;
  quantity_per_box:number;
  imags?: {
    thumbnails: string[];
    previews: string[];
  };
};

// الحالة الابتدائية
type InitialState = {
  items: CartItem[];
};

const initialState: InitialState = {
  items: [],
};

// 🧱 الـ Slice
export const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      const {
        id,
        title,
        price_in_package,
        price_in_box,
        quantity_of_packages,
        quantity_of_boxs,
        quantity_per_package,
        quantity_per_box,
        imags,
      } = action.payload;

      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity_of_packages += quantity_of_packages;
        existingItem.quantity_of_boxs += quantity_of_boxs;
      } else {
        state.items.push({
          id,
          title,
          price_in_package,
          price_in_box,
          quantity_of_packages,
          quantity_of_boxs,
          quantity_per_package,
          quantity_per_box,
          imags: imags || {
            thumbnails: ["/images/placeholder.png"],
            previews: ["/images/placeholder.png"],
          },
        });
      }
    },

    removeItemFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    updateCartItemQuantity: (
      state,
      action: PayloadAction<{
        id: number;
        quantity_of_packages: number;
        quantity_of_boxs: number;
      }>
    ) => {
      const { id, quantity_of_packages, quantity_of_boxs } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity_of_packages = quantity_of_packages;
        existingItem.quantity_of_boxs = quantity_of_boxs;
      }
    },

    removeAllItemsFromCart: (state) => {
      state.items = [];
    },
  },
});

//
// 🧠 Selectors
//

// 🧾 كل عناصر الكارت
export const selectCartItems = (state: RootState) => state.cartReducer.items;

// 🔢 عدد المنتجات
export const selectCartCount = createSelector([selectCartItems], (items) =>
  items.length
);

// 💰 إجمالي السعر الكلي (زي الباك اند بالظبط)
export const selectTotalPrice = createSelector([selectCartItems], (items) => {
  return items.reduce((total, item) => {
    const totalItemPrice =
      (item.quantity_of_packages * item.price_in_package*item.quantity_per_package) +
      (item.quantity_of_boxs * item.price_in_box * item.quantity_per_box);
    return total + totalItemPrice;
  }, 0);
});

// 📦 الداتا الجاهزة للإرسال إلى API
export const selectOrderPayload = createSelector([selectCartItems], (items) => {
  return items.map((item) => ({
    id: item.id,
    quantity_of_packages: item.quantity_of_packages,
    quantity_of_boxs: item.quantity_of_boxs,
  }));
});

//
// 🔥 Exports
//
export const {
  addItemToCart,
  removeItemFromCart,
  updateCartItemQuantity,
  removeAllItemsFromCart,
} = cart.actions;

export default cart.reducer;
