import React from 'react'
import { HiArrowSmRight, HiHome, HiDocumentAdd } from "react-icons/hi";

function SideBarOneElement({ icon: Icon, label, onClick }) {
  return (
    <div>
      <li
        onClick={() => {
          // console.log(`${label} clicked`);  // Debug statement
          if (onClick) onClick();
        }}
        className="flex items-center p-2 hover:bg-zinc-700 rounded-md cursor-pointer">
        <Icon className="mr-2 text-lg" />
        <span className="mr-2 text-lg">{label}</span>
      </li>
    </div>
  )
}

export default SideBarOneElement