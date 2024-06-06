import Add from "@/components/Add";
import CustomizeProducts from "@/components/CustomizeProducts";
import ProductImages from "@/components/ProductImages";
import { wixClientServer } from "@/lib/wixClientServer";
import { notFound } from "next/navigation";

interface Product {
  _id: string;
  name: string;
  description?: string;
  price?: {
    price: number;
    discountedPrice?: number;
  };
  media?: {
    items: string[];
  };
  variants?: any[]; // adjust the type according to your data structure
  productOptions?: any[]; // adjust the type according to your data structure
  stock?: {
    quantity: number;
  };
  additionalInfoSections?: {
    title: string;
    description: string;
  }[];
}

const SinglePage = ({ product }: { product: Product }) => {
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        {product?.media && <ProductImages items={product.media.items} />}
      </div>
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl font-medium">{product?.name ?? "Unnamed Product"}</h1>
        <p className="text-gray-500">{product?.description ?? "No description available."}</p>
        <div className="h-[2px] bg-gray-100" />
        {product && (
          <>
            {product.price?.price === product.price?.discountedPrice ? (
              <h2 className="text-2xl font-medium ">${product.price?.price}</h2>
            ) : (
              <div className="flex items-center gap-4">
                <h3 className="text-xl text-gray-500 line-through">
                  ${product.price?.price}
                </h3>
                <h2 className="font-medium text-2xl">
                  ${product.price?.discountedPrice}
                </h2>
              </div>
            )}
            <div className="h-[2px] bg-gray-100" />
            {product.variants && product.productOptions ? (
              <CustomizeProducts
                productId={product._id ?? ""}
                variants={product.variants}
                productOptions={product.productOptions}
              />
            ) : (
              <Add
                productId={product._id ?? ""}
                variantId="00000000-0000-0000-0000-000000000000"
                stockNumber={product.stock?.quantity ?? 0}
              />
            )}
            <div className="h-[2px] bg-gray-100" />
            {product.additionalInfoSections?.map((section) => (
              <div key={section.title} className="text-sm">
                <h4 className="font-medium mb-4">{section.title}</h4>
                <p>{section.description}</p>
              </div>
            )) ?? null}
          </>
        )}
      </div>
    </div>
  );
};

export async function getServerSideProps({ params }: { params: { slug: string } }) {
  let product: Product | null = null;
  try {
    const wixClient = await wixClientServer();
    const products = await wixClient.products
      .queryProducts()
      .eq("slug", params.slug)
      .find();

    if (!products.items[0]) {
      return { notFound: true };
    }

    product = products.items[0];
  } catch (error) {
    console.error("Error fetching product:", error);
    // Handle error gracefully, show error message, or fallback UI
    product = null;
  }

  return {
    props: {
      product,
    },
  };
}

export default SinglePage;

// import Add from "@/components/Add";
// import CustomizeProducts from "@/components/CustomizeProducts";
// import ProductImages from "@/components/ProductImages";
// import { wixClientServer } from "@/lib/wixClientServer";
// import { notFound } from "next/navigation";




// const SinglePage = async ({ params }: { params: { slug: string } }) => {
//   const wixClient = await wixClientServer();
//   const products = await wixClient.products
//     .queryProducts()
//     .eq("slug", params.slug)
//     .find();

//   if (!products.items[0]) {
//     return notFound();
//   }

//   const product = products.items[0];

//   return (
//     <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
//       <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
//           <ProductImages items={product.media?.items} />
  
//       </div>
//       <div className="w-full lg:w-1/2 flex flex-col gap-6">
//         <h1 className="text-4xl font-medium">{product.name ?? "Unnamed Product"}</h1>
//         <p className="text-gray-500">{product.description ?? "No description available."}</p>
//         <div className="h-[2px] bg-gray-100" />
//         {product.price?.price === product.price?.discountedPrice ? (
//           <h2 className="text-2xl font-medium ">${product.price?.price}</h2>
//         ) : (
//           <div className="flex items-center gap-4">
//             <h3 className="text-xl text-gray-500 line-through">
//               ${product.price?.price}
//             </h3>
//             <h2 className="font-medium text-2xl">
//               ${product.price?.discountedPrice}
//             </h2>
//           </div>
//         )}
//         <div className="h-[2px] bg-gray-100" />
//         {product.variants && product.productOptions ? (
//           <CustomizeProducts
//             productId={product._id ?? ""}
//             variants={product.variants}
//             productOptions={product.productOptions}
//           />
//         ) : (
//           <Add
//             productId={product._id ?? ""}
//             variantId="00000000-0000-0000-0000-000000000000"
//             stockNumber={product.stock?.quantity ?? 0}
//           />
//         )}
//         <div className="h-[2px] bg-gray-100" />
//         {product.additionalInfoSections?.map((section) => (
//           <div key={section.title} className="text-sm">
//             <h4 className="font-medium mb-4">{section.title}</h4>
//             <p>{section.description}</p>
//           </div>
//         )) ?? null}
//       </div>
//     </div>
//   );
// };

// export default SinglePage;
