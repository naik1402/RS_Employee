import React from 'react'
import './Dashboard.css'
import { Link } from 'react-router-dom';
import empcard from '../assets/images/EmployeeCard.png'
import leavecard from '../assets/images/LeaveCard.png'
import rescard from '../assets/images/ResignationCard.png'

function Dashboard() {
  return (
    <div className='flex gap-4 flex-wrap pt-[100px]'>
      <div className="card blue" >
        <img src={empcard} alt="Employee" className="card-img" />
        <h5>Employee<br />Details</h5>
        <hr />
        <div className='w-full px-2 flex justify-end'> 
        <Link to="/admin/viewEmployeeDetails">
        <button className="px-4 rounded-full view-blue">View →</button>
        </Link>
        </div>
      </div>
      <div className="card green" >
        <img src={leavecard} alt="Leave" className="card-img" />
        <h5>Leaves<br />Details</h5>
        <hr />
        <div className='w-full px-2 flex justify-end'>
        <Link to="/admin/leaveDashboard">
        <button className="px-4 rounded-full view-green">View →</button>
        </Link>
        </div>
      </div>

      <div className="card purple" >
        <img src={rescard} alt="Resignation" className="card-img" />
        <h5>Resignation<br />Details</h5>
        <hr />
        <div className='w-full px-2 flex justify-end'>
        <Link to="/admin/resignation">
        <button className="px-4 rounded-full view-purple ">View →</button>
        </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
