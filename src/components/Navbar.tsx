import { authStore } from "../store/auth";
import { IoMdNotificationsOutline } from "react-icons/io";

export default function Navbar() {
  const { picture } = authStore();

  return (
    <div className="h-[64px] flex flex-row items-center justify-between p-4 bg-primary-bg">
      <div className="md:hidden"></div>
      <div className = " w-full flex flex-row items-center gap-4 justify-end border-red-500">
        <IoMdNotificationsOutline className="text-2xl text-primary-text"/>
        <img src={picture} alt="profile image" className="h-12 w-12 rounded-full"/>
      </div>
    </div>
  );
}
