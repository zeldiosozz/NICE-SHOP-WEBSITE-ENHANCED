import type { Metadata } from "next";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  title: "Nice Shop | نايـس شوب",
  description: "نايس شوب - أفضل متجر رياضي لشراء القفازات ومنتجات القتال.",
  verification: {
    google: "NIu2OBiD80mqUglf4YNvQJEIM0xOyTK7RWyx3Mm7BlE",
  },
  keywords: [
    "نايس شوب",
    "نايس سبورت",
    "نايس شوب سبورت",
    "نايس",
    "nice",
    "shop",
    "sport shop",
    "shop sport ",
    "nice shop",
    "nice sport",
    "nice sport shop",
    "nice shop sport",
    "nice shop website",
    "nice shop website sport",
    "nice shop sport website",
    "قفازات mma",
    "قفازات ufc",
    "متجر رياضي",
  ],
  openGraph: {
    title: "Nice Shop | متجر القفازات الرياضية",
    description: "أفضل متجر رياضي لشراء القفازات ومنتجات القتال.",
    url: "https://nice-shop-website.vercel.app/",
    siteName: "Nice Shop",
    images: [
      {
        url: "https://res.cloudinary.com/dj8hypsia/image/upload/v1759904160/Screenshot_%D9%A2%D9%A0%D9%A2%D9%A5-%D9%A1%D9%A0-%D9%A0%D9%A8-%D9%A0%D9%A9-%D9%A1%D9%A0-%D9%A3%D9%A2-%D9%A7%D9%A5%D9%A1_com.mi.globalbrowser-edit_bair9w.jpg",
        width: 1200,
        height: 630,
        alt: "Nice Shop",
      },
    ],
    locale: "ar_EG",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
