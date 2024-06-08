"use client";
import Image from "next/image";
import React from "react";

const ProductImages = ({ items }: { items: any}) => {
  const [index, setIndex] = React.useState(0);

  if (items.length === 0) {
    return null; // Render nothing if items array is empty
  }

  const handleClick = (i: number) => {
    setIndex(i);
  };

  return (
    <div>
      <div className="h-[500px] relative">
        <Image
          src={items[index].image?.url || ''}
          alt=""
          fill
          className="object-cover rounded-md p-5"
          sizes="50vw"
        />
      </div>
      <div className="flex justify-between gap-5 mt-8">
        {items.map((item:any , i:number) => (
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
