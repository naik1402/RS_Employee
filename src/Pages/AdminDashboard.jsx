import React from 'react'
// import logo from '../assets/react.svg'

import { Outlet } from 'react-router-dom';
import SideBar from '../Admin/SideBar';



function AdminDashboard() {
  return (
    <div className='w-screen h-screen flex items-center'>
         <div className="w-[98%] h-[96%] mx-auto rounded-xl flex gap-3 ">
      <SideBar />
      <div className="w-full h-full overflow-hidden rounded-2xl" >
        <Outlet />
      </div>
    </div>
    </div>
  )
}

export default AdminDashboard
