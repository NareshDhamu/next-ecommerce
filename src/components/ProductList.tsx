import { wixClientServer } from "@/lib/wixClientServer";
import { products } from "@wix/stores";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import DOMPurify from "isomorphic-dompurify";
import Pagination from "./Pagination";

const PRODUCT_PER_PAGE = 8;

const ProductList = async ({
  categoryId,
  limit,
  searchParams,
}: {
  categoryId: string;
  limit?: number;
  searchParams?: any;
}) => {
  const wixClient = await wixClientServer();
  const productQuery = wixClient.products
    .queryProducts()
    .startsWith("name", searchParams?.name || "")
    .eq("collectionIds", categoryId)
    .hasSome("productType", [searchParams?.type || "physical", "digital"])
    .gt("priceData.price", searchParams?.min || 0)
    .lt("priceData.price", searchParams?.max || 999999)
    .limit(limit || PRODUCT_PER_PAGE)
    .skip(
      searchParams?.page
        ? parseInt(searchParams.page) * (limit || PRODUCT_PER_PAGE)
        : 0
    );

  if (searchParams?.sort) {
    const [sortType, sortBy] = searchParams.sort.split(" ");
    if (sortType === "asc") {
      productQuery.ascending(sortBy);
    }
    if (sortType === "desc") {
      productQuery.descending(sortBy);
    }
  }

  const res = await productQuery.find();

  function formatINR(x: number): string {
    return x.toLocaleString("en-IN");
  }

  function getSanitizedDescriptionWithLimitedLength(description: string): string {
    const sanitizedDescription = DOMPurify.sanitize(description);
    const limitedDescription = sanitizedDescription.slice(0, 50);
    return `${limitedDescription}...`;
  }

  return (
    <div className="flex gap-x-8 gap-y-16 justify-between flex-wrap mt-12">
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
              className="absolute rounded-md object-cover z-10 hover:opacity-0 transition-opacity ease duration-500"
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
            <span className="font-medium">{product.name?.slice(0, 40)}</span>
          </div>
          {product.additionalInfoSections && (
            <div
              className="text-sm text-gray-500"
              dangerouslySetInnerHTML={{
                __html: getSanitizedDescriptionWithLimitedLength(
                  product.additionalInfoSections.find(
                    (section: any) => section.title === "shortDesc"
                  )?.description || ""
                ),
              }}
            ></div>
          )}
          <div className="flex justify-between items-center">
            <span className="font-semibold">
              ₹{formatINR(product.price?.discountedPrice || 0)}
            </span>
            <button className="rounded-2xl ring-1 text-narsa py-2 px-3 text-xs hover:bg-narsa hover:text-white w-max">
              Add to Cart
            </button>
          </div>
        </Link>
      ))}
      {searchParams?.cat || searchParams?.name ? (
        <Pagination
          currentPage={res.currentPage || 0}
          hasPrev={res.hasPrev()}
          hasNext={res.hasNext()}
        />
      ) : null}
    </div>
  );
};

export default ProductList;

// import { wixClientServer } from "@/lib/wixClientServer";
// import { products } from "@wix/stores";
// import Image from "next/image";
// import Link from "next/link";
// import React from "react";
// import DOMPurify from "isomorphic-dompurify";
// import Pagination from "./Pagination";
// const PRODUCT_PER_PAGE = 8;
// const ProductList = async ({
//   categoryId,
//   limit,
//   searchParams,
// }: {
//   categoryId: string;
//   limit?: number;
//   searchParams?: any;
// }) => {
//   const wixClient = await wixClientServer();
//   const productQuery = wixClient.products
//     .queryProducts()
//     .startsWith("name", searchParams?.name || "")
//     .eq("collectionIds", categoryId)
//     .hasSome("productType", [searchParams?.type || "physical", "digital"])
//     .gt("priceData.price", searchParams?.min || 0)
//     .lt("priceData.price", searchParams?.max || 999999)
//     .limit(limit || PRODUCT_PER_PAGE)
//     .skip(
//       searchParams?.page
//         ? parseInt(searchParams.page) * (limit || PRODUCT_PER_PAGE)
//         : 0
//     );

//   if (searchParams?.sort) {
//     const [sortType, sortBy] = searchParams.sort.split(" ");
//     if (sortType === "asc") {
//       productQuery.ascending(sortBy);
//     }
//     if (sortType === "desc") {
//       productQuery.descending(sortBy);
//     }
//   }

//   const res = await productQuery.find();
//   function formatINR(x: number): string {
//     return x.toLocaleString("en-IN");
//   }
  
//   return (
//     <div className="flex gap-x-8 gap-y-16 justify-between  flex-wrap mt-12">
//       {res.items.map((product: products.Product) => (
//         <Link
//           key={product._id}
//           href={"/" + product.slug}
//           className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
//         >
//           <div className="relative w-full h-80">
//             <Image
//               src={product.media?.mainMedia?.image?.url || "/product.png"}
//               alt=""
//               fill
//               sizes="25vw"
//               className="absolute rounded-md object-cover z-10 hover:opacity-0 transition-opacity easy duration-500"
//             />
//             {product.media?.items && (
//               <Image
//                 src={product.media?.items[0]?.image?.url || "/product.png"}
//                 alt=""
//                 fill
//                 sizes="25vw"
//                 className="absolute rounded-md object-cover"
//               />
//             )}
//           </div>
//           <div className="flex justify-between">
//             <span className="font-medium">{product.name}</span>
//           </div>
//           {product.additionalInfoSections && (
//             <div
//               className="text-sm text-gray-500"
//               dangerouslySetInnerHTML={{
//                 __html: DOMPurify.sanitize(
//                   product.additionalInfoSections?.find(
//                     (section: any) => section.title === "shortDesc"
//                   )?.description || ""
//                 ),
//               }}
//             ></div>
//           )}
//           <div className="flex justify-between items-center">
//           <span className="font-semibold">
//             ₹{formatINR(product.price?.discountedPrice || 0)}
//           </span>

//           <button className="rounded-2xl ring-1 text-narsa py-2 px-3 text-xs hover:bg-narsa hover:text-white w-max">
//             Add to Cart
//           </button>
//           </div>
//         </Link>
//       ))}
//       {searchParams?.cat || searchParams?.name ? (
//         <Pagination
//           currentPage={res.currentPage || 0}
//           hasPrev={res.hasPrev()}
//           hasNext={res.hasNext()}
//         />
//       ) : null}
//     </div>
//   );
// };

// export default ProductList;
