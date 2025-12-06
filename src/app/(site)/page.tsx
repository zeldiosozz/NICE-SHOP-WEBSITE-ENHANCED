import Home from "@/components/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NICE SPORT SHOP",
  description: "THIS IS HOME FOR NICE SPORT SHOP",
  // other metadata
};

export default function HomePage() {
  return (
    <>
      <Home />
    </>
  );
}
