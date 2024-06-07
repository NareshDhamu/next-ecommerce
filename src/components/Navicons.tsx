"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import CartModal from "./CartModal";
import Cookies from "js-cookie";
import { useWixClient } from "@/hooks/useWixclient";
import { useCartStore } from "@/hooks/useCartStore";
// import { useWixClient } from "@/hooks/useWixclient";

const NavIcons = () => {
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const wixClient = useWixClient();

  const isLoggedIn = wixClient.auth.loggedIn();
  const handleProfile = () => {
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      setIsProfileOpen((prev) => !prev);
    }
  };

  // const WixClient = useWixClient();
  // const login = async () => {
  //   const loginRequestData = WixClient.auth.generateOAuthData(
  //     "http://localhost:3000"
  //   );

  //   localStorage.setItem("oAuthRequestData", JSON.stringify(loginRequestData));
  //   const {authUrl} = await WixClient.auth.getAuthUrl(loginRequestData)
  //   window.location.href = authUrl;
  // };

  const handleLogout = async () => {
    setIsLoading(true);
    Cookies.remove("refreshToken");
    const { logoutUrl } = await wixClient.auth.logout(window.location.href);
    setIsLoading(false);
    setIsProfileOpen(false);
    router.push(logoutUrl);
  };

  const { cart, counter, getCart } = useCartStore();
  useEffect(() => {
    getCart(wixClient);
  }, [wixClient, getCart]);

  return (
    <div className="flex items-center gap-4 xl:gap-6 relative">
      <Image
        src="/profile.png"
        alt="cart"
        width={22}
        height={22}
        className="cursor-pointer"
        onClick={handleProfile}
        // onClick={login}
      />
      {isProfileOpen && (
        <div className="absolute p-4 rounded-md top-12 left-0 text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white z-20">
          <Link href="/profile">Profile</Link>
          <div className="mt-2 cursor-pointer" onClick={handleLogout}>
            {isLoading ? "Logging out" : "Logout"}
          </div>
        </div>
      )}
      <Image
        src="/notification.png"
        alt="cart"
        width={22}
        height={22}
        className="cursor-pointer"
      />
      <div className="relative- cursor-pointer ">
        <Image
          src="/cart.png"
          alt="cart"
          width={22}
          height={22}
          className="cursor-pointer"
          onClick={() => setIsCartOpen((prev) => !prev)}
        />
        <div className="absolute -top-[15.5px] -right-3 w-5 h-5 bg-narsa rounded-full text-white text-xs  flex items-center justify-center">
          {counter}
        </div>
      </div>
      {isCartOpen && <CartModal />}
    </div>
  );
};

export default NavIcons;
