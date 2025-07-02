import React from 'react'
import { Link } from 'react-router-dom';
import './LeaveDashboard.css'
import empleave from '../assets/images/empleave.png'
import hrleave from '../assets/images/hrleave.png'
import TopBar from './TopBar';

function LeaveDashboard() {
  return (
    <div className="">
      <TopBar tittle={""} />
    <div className=' flex gap-4 flex-wrap pt-[30px]'>
      <div className='cardleave'>
        <div><img src={empleave} alt="" /></div>
        <h5>Employee Leave<br />Details</h5>
        <hr className='w-[90%] mx-auto'/>
        <div className='w-full px-2 flex justify-end'> 
        <Link to="/admin/leaveDashboard/employeeleave">
        <button className="px-4 rounded-full view-green mb-[8px]">View →</button>
        </Link>
        </div>
      </div>
      <div className='cardleave'>
        <img src={hrleave} alt="" />
        <h5 >HR Leave<br />Details</h5>
        <hr className='w-[90%] mx-auto' />
        <div className='w-full px-2 flex justify-end'>
        <Link to="/admin/leaveDashboard/hrleave">
        <button className="px-4 rounded-full view-green mb-[8px]">View →</button>
        </Link>
        </div>
      </div>
      
    </div>
    </div>
  )
}

export default LeaveDashboard
