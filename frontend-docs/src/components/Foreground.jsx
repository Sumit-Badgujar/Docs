import React, { useEffect, useRef, useState } from 'react';
import Card from './Card';
import { HiArrowSmRight } from "react-icons/hi";
import Sidebar from './Sidebar';
import NotesForm from './NotesForm';
import axios from 'axios';
import { toast, Slide } from 'react-toastify';

function Foreground() {
  const ref = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [data, setData] = useState([]);

  async function fetchData() {
    try {
      const response = await axios.get('http://api/docs/v1/access/docs/getall');
      setData(response.data.docs)
      toast.success('Documents Fetched successfully ! ', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide,
      });
    } catch (err) {
      // console.log('Error fetching data' + err);
      toast.error(`Error while fetching document:{e}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  // console.log(data);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const openForm = () => {
    // console.log('openForm called');
    setIsFormOpen(true);
  }
  const closeForm = () => setIsFormOpen(false);

  return (
    <div ref={ref} className='fixed z-[3] top-0 left-0 w-full h-full p-5 flex gap-5 flex-wrap'>

      <Sidebar isSidebarOpen={isSidebarOpen} closeSidebar={toggleSidebar} openForm={openForm} fetchData={fetchData} />

      <HiArrowSmRight
        onClick={toggleSidebar}
        className={`fixed bg-slate-100 rounded-full top-5 left-5 z-[4] cursor-pointer text-4xl transform ${isSidebarOpen ? 'rotate-180' : ''} transition-transform duration-300 ease-in-out`}
      />

      {
        isFormOpen && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9999]'>
            <NotesForm onClose={closeForm} />
          </div>
        )
      }

      {data.map((items, index) => (
        <Card key={items._id} data={items} mainDataArr={data} setData={setData} reference={ref} />
      ))}
    </div>
  );
}

export default Foreground;
