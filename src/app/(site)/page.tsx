import Home from "@/components/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NICE SHOP WEBSITE",
  description: "This is Home for NICE SHOP WEBSITE",
  // other metadata
};

export default function HomePage() {
  return (
    <>
      <Home />
    </>
  );
}
