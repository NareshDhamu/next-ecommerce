import Add from "@/components/Add";
import CustomizeProducts from "@/components/CustomizeProducts";
import ProductImages from "@/components/ProductImages";
import { wixClientServer } from "@/lib/wixClientServer";
import { htmlToText } from "html-to-text";
import Image from "next/image";
import { notFound } from "next/navigation";

const SinglePage = async ({ params }: { params: { slug: string } }) => {
  const wixClient = await wixClientServer();
  const products = await wixClient.products
    .queryProducts()
    .eq("slug", params.slug)
    .find();

  if (!products.items[0]) {
    return notFound();
  }

  const product = products.items[0];
  const reviewRes = await fetch(
    `https://api.fera.ai/v3/public/reviews?product.id=${product._id}&public_key=pk_13dd61d0cc4708bba3896538467c8f13a2d43d082e1f9617815da4a98fd027cf`
  );

  const reviews = await reviewRes.json();
  function removeHtmlTags(description: string) {
    return htmlToText(description);
  }
  function formatINR(x: number): string {
    return x.toLocaleString("en-IN");
  }
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <ProductImages items={product.media?.items} />
      </div>
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl font-medium">
          {product.name ?? "Unnamed Product"}
        </h1>

        <p className="text-gray-500">
          {product.description
            ? removeHtmlTags(product.description)
            : "No description available."}
        </p>
        <div className="h-[2px] bg-gray-100" />
        {product.price?.price === product.price?.discountedPrice ? (
          <h2 className="text-2xl font-medium ">${formatINR(product.price?.price ?? 0)}</h2>
        ) : (
          <div className="flex items-center gap-4">
            <h3 className="text-xl text-gray-500 line-through">
              ₹{formatINR(product.price?.price ?? 0)}
            </h3>
            <h2 className="font-medium text-2xl">
              ₹{formatINR(product.price?.discountedPrice ?? 0)}
            </h2>
          </div>
        )}
        <div className="h-[2px] bg-gray-100" />
        {product.variants && product.productOptions ? (
          <CustomizeProducts
            productId={product._id ?? ""}
            variants={product.variants}
            productOptions={product.productOptions}
            key={product._id}
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
            <p>{section.description && removeHtmlTags(section.description)}</p>
          </div>
        ))}
        <div className="h-[2px] bg-gray-100" />
        <h1>User Reviews</h1>
        {reviews.data.map((review: any) => (
          <div className="flex flex-col gap-4" key={review.id}>
            <div className="flex items-center gap-4 font-medium">
              <Image
                src={review.customer.avatar_url}
                alt=""
                width={32}
                height={32}
                className="rounded-full"
              />
              <span>{review.customer.display_name}</span>
            </div>
            <div className="flex gap-2">
              {Array.from({ length: review.rating }).map((_, index) => (
                <Image
                  src="/star.png"
                  alt=""
                  key={index}
                  width={16}
                  height={16}
                />
              ))}
            </div>
            {review.heading && <p>{review.heading}</p>}
            {review.body && <p>{review.body}</p>}
            <div className="flex">
              {review.media.map((media: any) => (
                <Image
                  src={media.url}
                  alt=""
                  width={100}
                  height={50}
                  className="object-cover"
                  key={media.id}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SinglePage;
