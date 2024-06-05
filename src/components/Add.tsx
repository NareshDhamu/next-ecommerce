"use client";
import React from "react";

const Add = () => {
  const [Quantity, setQuantity] = React.useState(1);
  const stock = 5;
  const handleQuantity = (type: "i" | "d") => {
    if (type === "d" && Quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
    if (type === "i" && Quantity < stock) {
      setQuantity((prev) => prev + 1);
    }
  };
  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-medium">Choose A Quantity </h4>
      <div className="flex flex-col sm:flex-row sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-gray-100 py-2 px-4 rounded-3xl flex items-center justify-between w-32">
            <button
              className="cursor-pointer text-xl"
              onClick={() => handleQuantity("d")}
            >
              -
            </button>
            {Quantity}
            <button
              className="cursor-pointer text-xl"
              onClick={() => handleQuantity("i")}
            >
              +
            </button>
          </div>
          <div className="">
            Only <span className="text-orange-500">{stock} item</span> left! <br />{" "}
            {"Don't"} miss it
          </div>
        </div>
        <button className="w-full mt-5 sm:mt-0 sm:w-36 text-sm rounded-3xl ring-1 ring-narsa py-2 px-4 hover:bg-narsa hover:text-white disabled:cursor-not-allowed disabled:bg-pink-200 disabled:text-white  disabled:ring-none">
          Add Cart
        </button>
      </div>
    </div>
  );
};

export default Add;
