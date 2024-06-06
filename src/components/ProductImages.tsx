"use client";
import Image from "next/image";
import React from "react";

const ProductImages = ({ items }:any) => {
  const [index, setIndex] = React.useState(0);

  return (
    <div>
      <div className="h-[400px] relative">
        {items.length > 0 && (
          <Image
            src={items[index].image?.url}
            alt=""
            fill
            className="object-cover rounded-md"
            sizes="50vw"
          />
        )}
      </div>
      <div className="flex justify-between gap-5 mt-8">
        {items.map((item:string, i:number) => (
          <div
            key={item._id}
            className="w-1/4 relative gap-4 h-28 cursor-pointer"
            onClick={() => setIndex(i)}
          >
            <Image
              src={item.image?.url}
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
