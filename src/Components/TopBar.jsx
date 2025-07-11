import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function TopBar(props) {
  const navigate = useNavigate();
  const location = useLocation();

  const hideAddButton = (
    location.pathname === '/admin/leaveDashboard' ||
    location.pathname === '/admin/leaveDashboard/employeeleave'
  );

  return (
    <div className='w-full h-auto p-3 bg-[#63636359] border border-[#636363BF] rounded-2xl flex justify-between items-center'>
      <button className='bg-[#FBC42D73] py-2 px-10 text-white text-xl border border-[#FBC42D33] rounded-full' onClick={() => navigate(-1)}>
        Back
      </button>
        <p className="w-full text-2xl text-white font-bold text-center">{props.tittle}</p>
      {!hideAddButton && (
        <button
          onClick={props.onAddClick}
          className="bg-[#FBC42D73] py-2 px-10 text-white text-xl border border-[#FBC42D33] rounded-full"
        >
          {props.btn}
        </button>
      )}
    </div>
  );
}

export default TopBar;
