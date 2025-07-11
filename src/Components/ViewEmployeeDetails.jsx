import React, { useState, useEffect } from 'react';
import './ViewEmployeeDetails.css';
import { MdDeleteForever } from "react-icons/md";
import { FaUserEdit, FaSearch } from "react-icons/fa";
import TopBar from './TopBar';
import AddEmployee from './AddEmployee';
import EditEmployee from './EditEmployee';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { toast } from 'react-toastify';
import EmployeeService from "../ApiServices/EmployeeService";

function ViewEmployeeDetails() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [empToDelete, setEmpToDelete] = useState(null);

  const fetchEmployeeDetails = async()=>{
    EmployeeService.fetchEmployeeDetails()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error);
        toast.error("Failed to fetch employee data!");
      });

  }

  useEffect(() => {
    fetchEmployeeDetails();
  }, []);

 
  const filteredEmployees = employees.filter((emp) => {
    const term = searchTerm.toLowerCase();
    return (
      emp.fullName?.toLowerCase().includes(term) ||
      emp.empId?.toLowerCase().includes(term) ||
      emp.emailId?.toLowerCase().includes(term) ||
      emp.designation?.toLowerCase().includes(term)
    );
  });


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
    EmployeeService.deleteEmployeeById(empToDelete.id)
    .then(() => {
      const updated = employees.filter((e) => e.id !== empToDelete.id);
      setEmployees(updated);
      toast.success("Employee deleted successfully!");
    })
    .catch((error) => {
      console.error("Error deleting employee:", error);
      toast.error("Failed to delete employee!");
    })
    .finally(() => {
      setShowDeleteModal(false);
    });
};


  return (
    <div>
      <TopBar
        tittle="List Of Employee Details"
        btn="Add+"

        onAddClick={() => setShowAddModal(true)}
      />

      <div className="h-full bg-[#94C8FF73] rounded-3xl p-5 mt-7">
        <div className="relative w-full h-full flex justify-end mb-10">
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

        <div className="bg-[#FFFFFFD1] h-[51vh] border border-[#9DCAF908] mt-10 p-4 flex flex-col gap-1 rounded-3xl overflow-y-scroll scroll">
          {filteredEmployees.length === 0 ? (
            <p className="text-center text-gray-600 text-lg">No employees found.</p>
          ) : (
            filteredEmployees.map((emp, index) => (
              <div key={`${emp.Id}-${index}`} className="flex justify-between items-center p-3 bg-[#9DCAF999] rounded-xl">
                <span className="w-1/12 text-center">{index + 1}</span>
                <span className="w-2/12 text-center">{emp.empId}</span>
                <span className="w-2/12 text-center">{emp.fullName}</span>
                <span className="w-3/12 text-center">{emp.emailId}</span>
                <span className="w-2/12 text-center">{emp.mobileNo}</span>
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
          fetchEmployeeDetails={fetchEmployeeDetails}
          
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
          employeeName={empToDelete?.fullName}
        />
      )}
    </div>
  );
}

export default ViewEmployeeDetails;
