import React from 'react';
import { Link } from 'react-router-dom';
import { IoHomeOutline } from "react-icons/io5";
import rslogo from '../assets/images/rslogo.jpeg';

function SideBar() {
  return (
    <div className='w-full sm:w-[250px] bg-[#70707070] h-full rounded-2xl p-4'>
      <div className='flex flex-col items-center'>
        <img src={rslogo} alt="RS Logo" className='border rounded-xl w-[100%]' />
      </div>
      <div className="pt-10">
        {/* Make entire div clickable */}
        <Link to="/" className="block">
          <div className='flex items-center justify-center gap-5 border border-[#C5B130B8] p-2 rounded-3xl bg-[#C5B1304D] hover:cursor-pointer'>
            <span className='text-2xl text-white'><IoHomeOutline /></span>
            <button className='text-white text-md'>Dashboard</button>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default SideBar;
