import { TbLayoutSidebarLeftExpand } from "react-icons/tb";
import { useState, useRef, useEffect } from "react";
import {
  MdDashboard,
  MdCloudUpload,
  MdReceipt,
  MdSchedule,
  MdEvent,
  MdNotifications,
  MdSettings,
  MdOutlineLogout,
} from "react-icons/md";
import { useLocation } from "react-router-dom";
import ThemeToggle from "./themeToggle/themeToggle";
import { googleLogout } from "@react-oauth/google";
import { authStore } from "../store/auth";

const NavItems = [
  {
    title: "Dashboard",
    icon: MdDashboard,
    link: "/dashboard",
  },
  {
    title: "Upload",
    icon: MdCloudUpload,
    link: "/",
  },
  {
    title: "Invoice",
    icon: MdReceipt,
    link: "/invoice",
  },
  {
    title: "Schedule",
    icon: MdSchedule,
    link: "/schedule",
  },
  {
    title: "Calendar",
    icon: MdEvent,
    link: "/calendar",
  },
  {
    title: "notifications",
    icon: MdNotifications,
    link: "/notifs",
  },
  {
    title: "settings",
    icon: MdSettings,
    link: "/setting",
  },
];

export default function Sidebar() {
  const [minWidth, maxWidth, defaultWidth] = [80, 400, 201];
  const location = useLocation();
  const { logout } = authStore();

  const [currentPath, setCurrentPath] = useState("");
  const [width, setWidth] = useState(defaultWidth);
  const isResized = useRef(false);

  useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      if (!isResized.current) {
        return;
      }

      setWidth((previousWidth) => {
        const newWidth = previousWidth + e.movementX / 2;

        const isWidthInRange = newWidth >= minWidth && newWidth <= maxWidth;

        return isWidthInRange ? newWidth : previousWidth;
      });
    });

    window.addEventListener("mouseup", () => {
      isResized.current = false;
    });
  }, [maxWidth, minWidth]);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  return (
    <div
      style={{ width: `${width / 16}rem` }}
      className=" h-full flex flex-row bg-secondary-bg"
    >
      <div
        style={{ width: `${width / 16}rem` }}
        className={`bg-secondary-bg text-secondary-text h-full transition-all flex flex-col gap-12 `}
      >
        <div
          className={`flex ${
            width > 100 ? "flex-row" : "flex-col"
          } gap-4 p-4 items-center justify-between`}
        >
          <section className="flex flex-row text-primary-text items-center justify-center gap-4">
            <img
              src="./icon.svg"
              className={`${width > 200 ? "h-12" : "h-8"}`}
            />
            <h1
              className={` ${width > 200 ? "" : "hidden"} font-bold text-2xl`}
            >
              Base
            </h1>
          </section>

          <TbLayoutSidebarLeftExpand
            onClick={() => {
              setWidth((previousWidth) =>
                previousWidth >= defaultWidth ? minWidth : defaultWidth
              );
            }}
            className="text-2xl hover:cursor-pointer hover:text-primary-text"
          />
        </div>

        <nav className=" flex flex-col gap-4 items-start justify-center">
          {NavItems.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className={`w-full px-4 p-2 font-bold flex items-center justify-start gap-4 bg-opacity-20 ${
                currentPath === item.link
                  ? " bg-gradient-to-r from-[#ACA9FF6F] to-[#ACA9FF00] text-accent-bg"
                  : "hover:text-primary-text"
              }`}
            >
              <item.icon className="w-6 h-6" />
              <p className={`${width >= 200 ? "" : "hidden"}`}>{item.title}</p>
            </a>
          ))}
          <button
            onClick={() => {
                googleLogout()
                logout()
            }}
            className={`w-full px-4 p-2 font-bold flex items-center justify-start gap-4 bg-opacity-20 hover:text-primary-text`}
          >
            <MdOutlineLogout className="w-6 h-6" />
            <p>Logout</p>
          </button>
        </nav>

        <div className="h-full w-full flex flex-row items-end ml-4 mb-4">
          <ThemeToggle />
        </div>
      </div>
      <div
        onMouseDown={() => {
          isResized.current = true;
        }}
        className="hover:cursor-ew-resize h-full w-2 bg-secondary-bg"
      ></div>
    </div>
  );
}
