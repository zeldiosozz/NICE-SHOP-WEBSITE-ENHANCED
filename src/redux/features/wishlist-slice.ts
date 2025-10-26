import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  items: WishListItem[];
};

export type WishListItem = {
  id: number;
  title: string;                // item.name من المنتج
  price_in_package: number;     // سعر الدستة
  price_in_box: number;         // سعر الصندوق
  quantity_of_packages: number; // عدد الدستات
  quantity_of_boxs: number; 
  quantity_per_package: number; // عدد الدستات
  quantity_per_box: number;     // عدد الصناديق
  status?: string;
  imags?: {
    thumbnails: string[];
    previews: string[];
  };
};

const initialState: InitialState = {
  items: [],
};

export const wishlist = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addItemToWishlist: (state, action: PayloadAction<WishListItem>) => {
      const { id, title, price_in_package, price_in_box, quantity_of_packages, quantity_of_boxs,quantity_per_package,quantity_per_box,imags, status } =
        action.payload;

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
          quantity_per_package, // عدد الدستات
          quantity_per_box,     // عدد الصناديق
          imags,
          status,
        });
      }
    },
    removeItemFromWishlist: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    removeAllItemsFromWishlist: (state) => {
      state.items = [];
    },
  },
});

export const {
  addItemToWishlist,
  removeItemFromWishlist,
  removeAllItemsFromWishlist,
} = wishlist.actions;

export default wishlist.reducer;
