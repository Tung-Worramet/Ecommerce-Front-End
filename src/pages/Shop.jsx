import React, { useEffect } from "react";
import ProductCard from "../components/card/ProductCard";
import useEcomStore from "../store/ecom-store";
import SearchCard from "../components/card/SearchCard";
import CartCard from "../components/card/CartCard";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";

const Shop = () => {
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);

  useEffect(() => {
    getProduct();
  }, []);

  return (
    // <div className="container mx-auto p-4">
    //   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-screen">
    //     {/* Search Bar (Sidebar) */}
    //     <div className="bg-gray-100 p-4 rounded-lg shadow-md hidden md:block overflow-auto">
    //       <SearchCard />
    //     </div>

    //     {/* Product List */}
    //     <div className="p-4 overflow-auto">
    //       <h2 className="text-2xl font-bold mb-4">🛍️ สินค้าทั้งหมด</h2>
    //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    //         {products.map((item, index) => (
    //           <ProductCard key={index} item={item} />
    //         ))}
    //       </div>
    //     </div>

    //     {/* Cart (Sidebar) */}
    //     <div className="bg-gray-100 p-4 rounded-lg shadow-md hidden md:block overflow-auto">
    //       <CartCard />
    //     </div>
    //   </div>
    // </div>

    // โค้ดเก่า
    <div className="flex container mx-auto pt-6">
      {/* SearchBar */}
      <div className="w-1/4 p-4 bg-gray-100 h-screen">
        <div className="flex gap-2 mb-4">
          <Filter size={24} className="text-gray-500 mt-1" />
          <h2 className="text-2xl font-bold">ค้นหาสินค้า</h2>
        </div>
        <SearchCard />
      </div>

      {/* Product */}
      <div className="w-1/2 p-4 h-screen overscroll-y-auto">
        <p className="text-2xl font-bold mb-4">สินค้าทั้งหมด</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Product Card */}
          {products.map((item, index) => (
            <ProductCard key={index} item={item} />
          ))}
        </div>
      </div>

      {/* Cart */}
      <div className="w-1/4 p-4 bg-gray-100 h-screen overscroll-y-auto">
        <CartCard />
      </div>
    </div>
  );
};

export default Shop;
