import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="py-24 px-4 md:px8 xl:px-32 2xl:px64 bg-gray-100 text-sm mt-24">
      <div className="flex flex-col md:flex-row justify-between gap-24">
        <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
          <Link href="/" className="text-2xl tracking-wide">
            NARSA
          </Link>
          <p>
            3252 Winding Way, cantral Plaza, Willowbrook, CA 90210, United
            States
          </p>
          <span className="font-semibold">nareshdhamu@gmail.com</span>
          <span className="font-semibold">+91 9588864415</span>
          <div className="flex gap-6">
            <Image src="/facebook.png" width={24} height={24} alt="logo" />
            <Image src="/instagram.png" width={24} height={24} alt="logo" />
            <Image src="/youtube.png" width={24} height={24} alt="logo" />
            <Image src="/pinterest.png" width={24} height={24} alt="logo" />
          </div>
        </div>
        <div className="w-1/2 hidden lg:flex justify-between">
          <div className="flex flex-col gap-6">
            <h1 className="font-medium text-lg">COMPANY</h1>
            <div className="flex flex-col justify-between"></div>
            <Link href="">About Us</Link>
            <Link href="">Careers</Link>
            <Link href="">Affiliates</Link>
            <Link href="">Blog</Link>
            <Link href="">Contact</Link>
            <Link href="">Contact Us</Link>
          </div>
          <div className="flex flex-col gap-6">
            <h1 className="font-medium text-lg">COMPANY</h1>
            <div className="flex flex-col justify-between"></div>
            <Link href="">About Us</Link>
            <Link href="">Careers</Link>
            <Link href="">Affiliates</Link>
            <Link href="">Blog</Link>
            <Link href="">Contact</Link>
            <Link href="">Contact Us</Link>
          </div>
          <div className="flex flex-col gap-6">
            <h1 className="font-medium text-lg">COMPANY</h1>
            <div className="flex flex-col justify-between"></div>
            <Link href="">About Us</Link>
            <Link href="">Careers</Link>
            <Link href="">Affiliates</Link>
            <Link href="">Blog</Link>
            <Link href="">Contact</Link>
            <Link href="">Contact Us</Link>
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
          <h1 className="font-semibold text-lg">SUBSCRIBE</h1>
          <p>
            Be the first to get the latest news about trends, promotions, and
            mush more!
          </p>
          <div className="flex">
            <input
              type="text "
              placeholder="Email address"
              className="p-4 w-3/4"
            />
            <button className="w-1/2 bg-narsa text-white">JOIN</button>
          </div>
          <span className="font-semibold">Secure Payments</span>
          <div className="flex justify-between">
            <Image src="/discover.png" width={40} height={40} alt="logo" />
            <Image src="/skrill.png" width={40} height={40} alt="logo" />
            <Image src="/paypal.png" width={40} height={40} alt="logo" />
            <Image src="/mastercard.png" width={40} height={40} alt="logo" />
            <Image src="/visa.png" width={40} height={40} alt="logo" />
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-16">
        <div>© 2024 Narsa Dhamu Shop</div>
        <div className="flex flex-col gap-8 md:flex-row">
          <div>
            <span className="text-gray-500 mr-4">Language</span>
            <span className="font-medium">United States | English</span>
          </div>
          <div>
            <span className="text-gray-500 mr-4">Currency</span>
            <span className="font-medium">$ USA</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
