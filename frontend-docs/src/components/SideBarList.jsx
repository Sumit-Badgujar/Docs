import React from 'react'
import { HiArrowSmRight, HiHome, HiDocumentAdd } from "react-icons/hi";
import SideBarOneElement from './SideBarOneElement';


function SideBarList({ openForm, fetchData }) {
  return (
    <div>
      <ul className="space-y-4">

        <SideBarOneElement icon={HiHome} label="Home" onClick={fetchData} />
        <SideBarOneElement icon={HiDocumentAdd} label="Create Docs" onClick={openForm} />

        {/* Add more items here as needed */}
      </ul>
    </div>
  )
}

export default SideBarList

