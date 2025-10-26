export type Product = {
  title: string;
  reviews: number;
  price_in_box: number;
  price_in_package: number;
  id: number;
  imags?: {
    thumbnails: string[];
    previews: string[];
  }| null,
    quantity_per_package: number;
  quantity_per_box: number;

    in_stock: boolean;
  updated_at: string;
  created_at: string;
};
// type Product {
//   ;
//   name: string;
//   price_in_box: string;
//   price_in_package: string;
//   quantity_per_package: number;
//   quantity_per_box: number;
//   image_url?: string | null;
//   updated_at: string;
//   created_at: string;
// }
