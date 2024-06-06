// "use client";
// import React, { useContext, useEffect } from "react";
import CategroryList from "@/components/CategroryList";
import ProductList from "@/components/ProductList";
import Slider from "@/components/Slider";
// import { useWixclient } from "@/hooks/useWixclient";
import { wixClientServer } from "@/lib/wixClientServer";
import { Suspense } from "react";

const HomePage = async () => {
  // const wixClient = useWixclient();

  // useEffect(() => {
  //   const getProduct = async () => {
  //     try {
  //       const res = await wixClient.products.queryProducts().find();
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //     }
  //   };
  //   getProduct();
  // }, [wixClient]);
  const wixClient = await wixClientServer();
  const res = await wixClient.products.queryProducts().find();
  return (
    <div className="">
      <Slider />
      <div className="mt-24 px-4 md:px-8 lg:px-16 2xl:px-64 xl:px-32">
        <h1 className="text-2xl">Featured Products</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <ProductList catecgoryId="b5bdfd12-e9b8-50a5-3bb9-69f2a0c2240b" limit={4} />
        </Suspense>
      </div>
      <div className="mt-24">
        <h1 className="text-2xl px-4 md:px-8 lg:px-16 2xl:px-64 xl:px-32 mb-12">
          Categories
        </h1>
        <Suspense fallback={<div>Loading...</div>}>
          <CategroryList />
        </Suspense>
      </div>
      <div className="mt-24 px-4 md:px-8 lg:px-16 2xl:px-64 xl:px-32">
        <h1 className="text-2xl">New Products</h1>
        <Suspense fallback={<div>Loading...</div>}>
          {/* <ProductList /> */}
        </Suspense>
      </div>
    </div>
  );
};

export default HomePage;
