import React from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../Admin/TopBar';

import newemp from '../assets/images/nei.png'; // replace with your actual image path
import empleave from '../assets/images/SuperAdmin.png';
import resignation from '../assets/images/approvals.png';

function ApprovalsRequests() {
  return (
    <div className="">
      <TopBar tittle={"Approval Requests"}/>

      <div className="flex gap-[50px] flex-wrap pt-[50px] px-10 bg-black min-h-screen">

        {/* New Employee Requests */}
        <div className="w-[260px] h-[230px] rounded-[10px] p-[15px] text-white bg-[#FFFFFF61] border border-gray-400 flex flex-col justify-between transition-transform duration-300 hover:scale-[1.02]">
          <img src={newemp} alt="New Employee" className="w-[60px] h-[60px] mx-auto mb-1" />
          <h5 className="text-[20px] font-semibold text-center leading-[1.4]">New Employees<br />Requests</h5>
          <hr className="border-t border-gray-400 w-[90%] mx-auto my-2" />
          <div className="w-full px-2 flex justify-end">
            <Link to="/superadmin/approvals/newemployeerequest">
              <button className="px-4 py-[2px] rounded-full bg-[#D4D4D4] text-black text-sm font-semibold shadow hover:opacity-90">
                View →
              </button>
            </Link>
          </div>
        </div>

        {/* Leave Requests */}
        <div className="w-[260px] h-[230px] rounded-[10px] p-[15px] text-white bg-[#59D9862B] border border-[#40F672A3] flex flex-col justify-between transition-transform duration-300 hover:scale-[1.02]">
          <img src={empleave} alt="Leave Request" className="w-[60px] h-[60px] mx-auto mb-1" />
          <h5 className="text-[20px] font-semibold text-center leading-[1.4]">Leave<br />Requests</h5>
          <hr className="border-t border-gray-400 w-[90%] mx-auto my-2" />
          <div className="w-full px-2 flex justify-end">
            <Link to="/superadmin/approvals/employeeleave">
              <button className="px-4 py-[2px] rounded-full bg-[#1752F9] text-white text-sm font-semibold shadow hover:opacity-90">
                View →
              </button>
            </Link>
          </div>
        </div>

        {/* Resignation Requests */}
        <div className="w-[260px] h-[230px] rounded-[10px] p-[15px] text-white bg-[#AB95F947] border border-[#BB9BEE] flex flex-col justify-between transition-transform duration-300 hover:scale-[1.02]">
          <img src={resignation} alt="Resignation Request" className="w-[60px] h-[60px] mx-auto mb-1" />
          <h5 className="text-[20px] font-semibold text-center leading-[1.4]">Resignation<br />Requests</h5>
          <hr className="border-t border-gray-400 w-[90%] mx-auto my-2" />
          <div className="w-full px-2 flex justify-end">
            <Link to="/superadmin/approvals/resignation">
              <button className="px-4 py-[2px] rounded-full bg-[#BB66F3] text-white text-sm font-semibold shadow hover:opacity-90">
                View →
              </button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ApprovalsRequests;
