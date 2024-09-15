import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/daira-logo.png";
import profile from "../assets/profile.png";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineContactSupport } from "react-icons/md";

export default function SideNavBar({ children, onToggle }) {
  const [expand, setExpand] = useState(true);
  const [activeItem, setActiveItem] = useState("/");
  const navigate = useNavigate();

  const userDetails = {
    name: "User1",
    email: "u@gmail.com",
  };

  const handleClick = () => {
    navigate("/userprofile", { state: { userDetails } });
  };

  const handleToggle = () => {
    setExpand(!expand);
    onToggle(!expand); // Notify parent component about toggle state
  };

  return (
    <aside className={`h-screen ${expand ? "w-80" : "w-20"} transition-all duration-300 fixed left-0 top-0 z-10`}>
      <nav className="h-full flex flex-col bg-[#F7F7F5] border-r shadow-sm">
        <div className={`p-3 pb-2 flex ${expand ? "justify-between items-center" : "flex-col items-center"}`}>
          <img src={logo} alt="logo" className={`w-14 mt-5 ${expand ? "" : "mb-4"}`} />
          <h1 className={`text-3xl mt-5 pl-2 font-extrabold overflow-hidden transition-all duration-300 ${expand ? "w-48" : "w-0 opacity-0"}`}>
            Daira
          </h1>
          <button onClick={handleToggle} className="mt-5">
            {expand ? <FiChevronsLeft size={27} /> : <FiChevronsRight size={27} />}
          </button>
        </div>

        <ul className="flex flex-col justify-center flex-1 px-2">
          {React.Children.map(children, (child) =>
            React.cloneElement(child, { expand, activeItem, setActiveItem })
          )}
        </ul>

        <div className="p-2">
          <SideNavBarItem
            icon={<IoSettingsOutline className="text-grey" size={22} />}
            text="Settings"
            route="/settings"
            expand={expand}
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
          <SideNavBarItem
            icon={<MdOutlineContactSupport className="text-grey" size={23} />}
            text="Support"
            route="/support"
            expand={expand}
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
        </div>

        <div className="border-t flex p-3">
          <img
            src={profile}
            onClick={handleClick}
            alt="Profile"
            className="w-10 h-10 ml-3 rounded-full"
          />
          <div className={`flex items-center overflow-hidden transition-all duration-300 ${expand ? "w-48 ml-3" : "w-0"}`}>
            <div className="leading-5">
              <h4 className="font-semibold">{userDetails.name}</h4>
              <span className="font-semibold text-xs text-gray-600">
                {userDetails.email}
              </span>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function SideNavBarItem({ icon, text, route, expand, activeItem, setActiveItem }) {
  const navigate = useNavigate();

  const handleItemClick = () => {
    setActiveItem(route);
    navigate(route);
  };

  return (
    <li
      onClick={handleItemClick}
      className={`relative flex items-center py-4 pl-6 my-1 pr-2 font-medium rounded-md cursor-pointer transition-colors group ${
        activeItem === route
          ? "bg-gradient-to-tr from-[#F2C94C] to-[#F2994A] text-[#333333]"
          : "hover:bg-[#F2994A] hover:text-[#333333] text-gray-600"
      }`}
    >
      {icon}
      <span className={`ml-3 text-xl font-medium overflow-hidden transition-all duration-300 ${expand ? "w-48 ml-3" : "w-0 opacity-0"}`}>
        {text}
      </span>
    </li>
  );
}
