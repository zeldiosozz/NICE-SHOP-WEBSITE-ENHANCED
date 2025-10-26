// types/product-server.ts
export type ServerProduct = {
  id: number;
  name: string;
  price_in_box: string; // string زي ما جاي من قاعدة البيانات
  price_in_package: string;
  quantity_per_package: number;
  quantity_per_box: number;
  in_stock: boolean;
  image_url?: string | null;
  updated_at: string;
  created_at: string;
};
