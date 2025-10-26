import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/product";

type InitialState = {
  value: Product;
};

const initialState = {
  value: {
    title: "",
    reviews: 0,
  price_in_box: 0,
  price_in_package: 0,
    discountedPrice: 0,
    img: "",
    id: 0,
    images: [],
    imgs: { thumbnails: [], previews: [] },
    in_stock:false,
    quantity_per_package: 0,
    quantity_per_box: 0,
    created_at:"",
    updated_at:""
  } as Product,
} as InitialState;

export const quickView = createSlice({
  name: "quickView",
  initialState,
  reducers: {
    updateQuickView: (_, action) => {
      return {
        value: {
          ...action.payload,
        },
      };
    },

    resetQuickView: () => {
      return {
        value: initialState.value,
      };
    },
  },
});

export const { updateQuickView, resetQuickView } = quickView.actions;
export default quickView.reducer;
