import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function TopBar(props) {
  const navigate = useNavigate();
  const location = useLocation();

  const hideAddButton = (
    location.pathname === '/admin/leaveDashboard' ||
    location.pathname === '/admin/leaveDashboard/employeeleave' ||
    location.pathname === '/superadmin' ||
    location.pathname === '/superadmin/approvals' ||
    location.pathname === '/admin/Dashboard' ||
    location.pathname === '/superadmin/approvals/newemployeerequest' ||
    location.pathname === '/superadmin/approvals/employeeleave' ||
    location.pathname === '/superadmin/approvals/resignation' ||
    location.pathname === '/employee'
  );

  return (
    <div className="w-full h-auto p-4 bg-[#63636359] border border-[#636363BF] rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
      
      {/* Back Button */}
      <button
        className="bg-[#FBC42D73] py-2 px-6 text-white text-base md:text-xl border border-[#FBC42D33] rounded-full"
        onClick={() => navigate(-1)}
      >
        Back
      </button>

      {/* Title */}
      <p className="text-white font-bold text-lg md:text-2xl text-center flex-1">{props.tittle}</p>

      {/* Optional Add Button */}
      {!hideAddButton && (
        <button
          onClick={props.onAddClick}
          className="bg-[#FBC42D73] py-2 px-6 text-white text-base md:text-xl border border-[#FBC42D33] rounded-full"
        >
          {props.btn}
        </button>
      )}
    </div>
  );
}

export default TopBar;
