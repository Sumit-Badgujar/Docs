import { FaRegFileAlt } from "react-icons/fa";



import React, { useState } from 'react';
import { GrFormClose } from "react-icons/gr";
import axios from "axios";

function NotesFrom({ onClose }) {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/docs/v1/access/docs/create', {
        title,
        content
      });
      console.log(response.data.message);
      alert('Document created successfully!');
      onClose();
      // Add form submission logic here (e.g., sending data to an API)
    } catch (error) {
      console.error('Error creating document:', error);
    };


    return (
      <div className='flex justify-center items-center w-full h-full '>
        <form
          action=""
          onSubmit={handleSubmit}
          className='flex flex-col gap-8 p-10 bg-zinc-900/90 rounded-3xl shadow-lg w-4/5 h-4/5 max-w-3xl'
        >
          <div className='bg-purple-600 text-xl p-1 mx-auto flex flex-row-reverse rounded-full'
            onClick={onClose} >
            <GrFormClose />
          </div>
          <input
            type="text"
            placeholder='Title of Document'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='p-4 rounded-xl bg-slate-300 text-center font-semibold text-2xl w-full'
          />
          <textarea
            name="docs-note"
            rows="12"
            id="main-note-textArea"
            placeholder='Start typing your Document here...'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className='p-4 rounded-xl bg-slate-300 font-light text-lg w-full resize-none'
          />
          <button
            type="submit"
            className='bg-purple-600 px-5 py-4 rounded-[45px] my-5 mx-auto w-2/5 text-center text-white font-semibold text-lg hover:bg-purple-700, hover:scale-105 flex  gap-2 items-center justify-center'
          >
            < FaRegFileAlt />
            Create Doc
          </button>
        </form>
      </div>
    );
  }
}

export default NotesFrom;
