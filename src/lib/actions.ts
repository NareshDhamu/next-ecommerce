"use server";

import { members } from "@wix/members";
import { wixClientServer } from "./wixClientServer";

export const updateUser = async (formData: FormData) => {
  const wixClient = await wixClientServer();
  const username = formData.get("username") as string;
  const id = formData.get("id") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const phoneNumber = formData.get("phoneNumber") as string;
  try {
    const response = await wixClient.members.updateMember(id, {
        contact:{
            firstName: firstName || undefined,
            lastName: lastName || undefined,
            phones:[phoneNumber] || undefined,
            },
        loginEmail: email || undefined,
        profile: {
            nickname: username || undefined,
        }
    });
    // console.log(response);
  } catch (error) {
    console.error(error);
  }
};
