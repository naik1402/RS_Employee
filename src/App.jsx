
import './App.css'
import Dashboard from './Components/Dashboard'
import ViewEmployeeDetails from './Components/ViewEmployeeDetails'
import LeaveDashboard from './Components/LeaveDashboard'
import Resignation from './Components/Resignation'
import EmployeeLeave from './Components/EmployeeLeaveDetails'
import HrLeave from './Components/HRLeaveDetails'
import AdminDashboard from './Pages/AdminDashboard'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Route,Routes } from 'react-router-dom'


function App() {

  return (
    <div className='w-screen h-auto overflow-x-hidden m-0 p-0 border-box bg-black'>
     <Routes>
      <Route element={<AdminDashboard />}>
        <Route path='admin/Dashboard' element={<Dashboard/>}></Route>
         <Route path='admin/viewEmployeeDetails' element={<ViewEmployeeDetails/>}></Route>
          <Route path='admin/leaveDashboard' element={<LeaveDashboard/>}></Route>
            <Route path='admin/leaveDashboard/employeeleave' element={<EmployeeLeave/>}></Route>
            <Route path='admin/leaveDashboard/hrleave' element={<HrLeave/>}></Route>
           <Route path='admin/resignation' element={<Resignation/>}></Route>
      </Route>
     </Routes>
     <ToastContainer />
    </div>
  )
}

export default App
