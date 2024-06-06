import Filter from "@/components/Filter";
import ProductList from "@/components/ProductList";
import { wixClientServer } from "@/lib/wixClientServer";
import Image from "next/image";
import React, { Suspense } from "react";

const ListPage = async ({ searchParams }: { searchParams: any }) => {
  const wixcClient = await wixClientServer();
  const cat = await wixcClient.collections.getCollectionBySlug(
    searchParams.cat || "all-products"
  );
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
      <div className="hidden bg-purple-50 px-4 sm:flex justify-between h-64">
        <div
          className="w-2/3 flex flex-col items-center justify-between gap-8
          py-6
        "
        >
          <h1 className="text-4xl font-semibold leading-[48px] text-gray-700">
            Grab up to 50% off on<br></br> selected Products
          </h1>
          <button className="rounded-3xl bg-narsa text-white w-max py-3 px-5 text-sm">
            Buy Now
          </button>
        </div>
        <div className="relative w-1/3">
          <Image src={"/woman.png"} alt="" fill className="object-contain" />
        </div>
      </div>
      <Filter />
      <h1 className="mt-12 text-xl font-semibold">Shops For You!</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <ProductList catecgoryId={cat.collection?._id || "00000000-000000-000000-000000000001"} seachParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default ListPage;
