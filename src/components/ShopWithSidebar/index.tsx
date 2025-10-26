"use client";
import React, { useState, useEffect } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import CategoryDropdown from "./CategoryDropdown";
import PriceDropdown from "./PriceDropdown";
import SingleGridItem from "../Shop/SingleGridItem";
import SingleListItem from "../Shop/SingleListItem";
import { useSearchParams } from "next/navigation";

const ShopWithSidebar = () => {
  const [productStyle, setProductStyle] = useState("grid");
  const [productSidebar, setProductSidebar] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const searchParams = useSearchParams();

  const API_URL = "/api/products";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("فشل تحميل المنتجات");
        const data = await res.json();
        setProducts(data);
        const categoryFromQuery = new URLSearchParams(window.location.search).get("category");
      let filtered = data;
      if (categoryFromQuery) {
        setSelectedCategory(categoryFromQuery);
        filtered = data.filter(
          (item) =>
            item.category?.toLowerCase() === categoryFromQuery.toLowerCase()
        );
      }
        setFilteredProducts(filtered);
      } catch (err) {
        console.error("خطأ أثناء جلب المنتجات:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ✅ تحديث الفلترة لما الكاتيجوري أو البحث أو المنتجات تتغير
  useEffect(() => {
    let tempProducts = [...products];

    // فلترة حسب الكاتيجوري
    if (selectedCategory !== "All") {
      tempProducts = tempProducts.filter(
        (item) =>
          item.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // فلترة حسب البحث
    if (searchQuery.trim() !== "") {
      tempProducts = tempProducts.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(tempProducts);
  }, [selectedCategory, searchQuery, products]);

  const handleStickyMenu = () => {
    if (window.scrollY >= 80) setStickyMenu(true);
    else setStickyMenu(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyMenu);

    function handleClickOutside(event: any) {
      if (!event.target.closest(".sidebar-content")) {
        setProductSidebar(false);
      }
    }

    if (productSidebar) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleStickyMenu);
    };
  }, [productSidebar]);

  const handleClearFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
    setFilteredProducts(products);
  };

  return (
    <>
    
      <Breadcrumb
        title="Explore All Products"
        pages={["shop", "/", "shop with sidebar"]}
      />
                <div className="bg-white dark:bg-[#000000] text-[#000000] shadow-1 rounded-lg py-4 px-5">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full border border-gray-3 dark:border-[#ff00ff] dark-red:border-[#8b1a1a] rounded px-3 py-2 focus:outline-none focus:border-blue dark:focus:border-[#ff00ff]"
                  />
                </div>

      <section className="overflow-hidden relative pb-20 pt-5 lg:pt-20 xl:pt-28 bg-[#f3f4f6] dark:bg-[#000000]">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex gap-7.5">
            
            {/* Sidebar */}
            <div
              className={`sidebar-content fixed xl:z-1 z-9999 left-0 top-0 xl:translate-x-0 xl:static max-w-[310px] xl:max-w-[270px] w-full ease-out duration-200 ${
                productSidebar
                  ? "translate-x-0 bg-white dark:bg-[#000000] p-5 h-screen overflow-y-auto"
                  : "-translate-x-full"
              }`}
            >
              <button
                onClick={() => setProductSidebar(!productSidebar)}
                className={`xl:hidden absolute -right-12.5 sm:-right-8 text-white  flex items-center justify-center w-22 h-8 rounded-md bg-blue dark:bg-[#ff00ff] dark-red:bg-[#8b1a1a] shadow-1 ${
                  stickyMenu
                    ? "lg:top-20 sm:top-34.5 top-35"
                    : "lg:top-24 sm:top-39 top-37"
                }`}
              >
                <svg
                  className="fill-current"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.0068 3.44714C10.3121 3.72703 10.3328 4.20146 10.0529 4.5068L5.70494 9.25H20C20.4142 9.25 20.75 9.58579 20.75 10C20.75 10.4142 20.4142 10.75 20 10.75H4.00002C3.70259 10.75 3.43327 10.5742 3.3135 10.302C3.19374 10.0298 3.24617 9.71246 3.44715 9.49321L8.94715 3.49321C9.22704 3.18787 9.70147 3.16724 10.0068 3.44714Z"
                  />
                </svg>
                فلترة
              </button>

              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col gap-6"
              >
                {/* Search Input */}
                <div className="bg-white dark:bg-[#000000] text-[#000000] shadow-1 rounded-lg py-4 px-5">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full border border-gray-3 dark:border-[#ff00ff] dark-red:border-[#8b1a1a] rounded px-3 py-2 focus:outline-none focus:border-blue"
                  />
                </div>

                <div className="bg-white dark:bg-[#000000] dark:text-[#ff00ff] dark-red:text-[#8b1a1a] shadow-1 rounded-lg py-4 px-5 flex items-center justify-between">
                  <p>Filters:</p>
                  <button
                    type="button"
                    onClick={handleClearFilters}
                    className="text-blue dark:text-[#ff00ff] dark-red:text-[#8b1a1a]"
                  >
                    Clean All
                  </button>
                </div>

                <CategoryDropdown selectedCategory={selectedCategory} onCategorySelect={setSelectedCategory} />
                <PriceDropdown
                  onPriceChange={(range) => {
                    const filtered = products.filter((item: any) => {
                      const price = Number(
                        item.price_in_box || item.price_in_package || 0
                      );
                      return price >= range.from && price <= range.to;
                    });
                    setFilteredProducts(filtered);
                  }}
                />
              </form>
            </div>

            {/* Content */}
            <div className="xl:max-w-[870px] w-full">
              <div className="rounded-lg bg-white dark:bg-[#000000] shadow-1 pl-3 pr-2.5 py-2.5 mb-6 flex items-center justify-between">
                <div className="flex items-center gap-4 ">
                  <p>
                    Showing{" "}
                    <span className="text-dark dark:text-[#ff00ff] dark-red:text-[#8b1a1a]">{filteredProducts.length}</span>{" "}
                    Products
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => setProductStyle("grid")}
                    className={`${
                      productStyle === "grid"
                        ? "bg-blue dark-red:bg-[#8b1a1a] border-blue dark:border-[#ff00ff] dark-red:border-[#8b1a1a] text-white"
                        : "text-dark dark:text-[#ff00ff] dark-red:text-[#8b1a1a] bg-gray-1 dark:bg-[#000000] border-gray-3 "
                    } flex items-center justify-center w-10.5 h-9 rounded-[5px] border`}
                  >
                    Grid
                  </button>
                </div>
              </div>

              {loading ? (
                <p className="text-center text-gray-500 mt-10">
                  Loading products...
                </p>
              ) : filteredProducts.length === 0 ? (
                <p className="text-center text-gray-500 mt-10">
                  No products found.
                </p>
              ) : productStyle === "grid" ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredProducts.map((product: any) => (
                    <SingleGridItem key={product.id} item={product} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {filteredProducts.map((product: any) => (
                    <SingleListItem key={product.id} item={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopWithSidebar;
