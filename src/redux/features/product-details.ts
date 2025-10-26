import { createSlice } from "@reduxjs/toolkit";
import { Product } from "@/types/product";

type InitialState = {
  value: Product;
};

const initialState = {
  value: {
    title: "",
    reviews: 0,
    price_in_package: 0,
    price_in_box: 0,
    id: 0,
    imags: { thumbnails: [], previews: [] },
    quantity_per_package:0,
    quantity_per_box:0,
    in_stock:false,
    created_at:"",
    updated_at:"",
    },
} as InitialState;

export const productDetails = createSlice({
  name: "productDetails",
  initialState,
  reducers: {
    updateproductDetails: (_, action) => {
      return {
        value: {
          ...action.payload,
        },
      };
    },
  },
});

export const { updateproductDetails } = productDetails.actions;
export default productDetails.reducer;
