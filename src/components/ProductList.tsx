import { wixClientServer } from "@/lib/wixClientServer";
import { products } from "@wix/stores";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import DOMPurify from "isomorphic-dompurify";
const PRODUCT_PER_PAGE = 20;
const ProductList = async ({
  catecgoryId,
  limit,
  seachParams,
}: {
  catecgoryId: string;
  limit?: number;
  seachParams?: any;
}) => {
  const wicClient = await wixClientServer();
  const res = await wicClient.products
    .queryProducts()
    .eq("collectionIds", catecgoryId || "")
    .limit(limit || PRODUCT_PER_PAGE)
    .find();
  return (
    <div className="flex gap-x-8 gap-y-16 justify-between  flex-wrap mt-12">
      {res.items.map((product: products.Product) => (
        <Link
          key={product._id}
          href={"/" + product.slug}
          className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
        >
          <div className="relative w-full h-80">
            <Image
              src={product.media?.mainMedia?.image?.url || "/product.png"}
              alt=""
              fill
              sizes="25vw"
              className="absolute rounded-md object-cover z-10 hover:opacity-0 transition-opacity easy duration-500"
            />
            {product.media?.items && (
              <Image
                src={product.media?.items[0]?.image?.url || "/product.png"}
                alt=""
                fill
                sizes="25vw"
                className="absolute rounded-md object-cover"
              />
            )}
          </div>
          <div className="flex justify-between">
            <span className="font-medium">{product.name}</span>
            <span className="font-semibold">${product.price?.discountedPrice}</span>
          </div>
          {product.additionalInfoSections && (
            <div
              className="text-sm text-gray-500"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  product.additionalInfoSections?.find(
                    (section: any) => section.title === "shortDesc"
                  )?.description || ""
                ),
              }}
            ></div>
          )}

          <button className="rounded-2xl ring-1 text-narsa py-2 px-3 text-xs hover:bg-narsa hover:text-white w-max">
            Add to Cart
          </button>
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
