// src/Pages/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import superimg from '../assets/images/SuperAdmin.png';
import adminimg from '../assets/images/adminicon.png';
import empimg from '../assets/images/empicon.png';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex gap-[50px] flex-wrap pt-[115px] px-10 bg-black min-h-screen">
      
      {/* Super Admin Card */}
      <div className="w-[260px] h-[230px] rounded-[10px] p-[15px] text-white bg-[#94C8FF73] border border-[#94C8FFDB] flex flex-col justify-between transition-transform duration-300 hover:scale-[1.02]">
        <img src={superimg} alt="Super Admin" className="w-[60px] h-[60px] mx-auto mb-1" />
        <h5 className="text-[20px] font-semibold text-center leading-[1.4]">Super Admin</h5>
        <hr className="border-t border-gray-400 w-[90%] mx-auto my-2" />
        <div className="w-full px-2 flex justify-end">
          <button
            className="px-4 py-[2px] rounded-full bg-[#007BFF] text-white text-sm font-semibold shadow hover:opacity-90"
            onClick={() => navigate('/superadmin')}
          >
            View →
          </button>
        </div>
      </div>

      {/* Admin Card */}
      <div className="w-[260px] h-[230px] rounded-[10px] p-[15px] text-white bg-[#9AF99B4A] border border-[#9AF99B] flex flex-col justify-between transition-transform duration-300 hover:scale-[1.02]">
        <img src={adminimg} alt="Admin" className="w-[60px] h-[60px] mx-auto mb-1" />
        <h5 className="text-[20px] font-semibold text-center leading-[1.4]">Admin</h5>
        <hr className="border-t border-gray-400 w-[90%] mx-auto my-2" />
        <div className="w-full px-2 flex justify-end">
          <button
            className="px-4 py-[2px] rounded-full bg-[#41D11AAD] text-white text-sm font-semibold shadow hover:opacity-90"
            onClick={() => navigate('/admin/Dashboard')}
          >
            View →
          </button>
        </div>
      </div>

      {/* Employee Card */}
      <div className="w-[260px] h-[230px] rounded-[10px] p-[15px] text-white bg-[#AB95F959] border border-[#AB95F9BA] flex flex-col justify-between transition-transform duration-300 hover:scale-[1.02]">
        <img src={empimg} alt="Employee" className="w-[60px] h-[60px] mx-auto mb-1" />
        <h5 className="text-[20px] font-semibold text-center leading-[1.4]">Employee</h5>
        <hr className="border-t border-gray-400 w-[90%] mx-auto my-2" />
        <div className="w-full px-2 flex justify-end">
          <button
            className="px-4 py-[2px] rounded-full bg-[#7603AB] text-white text-sm font-semibold shadow hover:opacity-90"
            onClick={() => navigate('/employee')}
          >
            View →
          </button>
        </div>
      </div>

    </div>
  );
}

export default Home;
