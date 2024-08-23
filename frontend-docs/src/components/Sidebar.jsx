import React from 'react';
import { HiArrowSmRight, HiHome, HiDocumentAdd } from "react-icons/hi";
import SideBarList from './SideBarList';

function Sidebar({ isSidebarOpen, toggleSidebar, openForm, fetchData }) {
  return (
    <div
      className={`fixed  select-none top-10 rounded-xl left-0 h-1/2 p-3 bg-zinc-900 text-white transform ${isSidebarOpen ? 'translate-x-0 w-[300px]' : 'w-[50px] -translate-x-[250px]'} transition-all duration-300 ease-in-out z-[2]`} >

      {isSidebarOpen && (
        <div className="p-5">
          <h2 className="text-2xl mb-5 py-2 border-b-4 border-indigo-500 ">My Docs</h2>

          <SideBarList openForm={openForm} fetchData={fetchData} />
        </div>
      )}
    </div>
  );
}

export default Sidebar;

