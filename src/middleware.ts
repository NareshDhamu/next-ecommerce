import { OAuthStrategy, createClient } from "@wix/sdk";
import { NextRequest, NextResponse } from "next/server";

export const middleware = async (request: NextRequest) => {
  const cookies = request.cookies;
  const res = NextResponse.next();
  if (cookies.get("refreshToken")) {
    return res;
  }
  const wixClient = createClient({
    auth: OAuthStrategy({ clientId: "658a363b-1ab1-4c1e-b3e3-bcf935fb9c72" }),
  });
  const tokens = await wixClient.auth.generateVisitorTokens();
  res.cookies.set("refreshToken", JSON.stringify(tokens.refreshToken), {
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
};
