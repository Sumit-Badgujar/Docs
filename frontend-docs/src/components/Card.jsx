import React, { useState } from 'react'
import { IoIosEye } from "react-icons/io";
import { motion } from "framer-motion"
import { MdEditNote } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import dayjs from 'dayjs';
import axios from 'axios';
import NotesForm from './NotesForm';
import DocView from './DocView';
import { toast, Slide } from 'react-toastify';

function Card({ mainDataArr, data, setData, reference }) {

  const formatedDate = dayjs(data.updatedAt || data.createdAt).format('MMMM D, YYYY');
  const formatedTime = dayjs(data.updatedAt || data.createdAt).format('h:mm A');

  const [isEditing, setIsEditing] = useState(false);
  const [isViewing, setIsViewing] = useState(false);

  const showSmallContent = data.content.substring(0, 100) + '...';

  const randomColor = Math.random() > 0.5 ? "bg-purple-600" : "bg-green-600";

  const deleteDoc = async () => {
    try {
      const response = await axios.delete(`51.20.81.139:3000/docs/v1/access/docs/delete/${data._id}`)
      if (response.status === 200) {
        setData(mainDataArr.filter(doc => doc._id !== data._id))

        toast.success('Document successfully deleted', {
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
    } catch (e) {
      toast.error('Error deleting document:', e, {
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

  };
  return (
    <>
      {
        isEditing && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9999]'>
            <NotesForm
              onClose={() => setIsEditing(false)}
              initialTitle={data.title}
              initialContent={data.content}
              docId={data._id}
              setData={setData}
              isEditing={isEditing}
            />
          </div>

        )
      }
      {isViewing && (
        <DocView data={data} formatedDate={formatedDate} formatedTime={formatedTime} setIsViewing={setIsViewing} />
      )}
      < motion.div
        drag
        dragConstraints={reference}
        whileDrag={{ scale: 1.1 }
        }
        dragElastic={1}
        dragTransition={{ bounceStiffness: 100, bounceDamping: 30 }}
        className=' relative flex-shrink-0 w-60 h-72 rounded-[45px] bg-zinc-900/90 text-white py-10 px-8  overflow-hidden cursor-pointer ' >
        <div className='flex justify-between'>
          <MdEditNote className='text-2xl bg-slate-800 rounded-sm  ' onClick={() => setIsEditing(true)} />
          <IoIosEye className='text-lg bg-slate-800 rounded-sm' onClick={() => setIsViewing(true)} />
        </div>
        <p className='text-sm leading-tight mt-5 font-thin overflow-clip '>{showSmallContent}</p>

        <div className='footer absolute bottom-0  w-full left-0'>

          <div className='flex   items-center justify-between py-2  px-8 mb-3'>

            <div className='text-xs font-thin text-sky-300 italic'>
              <span>Updated at:</span>
              <span>{formatedTime}</span>
              <h3>{formatedDate}</h3>
            </div>

            <span className='w-7 h-7 bg-zinc-600 rounded-full   flex items-center justify-center'
              onClick={deleteDoc}
            >
              <AiTwotoneDelete />
            </span>

          </div>
          {
            <div className={`tag w-full py-4 ${randomColor}  `}>
              <h3 className='text-sm flex items-center justify-center font-semibold'>{data.title}</h3>
            </div>
          }


        </div>

      </motion.div >
    </>
  )
}

export default Card

