import React, { useState } from 'react';
import TopBar from './TopBar';
import { MdDeleteForever } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import LeavePopup from './LeavePopup'; // 👈 Import the popup

const employees = [
  {
    id: '101',
    name: 'Nirmal Naik',
    reason: 'sick',
    stdt: '21/06/2025',
    endt: '25/06/2025',
    sts: 'Pending',
  },
  {
    id: '102',
    name: 'Rohit Dash',
    reason: 'cold & fever',
    stdt: '21/06/2025',
    endt: '25/06/2025',
    sts: 'Approved',
  },
];

function HRLeaveDetails() {
  const [showPopup, setShowPopup] = useState(false); // 👈 State for popup

  return (
    <div>
      <TopBar
        tittle={"List of Hr Leave Details"}
        btn={"Apply Leave"}
        onAddClick={() => setShowPopup(true)} // 👈 Show popup
      />

      {showPopup && <LeavePopup onClose={() => setShowPopup(false)} />} {/* 👈 Render popup */}

      {/* 🟢 NO CHANGES to rest of your original content */}
      <div className="min-h-full bg-[#9AF99B52] rounded-3xl p-5 mt-7">
        <div className="w-full flex justify-end mb-10">
          <input
            type="text"
            placeholder="search by name, ID, email or designation"
            className='border rounded-3xl bg-[white] text-black p-3 w-120 '
          />
        </div>

        {/* Table Header */}
        <div className="bg-[#278B4A99] text-white rounded-full px-10 py-5 font-semibold flex justify-between items-center">
          <span className="w-1/12 text-center">SL.NO</span>
          <span className="w-2/12 text-center">Employee ID</span>
          <span className="w-2/12 text-center">Employee Name</span>
          <span className="w-3/12 text-center">Reason for Leaving</span>
          <span className="w-2/12 text-center">Start Date</span>
          <span className="w-2/12 text-center">End Date</span>
          <span className="w-2/12 text-center">Status</span>
          <span className="w-2/12 text-center">Action</span>
        </div>

        {/* Table Rows */}
        <div className="bg-[#FFFFFFD1] border border-[#9DCAF908] mt-10 p-4 flex flex-col gap-1 rounded-3xl">
          {employees.map((emp, index) => (
            <div key={emp.id} className="flex justify-between items-center p-3 bg-[#9AF99B91] rounded-xl">
              <span className="w-1/12 text-center">{index + 1}</span>
              <span className="w-2/12 text-center">{emp.id}</span>
              <span className="w-2/12 text-center">{emp.name}</span>
              <span className="w-3/12 text-center">{emp.reason}</span>
              <span className="w-2/12 text-center">{emp.stdt}</span>
              <span className="w-2/12 text-center">{emp.endt}</span>
              <span className="w-2/12 text-center">{emp.sts}</span>
              <span className="w-2/12 text-center">
                <button className="text-[#A18008D1] text-3xl px-2 py-1 rounded hover:">
                  <FaUserEdit />
                </button>
                <button className="text-red-500 text-3xl px-2 py-1 rounded hover:">
                  <MdDeleteForever />
                </button>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HRLeaveDetails;
