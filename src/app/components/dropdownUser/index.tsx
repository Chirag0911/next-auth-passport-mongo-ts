import React from "react";
import Avatar from "../avatar";
import { MdOutlineLogout } from "react-icons/md";
import ActionsMenu from "../actionsMenu";
import { RiArrowDownSLine } from "react-icons/ri";
import { useAuthContext } from "@/app/context/authContext";

function DropdownUser() {
  const {
    firstName,
    userLogOut,
  }: { firstName: string; userLogOut: () => void } = useAuthContext();

  return (
    <ActionsMenu
      actions={[
        {
          title: "Logout",
          onClick: userLogOut,
          icon: <MdOutlineLogout />,
        },
      ]}
      align="end"
      className="z-10"
      menuClassName="mt-1"
    >
      <div className="flex items-center justify-between gap-4 px-2 py-1 rounded-full bg-[#f6f7f9] text-[#777e90]">
        <div className="flex items-center gap-2 flex-grow">
          <Avatar className="w-8 h-8 bg-[#353945] text-white uppercase">
            {firstName[0]}
          </Avatar>
          <div className="text-[#343B46] text-sm font-semibold">
            {firstName}
          </div>
        </div>
        <RiArrowDownSLine className="text-slateGray" />
      </div>
    </ActionsMenu>
  );
}

export default DropdownUser;
