import React, { useState } from 'react';
import './ViewEmployeeDetails.css';
import { MdDeleteForever } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import TopBar from './TopBar';
import AddEmployee from './AddEmployee';
import EditEmployee from './EditEmployee';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { toast } from 'react-toastify';

function ViewEmployeeDetails() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [empToDelete, setEmpToDelete] = useState(null);

  const handleAdd = (newEmp) => {
    setEmployees([...employees, newEmp]);
    toast.success("Employee added successfully!");
  };

  const handleEditClick = (emp) => {
    setEditData(emp);
    setShowEditModal(true);
  };

  const handleUpdate = (updatedEmp) => {
    const updatedList = employees.map((e) =>
      e.empId === updatedEmp.empId ? updatedEmp : e
    );
    setEmployees(updatedList);
    // toast.success("Employee updated successfully!");
  };

  const handleDeleteClick = (emp) => {
    setEmpToDelete(emp);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    const updated = employees.filter((e) => e.empId !== empToDelete.empId);
    setEmployees(updated);
    toast.success("Employee deleted successfully!");
    setShowDeleteModal(false);
  };
  const filteredEmployees = employees.filter((emp) => {
  const term = searchTerm.toLowerCase();
  return (
    emp.name.toLowerCase().includes(term) ||
    emp.empId.toLowerCase().includes(term) ||
    emp.email.toLowerCase().includes(term) ||
    emp.designation.toLowerCase().includes(term)
  );
});


  return (
    <div>
      <TopBar
        tittle="List Of Employee Details"
        btn="Add+"
        onAddClick={() => setShowAddModal(true)}
      />

      <div className="min-h-full bg-[#94C8FF73] rounded-3xl p-5 mt-7">
        <div className="relative w-full flex justify-end mb-10">
          <span className="absolute text-gray-500 mt-4 me-6">
            <FaSearch />
          </span>
          <input
            type="text"
            placeholder="search by name, ID, email or designation"
            className='border rounded-3xl bg-white text-black p-3 w-120'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="bg-[#00D5FF73] text-white rounded-full px-10 py-5 font-semibold flex justify-between items-center">
          <span className="w-1/12 text-center">SL.NO</span>
          <span className="w-2/12 text-center">Employee ID</span>
          <span className="w-2/12 text-center">Employee Name</span>
          <span className="w-3/12 text-center">Employee Email</span>
          <span className="w-2/12 text-center">Employee Mobile</span>
          <span className="w-2/12 text-center">Designation</span>
          <span className="w-2/12 text-center">Action</span>
        </div>

        <div className="bg-[#FFFFFFD1] border border-[#9DCAF908] mt-10 p-4 flex flex-col gap-1 rounded-3xl">
          {filteredEmployees.length=== 0 ? (
            <p className="text-center text-gray-600 text-lg">No employees found.</p>
          ) : (
            filteredEmployees.map((emp, index) => (
              <div key={emp.empId} className="flex justify-between items-center p-3 bg-[#9DCAF999] rounded-xl">
                <span className="w-1/12 text-center">{index + 1}</span>
                <span className="w-2/12 text-center">{emp.empId}</span>
                <span className="w-2/12 text-center">{emp.name}</span>
                <span className="w-3/12 text-center">{emp.email}</span>
                <span className="w-2/12 text-center">{emp.mobile}</span>
                <span className="w-2/12 text-center">{emp.designation}</span>
                <span className="w-2/12 text-center">
                  <button className="text-[#A18008D1] text-3xl px-2 py-1 rounded" onClick={() => handleEditClick(emp)}>
                    <FaUserEdit />
                  </button>
                  <button className="text-red-500 text-3xl px-2 py-1 rounded" onClick={() => handleDeleteClick(emp)}>
                    <MdDeleteForever />
                  </button>
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {showAddModal && (
        <AddEmployee
          onClose={() => setShowAddModal(false)}
          onSave={handleAdd}
        />
      )}

      {showEditModal && (
        <EditEmployee
          onClose={() => setShowEditModal(false)}
          onUpdate={handleUpdate}
          initialData={editData}
        />
      )}

      {showDeleteModal && (
        <DeleteConfirmationModal
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
          employeeName={empToDelete?.name}
        />
      )}
    </div>
  );
}

export default ViewEmployeeDetails;
