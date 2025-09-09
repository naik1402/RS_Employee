import React from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../Admin/TopBar';

import calendarIcon from '../assets/images/approvals.png';      // Leaves History icon
import resignationIcon from '../assets/images/folder.png'; // Resignation Details icon

function EmployeeDashboard() {
  return (
    <div >
      <TopBar tittle={"Employee Dashboard"} />

      <div className="flex gap-[50px] flex-wrap pt-[50px] px-10">

        {/* Leaves History */}
        <div className="w-[260px] h-[230px] rounded-[15px] p-[15px] bg-[#3A8D3B4D] border border-[#3A8D3B] text-white flex flex-col justify-between shadow-md hover:scale-105 transition-all duration-200">
          <img src={calendarIcon} alt="Leaves History" className="w-[60px] h-[60px] mx-auto" />
          <h5 className="text-[20px] font-semibold text-center leading-tight mt-2">Leaves<br />History</h5>
          <hr className="border-t border-gray-400 w-[90%] mx-auto my-1" />
          <div className="w-full px-2 flex justify-end">
            <Link to="/employee/employeeleave">
              <button className="px-4 py-[2px] rounded-full bg-[#20C766] text-white text-sm font-semibold shadow hover:opacity-90">
                View →
              </button>
            </Link>
          </div>
        </div>

        {/* Resignation Details */}
        <div className="w-[260px] h-[230px] rounded-[15px] p-[15px] bg-[#AB95F930] border border-[#AB95F9] text-white flex flex-col justify-between shadow-md hover:scale-105 transition-all duration-200">
          <img src={resignationIcon} alt="Resignation Details" className="w-[60px] h-[60px] mx-auto" />
          <h5 className="text-[20px] font-semibold text-center leading-tight mt-2">Resignation<br />Details</h5>
          <hr className="border-t border-gray-400 w-[90%] mx-auto my-1" />
          <div className="w-full px-2 flex justify-end">
            <Link to="/employee/employeeresignation">
              <button className="px-4 py-[2px] rounded-full bg-[#7F56D9] text-white text-sm font-semibold shadow hover:opacity-90">
                View →
              </button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default EmployeeDashboard;

