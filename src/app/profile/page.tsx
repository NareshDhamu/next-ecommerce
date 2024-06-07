import UpdateBtn from "@/components/UpdateBtn";
import { updateUser } from "@/lib/actions";
import { wixClientServer } from "@/lib/wixClientServer";
import { members } from "@wix/members";
import React from "react";

const profilePage = async () => {
  const wixClient = await wixClientServer();
  const user = await wixClient.members.getCurrentMember({
    fieldsets: [members.Set.FULL],
  });

  if (!user.member?.contactId) {
    return (
      <div className="flex justify-center items-center text-4xl font-semibold">
        Not logged in
      </div>
    );
  }
  return (
    <div className="flex flex-col md:flex-row gap-24 md:h-[calc(100vh-80px)] items-center px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="w-full md:w-1/2">
        <h1 className="text-2xl">Profile</h1>
        <form action={updateUser} className="mt-12 flex flex-col gap-4">
          <input type="text" hidden name="id" value={user.member.contactId} />
          <label className="text-sm text-gray-700">Username</label>
          <input
            className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
            type="text"
            name="username"
            placeholder={user.member?.profile?.nickname || "johan"}
          />
          <label className="text-sm text-gray-700">First Name</label>
          <input
            className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
            type="text"
            name="firstName"
            placeholder={user.member?.contact?.firstName || "johan"}
          />
          <label className="text-sm text-gray-700">Last Name</label>
          <input
            className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
            type="text"
            name="lestname"
            placeholder={user.member?.contact?.lastName || "don"}
          />
          <label className="text-sm text-gray-700">Phone Number</label>
          <input
            className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
            type="text"
            name="phoneNumber"
            placeholder={
              (user.member?.contact?.phones &&
                user.member?.contact?.phones[0]) ||
              "+912334562"
            }
          />
          <label className="text-sm text-gray-700">Email</label>
          <input
            className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
            type="email"
            name="phoneNumber"
            placeholder={user.member?.loginEmail || "johandoe@gmail.com"}
          />
          <UpdateBtn />
        </form>
      </div>
    </div>
  );
};

export default profilePage;
