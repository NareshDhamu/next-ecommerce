"use client";
import Image from "next/image";
import React from "react";

interface Product {
  _id: string;
  image?: {
    url: string;
  };
}

interface ProductImagesProps {
  items: Product[];
}

const ProductImages: React.FC<ProductImagesProps> = ({ items }) => {
  const [index, setIndex] = React.useState(0);

  if (items.length === 0) {
    return null; // Render nothing if items array is empty
  }

  const handleClick = (i: number) => {
    setIndex(i);
  };

  return (
    <div>
      <div className="h-[400px] relative">
        <Image
          src={items[index].image?.url || ''}
          alt=""
          fill
          className="object-cover rounded-md"
          sizes="50vw"
        />
      </div>
      <div className="flex justify-between gap-5 mt-8">
        {items.map((item, i) => (
          <div
            key={item._id}
            className="w-1/4 relative gap-4 h-28 cursor-pointer"
            onClick={() => handleClick(i)}
          >
            <Image
              src={item.image?.url || ''}
              alt=""
              fill
              className="object-cover rounded-md"
              sizes="30vw"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
