import React from 'react';
import { Link } from 'react-router-dom';
import empcard from '../assets/images/EmployeeCard.png';
import leavecard from '../assets/images/LeaveCard.png';
import rescard from '../assets/images/ResignationCard.png';
import TopBar from './TopBar';

function Dashboard() {
  return (
    <div>
      <TopBar tittle={"Admin Dashboard"}/>
    <div className="flex gap-[50px] flex-wrap pt-[50px] px-10 bg-black min-h-screen">
      
      {/* Employee Card */}
      <div className="w-[260px] h-[230px] rounded-[10px] p-[15px] text-white bg-[#3d5a80] border border-[#3d5a80] flex flex-col justify-between transition-transform duration-300 hover:scale-[1.02]">
        <img src={empcard} alt="Employee" className="w-[60px] h-[60px] mx-auto mb-1" />
        <h5 className="text-[20px] font-semibold text-center leading-[1.4]">Employee<br />Details</h5>
        <hr className="border-t border-gray-400 w-[90%] mx-auto my-2" />
        <div className="w-full px-2 flex justify-end">
          <Link to="/admin/viewEmployeeDetails">
            <button className="px-4 py-[2px] rounded-full bg-[#007bff] text-white text-sm shadow hover:opacity-90">
              View →
            </button>
          </Link>
        </div>
      </div>

      {/* Leave Card */}
      <div className="w-[260px] h-[230px] rounded-[10px] p-[15px] text-white bg-[#264d2f] border border-[#4caf50] flex flex-col justify-between transition-transform duration-300 hover:scale-[1.02]">
        <img src={leavecard} alt="Leave" className="w-[60px] h-[60px] mx-auto mb-1" />
        <h5 className="text-[20px] font-semibold text-center leading-[1.4]">Leaves<br />Details</h5>
        <hr className="border-t border-gray-400 w-[90%] mx-auto my-2" />
        <div className="w-full px-2 flex justify-end">
          <Link to="/admin/leaveDashboard">
            <button className="px-4 py-[2px] rounded-full bg-[#28a745] text-white text-sm shadow hover:opacity-90">
              View →
            </button>
          </Link>
        </div>
      </div>

      {/* Resignation Card */}
      <div className="w-[260px] h-[230px] rounded-[10px] p-[15px] text-white bg-[#3c2a56] border border-[#6f42c1] flex flex-col justify-between transition-transform duration-300 hover:scale-[1.02]">
        <img src={rescard} alt="Resignation" className="w-[60px] h-[60px] mx-auto mb-1" />
        <h5 className="text-[20px] font-semibold text-center leading-[1.4]">Resignation<br />Details</h5>
        <hr className="border-t border-gray-400 w-[90%] mx-auto my-2" />
        <div className="w-full px-2 flex justify-end">
          <Link to="/admin/resignation">
            <button className="px-4 py-[2px] rounded-full bg-[#6f42c1] text-white text-sm shadow hover:opacity-90">
              View →
            </button>
          </Link>
        </div>
      </div>

    </div>
    </div>
  );
}

export default Dashboard;
