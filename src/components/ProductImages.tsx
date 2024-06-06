"use client";
import Image from "next/image";
import React from "react";

// const images = [
//   {
//     id: 1,
//     url: "https://images.pexels.com/photos/699459/pexels-photo-699459.jpeg",
//   },
//   {
//     id: 2,
//     url: "https://images.pexels.com/photos/574069/pexels-photo-574069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//   },
//   {
//     id: 3,
//     url: "https://images.pexels.com/photos/2102416/pexels-photo-2102416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//   },
//   {
//     id: 4,
//     url: "https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//   },
// ];

const ProductImages = ({items}: {items: any}) => {
  const [index, setIndex] = React.useState(0);
  return (
    <div>
      <div className="h-[400px] relative">
        <Image
          src={items[index].image?.url}
          alt=""
          fill
          className="object-cover rounded-md"
          sizes="50vw"
        />
      </div>
      <div className=" flex justify-between gap-5 mt-8">
        {items.map((item:any, i:nuber) => (
          <div
            key={item._id}
            className="w-1/4 relative gap-4  h-28 cursor-pointer"
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
