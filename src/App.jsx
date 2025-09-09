
import './App.css'
import Home from './Pages/Home';
import SuperAdminDashboard from './SuperAdmin/SuperAdminDashboard';
import ApprovalsRequests from './SuperAdmin/ApprovalsRequests';
import ResignationRequest from './SuperAdmin/ResignationRequest'
import Dashboard from './Admin/Dashboard'
import ViewEmployeeDetails from './Admin/ViewEmployeeDetails'
import LeaveDashboard from './Admin/LeaveDashboard'
import Resignation from './Admin/Resignation'
import EmployeeLeave from './Admin/EmployeeLeaveDetails'
import HrLeave from './Admin/HRLeaveDetails'
import AdminDashboard from './Pages/AdminDashboard'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Route,Routes } from 'react-router-dom'
import NewEmployeeRequests from './SuperAdmin/NewEmployeeRequest';
import EmployeeLeaveDetails from './SuperAdmin/EmployeeLeaveDetails';
import EmployeeDashboard from './Employee/EmployeeDashboard';
import EmployeeSelfLeaveDetails from './Employee/EmployeeSelfLeaveDetails';
import EmployeeSelfResignation from './Employee/EmployeeSelfResignation';


function App() {

  return (
    <div className='w-screen h-auto overflow-x-hidden m-0 p-0 border-box bg-black'>
     <Routes>
        <Route element={<AdminDashboard />}>
          <Route path="/" element={<Home />} />
          <Route path="/superadmin" element={<SuperAdminDashboard />} />   
          <Route path="/superadmin/approvals" element={<ApprovalsRequests />} />
          <Route path="/superadmin/approvals/newemployeerequest" element={<NewEmployeeRequests />} />    
          <Route path="/superadmin/approvals/employeeleave" element={<EmployeeLeaveDetails/>}/> 
          <Route path="/superadmin/approvals/resignation" element={<ResignationRequest/>} />        
          <Route path="/admin/Dashboard" element={<Dashboard />} />
          <Route path="/admin/viewEmployeeDetails" element={<ViewEmployeeDetails />} />
          <Route path="/admin/leaveDashboard" element={<LeaveDashboard />} />
          <Route path="/admin/leaveDashboard/employeeleave" element={<EmployeeLeave />} />
          <Route path="/admin/leaveDashboard/hrleave" element={<HrLeave />} />
          <Route path="/admin/resignation" element={<Resignation />} />
          <Route path="/employee" element={<EmployeeDashboard/>} />
          <Route path="/employee/employeeleave" element={<EmployeeSelfLeaveDetails/>} />
          <Route path="/employee/employeeresignation" element={<EmployeeSelfResignation/>}/>
        </Route>
      </Routes>
     <ToastContainer />
    </div>
  )
}

export default App
