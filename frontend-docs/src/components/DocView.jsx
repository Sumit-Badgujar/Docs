import React from 'react'
import { motion } from "framer-motion";

function DocView({ data, formatedDate, formatedTime, setIsViewing }) {
    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9999]'>
            <motion.div
                className='relative bg-zinc-800 text-white p-8 rounded-lg max-w-xl w-full'
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
            >
                <div className='flex justify-between items-center mb-4'>
                    <h2 className='text-2xl font-semibold'>{data.title}</h2>
                    <button
                        onClick={() => setIsViewing(false)}
                        className='text-xl font-bold bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-purple-700'
                    >
                        &times;
                    </button>
                </div>
                <div className='overflow-y-auto max-h-[50vh]'>
                    <p className='text-lg leading-relaxed'>{data.content}</p>
                </div>
                <div className='mt-4 text-right'>
                    <span className='text-xs text-gray-400'>{formatedDate} at {formatedTime}</span>
                </div>
            </motion.div>
        </div>
    )
}

export default DocView