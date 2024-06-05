import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductList = () => {
  return (
    <div className="flex gap-x-8 gap-y-16 justify-between  flex-wrap mt-12">
      <Link href="/test" className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]">
        <div className="relative w-full h-80">
          <Image
            src="https://images.pexels.com/photos/20415613/pexels-photo-20415613/free-photo-of-mustard-yellow-sneaker-onitsuka-tiger-mexico-66tm-kill-bill-2023-on-the-shelf.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            fill
            sizes="25vw"
            className="absolute rounded-md object-cover z-10 hover:opacity-0 transition-opacity easy duration-500"
          />
          <Image
            src="https://images.pexels.com/photos/4239014/pexels-photo-4239014.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            fill
            sizes="25vw"
            className="absolute rounded-md object-cover"
          />
        </div>
        <div className="flex justify-between">
            <span className="font-medium">Prodct Name</span>
            <span className="font-semibold">49</span>
        </div>
        <div className="text-sm text-gray-500">my description</div>
        <button className="rounded-2xl ring-1 text-narsa py-2 px-3 text-xs hover:bg-narsa hover:text-white w-max">Add to Cart</button>
      </Link>
      <Link href="/test" className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]">
        <div className="relative w-full h-80">
          <Image
            src="https://images.pexels.com/photos/20415613/pexels-photo-20415613/free-photo-of-mustard-yellow-sneaker-onitsuka-tiger-mexico-66tm-kill-bill-2023-on-the-shelf.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            fill
            sizes="25vw"
            className="absolute rounded-md object-cover z-10 hover:opacity-0 transition-opacity easy duration-500"
          />
          <Image
            src="https://images.pexels.com/photos/4239014/pexels-photo-4239014.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            fill
            sizes="25vw"
            className="absolute rounded-md object-cover"
          />
        </div>
        <div className="flex justify-between">
            <span className="font-medium">Prodct Name</span>
            <span className="font-semibold">49</span>
        </div>
        <div className="text-sm text-gray-500">my description</div>
        <button className="rounded-2xl ring-1 text-narsa py-2 px-3 text-xs hover:bg-narsa hover:text-white w-max">Add to Cart</button>
      </Link>
      <Link href="/test" className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]">
        <div className="relative w-full h-80">
          <Image
            src="https://images.pexels.com/photos/20415613/pexels-photo-20415613/free-photo-of-mustard-yellow-sneaker-onitsuka-tiger-mexico-66tm-kill-bill-2023-on-the-shelf.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            fill
            sizes="25vw"
            className="absolute rounded-md object-cover z-10 hover:opacity-0 transition-opacity easy duration-500"
          />
          <Image
            src="https://images.pexels.com/photos/4239014/pexels-photo-4239014.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            fill
            sizes="25vw"
            className="absolute rounded-md object-cover"
          />
        </div>
        <div className="flex justify-between">
            <span className="font-medium">Prodct Name</span>
            <span className="font-semibold">49</span>
        </div>
        <div className="text-sm text-gray-500">my description</div>
        <button className="rounded-2xl ring-1 text-narsa py-2 px-3 text-xs hover:bg-narsa hover:text-white w-max">Add to Cart</button>
      </Link>
      <Link href="/test" className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]">
        <div className="relative w-full h-80">
          <Image
            src="https://images.pexels.com/photos/20415613/pexels-photo-20415613/free-photo-of-mustard-yellow-sneaker-onitsuka-tiger-mexico-66tm-kill-bill-2023-on-the-shelf.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            fill
            sizes="25vw"
            className="absolute rounded-md object-cover z-10 hover:opacity-0 transition-opacity easy duration-500"
          />
          <Image
            src="https://images.pexels.com/photos/4239014/pexels-photo-4239014.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            fill
            sizes="25vw"
            className="absolute rounded-md object-cover"
          />
        </div>
        <div className="flex justify-between">
            <span className="font-medium">Prodct Name</span>
            <span className="font-semibold">49</span>
        </div>
        <div className="text-sm text-gray-500">my description</div>
        <button className="rounded-2xl ring-1 text-narsa py-2 px-3 text-xs hover:bg-narsa hover:text-white w-max">Add to Cart</button>
      </Link>
    </div>
  );
};

export default ProductList;
