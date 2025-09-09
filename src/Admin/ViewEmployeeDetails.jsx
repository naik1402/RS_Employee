import React, { useState, useEffect } from 'react';
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

  const fetchEmployeeDetails = async () => {
    EmployeeService.fetchEmployeeDetails()
      .then((response) => {
        setEmployees(response.data.employees);
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error);
        toast.error("Failed to fetch employee data!");
      });
  };

  useEffect(() => {
    fetchEmployeeDetails();
  }, []);

  const filteredEmployees = employees.filter((emp) => {
    const term = searchTerm.toLowerCase();
    return (
      emp.name?.toLowerCase().includes(term) ||
      emp.empId?.toLowerCase().includes(term) ||
      emp.email?.toLowerCase().includes(term) ||
      emp.mobile?.toLowerCase().includes(term) ||
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
  };

  const handleDeleteClick = (emp) => {
    setEmpToDelete(emp);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
  if (!empToDelete?.empId) {
    toast.error("No employee selected to delete!");
    return;
  }

  EmployeeService.deleteEmployeeById(empToDelete.empId)
    .then(() => {
      const updated = employees.filter((e) => e.empId !== empToDelete.empId);
      setEmployees(updated);
      toast.success("Employee deleted successfully!");
    })
    .catch((error) => {
      console.error("Error deleting employee:", error);
      toast.error("Failed to delete employee!");
    })
    .finally(() => {
      setShowDeleteModal(false);
      setEmpToDelete(null);
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
        {/* Search Input */}
        <div className="relative w-full flex justify-end mb-10">
          <span className="absolute text-gray-500 mt-4 me-6">
            <FaSearch />
          </span>
          <input
            type="text"
            placeholder="search by name, ID, email or designation"
            className='border rounded-3xl bg-white text-black p-3 w-[30rem]'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Scrollable Table-Like Layout */}
        <div className="overflow-x-auto">
          {/* Header */}
          <div className="bg-[#00D5FF73] text-white rounded-full px-10 py-5 font-semibold min-w-[900px] flex justify-between items-center">
            <span className="w-24 text-center">SL.NO</span>
            <span className="w-40 text-center">Employee ID</span>
            <span className="w-48 text-center">Employee Name</span>
            <span className="w-60 text-center">Employee Email</span>
            <span className="w-48 text-center">Employee Mobile</span>
            <span className="w-40 text-center">Designation</span>
            <span className="w-32 text-center">Action</span>
          </div>

          {/* Rows */}
          <div className="bg-white h-[51vh] border border-[#9DCAF908] mt-5 p-4 flex flex-col gap-2 rounded-3xl overflow-y-scroll scrollbar-hide min-w-[900px]">
            {filteredEmployees.length === 0 ? (
              <p className="text-center text-gray-600 text-lg">No employees found.</p>
            ) : (
              filteredEmployees.map((emp, index) => (
                <div key={`${emp.empId}-${index}`} className="flex justify-between items-center p-3 bg-[#9DCAF999] rounded-xl">
                  <span className="w-24 text-center">{index + 1}</span>
                  <span className="w-40 text-center">{emp.empId}</span>
                  <span className="w-48 text-center">{emp.name}</span>
                  <span className="w-60 text-center">{emp.email}</span>
                  <span className="w-48 text-center">{emp.mobile}</span>
                  <span className="w-40 text-center">{emp.designation}</span>
                  <span className="w-32 text-center">
                    <button
                      className="text-yellow-600 text-2xl px-2 py-1 rounded"
                      onClick={() => handleEditClick(emp)}
                    >
                      <FaUserEdit />
                    </button>
                    <button
                      className="text-red-500 text-2xl px-2 py-1 rounded"
                      onClick={() => handleDeleteClick(emp)}
                    >
                      <MdDeleteForever />
                    </button>
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
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
          employeeName={empToDelete?.name}
        />
      )}
    </div>
  );
}

export default ViewEmployeeDetails;
