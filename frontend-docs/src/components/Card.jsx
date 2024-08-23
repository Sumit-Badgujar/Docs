import React from 'react'
import { LuDownload } from "react-icons/lu";
import { IoCloseSharp } from "react-icons/io5";
import { motion } from "framer-motion"
import { MdEditNote } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import dayjs from 'dayjs';
import axios from 'axios';


function Card({ mainDataArr, data, setData, reference }) {

  const formatedDate = dayjs(data.updatedAt || data.createdAt).format('MMMM D, YYYY');
  const formatedTime = dayjs(data.updatedAt || data.createdAt).format('h:mm A');

  const deleteDoc = async () => {
    try {
      const response = await axios.delete(`http://localhost:3000/docs/v1/access/docs/delete/${data._id}`)
      if (response.status === 200) {
        // const response = await axios.get('http://localhost:3000/docs/v1/access/docs/getall');
        setData(mainDataArr.filter(doc => doc._id !== data._id))

        console.log('Document successfully deleted');
      }
    } catch (e) {
      console.error('Error deleting document:', e);
    }

  };
  return (
    <motion.div
      drag
      dragConstraints={reference}
      whileDrag={{ scale: 1.1 }}
      dragElastic={1}
      dragTransition={{ bounceStiffness: 100, bounceDamping: 30 }}
      className=' relative flex-shrink-0 w-60 h-72 rounded-[45px] bg-zinc-900/90 text-white py-10 px-8  overflow-hidden cursor-pointer '>
      <MdEditNote className='text-2xl bg-slate-800 rounded-sm  ' />
      <p className='text-sm leading-tight mt-5 font-thin overflow-clip '>{data.content}</p>

      <div className='footer absolute bottom-0  w-full left-0'>

        <div className='flex   items-center justify-between py-2  px-8 mb-3'>

          <div className='text-xs font-thin text-sky-300 italic'>
            <span>Updated at:</span>
            <span>{formatedTime}</span>
            <h3>{formatedDate}</h3>
          </div>

          <span className='w-7 h-7 bg-zinc-600 rounded-full flex items-center justify-center'
            onClick={deleteDoc}
          >
            {/* {data.close ? <IoCloseSharp /> : <LuDownload  size='.7em' color='#fff'/> } */}
            <AiTwotoneDelete />
          </span>

        </div>
        {
          <div className={`tag w-full py-4 ${(data._id % 2) == 0 ? "bg-blue-600" : "bg-green-600"}  `}>
            <h3 className='text-sm flex items-center justify-center font-semibold'>{data.title}</h3>
          </div>

        }


      </div>

    </motion.div>
  )
}

export default Card
