import React from 'react'
import { Link } from 'react-router-dom';
import { IoHomeOutline } from "react-icons/io5";
import rslogo from '../assets/images/rslogo.jpeg'

function SideBar() {
  return (
        <div className='w-[17%] bg-[#70707070] blur-[28%] h-full rounded-2xl p-[1rem]'>
          {/* <img src="/vite.svg" alt="ramanasoft" className='w-[10]'/> */}
            <div className='flex flex-col items-center '>
            {/* <p className='text-white font-bold text-2xl'><i>RAMANASOFT</i></p>
            <p className='text-white font-bold text-md'><i>consulting</i></p> */}
            <img src={rslogo} alt="" className='border rounded-xl' />
            </div>
            <div className="pt-10">
                <div className='flex items-center justify-center gap-5 border border-[#C5B130B8] p-2 rounded-3xl bg-[#C5B1304D]'>
                    <span className='text-2xl text-white'><IoHomeOutline /></span>
                    <Link to="/admin/Dashboard">
                    <button className='text-white text-md' >Dashboard</button>
                    </Link>
                </div>
            </div>
        
      </div>
      
   
  )
}

export default SideBar
