"use client";

import { WixClientContext } from "@/context/wixContext";
import { useContext } from "react";

export const useWixclient = () => {
  const wixClient = useContext(WixClientContext);
};
