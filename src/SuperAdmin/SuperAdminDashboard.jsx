import React from 'react';
import { Link } from 'react-router-dom';
import empDetailsIcon from '../assets/images/empicon.png';
import approvalsIcon from '../assets/images/approvals.png';
import TopBar from '../Admin/TopBar';

function SuperAdminDashboard() {
  return (
    <div>
      <TopBar tittle={"SuperAdmin Dashboard"}/>
    <div className="flex gap-[50px] flex-wrap pt-[50px] px-10 bg-black min-h-screen">
      
      {/* Employee Details Card */}
      <div className="w-[260px] h-[230px] rounded-[10px] p-[15px] text-white bg-gradient-to-b from-[#94C8FF73] to-[#345F8C] border border-white/20 flex flex-col justify-between transition-transform duration-300 hover:scale-[1.02] shadow-lg">
        <img src={empDetailsIcon} alt="Employee Details" className="w-[60px] h-[60px] mx-auto mb-1" />
        <h5 className="text-[20px] font-semibold text-center leading-[1.4]">Employee<br />Details</h5>
        <hr className="border-t border-gray-300 w-[90%] mx-auto my-2" />
        <div className="w-full px-2 flex justify-end">
          <Link to="/admin/ViewEmployeeDetails">
            <button className="px-4 py-[2px] rounded-full bg-[#007BFF] text-white text-sm font-semibold shadow hover:opacity-90">
              View →
            </button>
          </Link>
        </div>
      </div>

      {/* Approvals Card */}
      <div className="w-[260px] h-[230px] rounded-[10px] p-[15px] text-white bg-gradient-to-b from-[#FFFFFF6B] to-[#888888] border border-white/20 flex flex-col justify-between transition-transform duration-300 hover:scale-[1.02] shadow-lg">
        <img src={approvalsIcon} alt="Approvals" className="w-[60px] h-[60px] mx-auto mb-1" />
        <h5 className="text-[20px] font-semibold text-center leading-[1.4]">Approvals</h5>
        <hr className="border-t border-gray-300 w-[90%] mx-auto my-2" />
        <div className="w-full px-2 flex justify-end">
          <Link to="/superadmin/approvals">
            <button className="px-4 py-[2px] rounded-full bg-white text-black text-sm font-semibold shadow hover:bg-gray-300">
              View →
            </button>
          </Link>
        </div>
      </div>

    </div>
    </div>
  );
}

export default SuperAdminDashboard;
