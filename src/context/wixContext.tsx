"use client";
import { createClient, OAuthStrategy } from "@wix/sdk";
import { products, collections } from "@wix/stores";
import Cookies from "js-cookie";
import { createContext, ReactNode } from "react";


let refreshToken;
const refreshTokenString = Cookies.get("refreshToken") || "{}";

try {

  refreshToken = JSON.parse(refreshTokenString);
} catch (error) {
  // console.error("Error parsing refresh token:", error);
  refreshToken = {};
}

const wixClient = createClient({
  modules: {
    products,
    collections,
  },
  auth: OAuthStrategy({
    clientId: "658a363b-1ab1-4c1e-b3e3-bcf935fb9c72",
    tokens: {
      refreshToken,
      accessToken: { value: "", expiresAt: 0 },
    },
  }),
});

export type WixClient = typeof wixClient;
export const WixClientContext = createContext<WixClient>(wixClient);

export const WixClientContextProvider = ({ children, }: { children: ReactNode }) => {
  return (
    <WixClientContext.Provider value={wixClient}>
      {children}
    </WixClientContext.Provider>
  );
};
