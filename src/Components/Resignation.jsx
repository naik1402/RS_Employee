import React, { useState } from 'react';
import TopBar from './TopBar';
import ApplyResignation from './ApplyResignation'; // ⬅️ Import the modal component

const Resignation = () => {
  const [showModal, setShowModal] = useState(false);
  const [employees, setEmployees] = useState([
    {
      id: '101',
      name: 'Nirmal Naik',
      reason: 'sick',
      stdt: '21/06/2025',
      endt: '25/06/2025',
    },
    {
      id: '102',
      name: 'Rohit Dash',
      reason: 'cold & fever',
      stdt: '21/06/2025',
      endt: '25/06/2025',
    },
  ]);

  const handleAddResignation = (reason) => {
    const newEmp = {
      id: Date.now().toString(),
      name: 'Demo User',
      reason,
      stdt: '26/06/2025',
      endt: '26/07/2025',
    };
    setEmployees((prev) => [...prev, newEmp]);
  };

  return (
    <div>
      <TopBar
        tittle="List of Resignation Details"
        btn="Apply Resignation"
        onAddClick={() => setShowModal(true)}
      />

      {showModal && (
        <ApplyResignation
          onClose={() => setShowModal(false)}
          onSubmit={handleAddResignation}
        />
      )}

      <div className="min-h-full bg-[#AB95F947] rounded-3xl p-5 mt-7">
        <div className="w-full flex justify-end mb-10">
          <input
            type="text"
            placeholder="search by name, ID, email or designation"
            className="border rounded-3xl bg-white text-black p-3 w-120"
          />
        </div>

        <div className="bg-[#AB95F991] text-white rounded-full px-10 py-5 font-semibold flex justify-between items-center">
          <span className="w-1/12 text-center">SL.NO</span>
          <span className="w-2/12 text-center">Employee ID</span>
          <span className="w-2/12 text-center">Employee Name</span>
          <span className="w-3/12 text-center">Reason for Leaving</span>
          <span className="w-2/12 text-center">Start Date</span>
          <span className="w-2/12 text-center">End Date</span>
          <span className="w-2/12 text-center">Status</span>
        </div>

        <div className="bg-[#FFFFFFD1] border border-[#9DCAF908] mt-10 p-4 flex flex-col gap-1 rounded-3xl">
          {employees.map((emp, index) => (
            <div
              key={emp.id}
              className="flex justify-between items-center p-3 bg-[#AB95F987] rounded-xl"
            >
              <span className="w-1/12 text-center">{index + 1}</span>
              <span className="w-2/12 text-center">{emp.id}</span>
              <span className="w-2/12 text-center">{emp.name}</span>
              <span className="w-3/12 text-center">{emp.reason}</span>
              <span className="w-2/12 text-center">{emp.stdt}</span>
              <span className="w-2/12 text-center">{emp.endt}</span>
              <span className="w-2/12 text-center">
                <p>Approved</p>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resignation;
