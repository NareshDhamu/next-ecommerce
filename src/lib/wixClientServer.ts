import { OAuthStrategy, createClient } from "@wix/sdk";
import { products, collections } from "@wix/stores";
import { cookies } from "next/headers";
import { members } from "@wix/members";
export const wixClientServer = async () => {
  let refreshToken;
  try {
    const cookieStorage = cookies();
    refreshToken = JSON.parse(cookieStorage.get("refreshToken")?.value || "{}");
  } catch (e) {
    console.error("Error parsing refresh token from cookies:", e);
  }

  const wixClient = createClient({
    modules: {
      products,
      collections,
      members,
    },
    auth: OAuthStrategy({
      clientId: "658a363b-1ab1-4c1e-b3e3-bcf935fb9c72",
      tokens: {
        refreshToken,
        accessToken: { value: "", expiresAt: 0 },
      },
    }),
  });

  return wixClient;
};
