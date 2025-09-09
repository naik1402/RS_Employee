import React from 'react'
import { Link } from 'react-router-dom';
import empleave from '../assets/images/empleave.png'
import hrleave from '../assets/images/hrleave.png'
import TopBar from './TopBar';

function LeaveDashboard() {
  return (
    <div className="">
      <TopBar tittle={""} />
    <div className="flex gap-[50px] flex-wrap pt-[50px] px-10 bg-black min-h-screen">

  {/* Employee Leave Card */}
  <div className="w-[260px] h-[230px] rounded-[10px] p-[15px] text-white bg-[#9AF99B4A] border border-[#9AF99B] flex flex-col justify-between transition-transform duration-300 hover:scale-[1.02]">
    <img src={empleave} alt="Employee Leave" className="w-[60px] h-[60px] mx-auto mb-1" />
    <h5 className="text-[20px] font-semibold text-center leading-[1.4]">Employee Leave<br />Details</h5>
    <hr className="border-t border-gray-400 w-[90%] mx-auto my-2" />
    <div className="w-full px-2 flex justify-end">
      <Link to="/admin/leaveDashboard/employeeleave">
        <button className="px-4 py-[2px] rounded-full bg-[#41D11AAD] text-white text-sm font-semibold shadow hover:opacity-90">
          View →
        </button>
      </Link>
    </div>
  </div>

  {/* HR Leave Card */}
  <div className="w-[260px] h-[230px] rounded-[10px] p-[15px] text-white bg-[#9AF99B4A] border border-[#9AF99B] flex flex-col justify-between transition-transform duration-300 hover:scale-[1.02]">
    <img src={hrleave} alt="HR Leave" className="w-[60px] h-[60px] mx-auto mb-1" />
    <h5 className="text-[20px] font-semibold text-center leading-[1.4]">HR Leave<br />Details</h5>
    <hr className="border-t border-gray-400 w-[90%] mx-auto my-2" />
    <div className="w-full px-2 flex justify-end">
      <Link to="/admin/leaveDashboard/hrleave">
        <button className="px-4 py-[2px] rounded-full bg-[#41D11AAD] text-white text-sm font-semibold shadow hover:opacity-90">
          View →
        </button>
      </Link>
    </div>
  </div>

</div>


    </div>
  )
}

export default LeaveDashboard
