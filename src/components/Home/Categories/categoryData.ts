import { link } from "node:fs";
import Categories from ".";

const data = [
  {
    id: 1,
    title: "أدوات قتالية",
    img: "https://res.cloudinary.com/dj8hypsia/image/upload/v1760546180/%D9%82%D9%81%D8%A7%D8%B2_UfC_%D9%85%D9%82%D8%A7%D8%B3L-removebg-preview_pc6mks.png",
    lnk:"http://localhost:3000/shop-with-sidebar",
    query:"fighting",
  },
  {
    id: 2,
    title: "أدوات كرة القدم",
    img: "https://res.cloudinary.com/dj8hypsia/image/upload/v1760550317/%D9%83%D9%88%D8%B1%D8%A9_%D9%82%D8%AF%D9%85__%D9%83%D8%A8%D8%B3_%D9%83%D8%A7%D8%B3_%D8%B9%D8%A7%D9%84%D9%85_2026_%D9%85%D9%82%D8%A7%D8%B3_5-removebg-preview_p4rzkv.png",
    lnk:"http://localhost:3000/shop-with-sidebar",
    query:"football",
  },
  {
  id: 3,
    title: "أدوات الجيم",
    img: "https://res.cloudinary.com/dj8hypsia/image/upload/v1761506409/%D8%AC%D9%87%D8%A7%D8%B2_%D9%85%D8%A7%D9%84%D8%AA%D9%8A_%D8%AC%D9%8A%D9%85_5_1-removebg-preview_wjeoey.png",
    query:"gym",
  },
  {
    id: 4,
    title:"أدوات فتنس",
    img: "https://res.cloudinary.com/dj8hypsia/image/upload/v1761506414/%D9%83%D9%88%D8%B1%D8%A9_%D8%AC%D9%8A%D9%85_65%D8%B3%D9%85_M-removebg-preview_ckakwv.png",
    query:"fitness",
  },
  {
    id: 5,
    title: "جوائز و ميداليات",
    img: "https://res.cloudinary.com/dj8hypsia/image/upload/v1761506449/%D9%85%D9%8A%D8%AF%D8%A7%D9%84%D9%8A%D8%A9_%D8%B0%D9%87%D8%A8%D9%8A_%D8%AA%D8%A7%D9%8A%D9%83%D9%88%D9%86%D8%AF%D9%88-removebg-preview_xu4umw.png",
    query:"prize",
  },
  {
    title: "مضارب",
    id: 7,
    img: "https://res.cloudinary.com/dj8hypsia/image/upload/v1761506410/%D9%85%D8%B6%D8%B1%D8%A8_%D8%A8%D9%8A%D8%B3%D8%A8%D9%88%D9%84_%D9%85%D9%82%D8%A7%D8%B3_30_%D8%AD%D8%AF%D9%8A%D8%AF-removebg-preview_mlpzzx.png",
    query:"baseball",
  },
];

export default data;
