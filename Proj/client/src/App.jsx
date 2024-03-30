import './App.css'
import { Routes, Route } from 'react-router-dom';
import Navbar from '../src/components/Navbar';
import Home from '../src/pages/Home';
import Signup from './pages/Signup';
import Login from '../src/pages/Login';
import ResetPwd from './pages/resetPwd';
import ResetFinalPwd from './pages/resetPg2'
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { UserContextProvider } from '../context/userContext';
import Dashboard from './pages/Admin/Dashboard';
import AssessFeedback from './pages/Admin/AssessFeedback';
import CreateAssessment from './pages/Admin/CreateAssessment';
import EmployeeData from './pages/Admin/EmployeeData';
import AdminSettings from './pages/Admin/AdminSettings';
import ForgetSecurityImage from './pages/forgetsecimg'
import AboutEmployee from './pages/Employee/About'
import EmployeeDashboard from './pages/Employee/EmpDashboard';
import Feedback from './pages/Employee/Feedback';
import FeedbackForm from './pages/Employee/FeedbackForm';
import UserProfile from './pages/UserProfile';
import EmployeeSettings from './pages/Employee/EmployeeSettings';
import DevelopmentPlans from './pages/Employee/DevelopmentPlans';
import AboutAdmin from './pages/Admin/AboutAdmin';
<<<<<<< HEAD
import EmployeePerformance from './pages/Admin/EmployeePerformance';
import ComplaintForm from './pages/Employee/ComplaintForm';
import PendingAssessments from './pages/Employee/PendingAssessments';
=======
import AdminProfile from './pages/Admin/AdminProfile';
>>>>>>> settings-branch

axios.defaults.baseURL = 'http://localhost:8000/';
axios.defaults.withCredentials = true

function App() {
    return (
        <UserContextProvider>
            <Toaster position='bottom-right' toastOptions={{ duration: 2000 }} />
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/login' element={<Login />} />

                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/dashboard/performance' element={<EmployeePerformance/>} />
                <Route path='/assess_feedback' element={<AssessFeedback />} />
                <Route path='/create_assessment' element={<CreateAssessment />} />
                <Route path='/employee_data' element={<EmployeeData />} />
                <Route path='/admin_settings' element={<AdminSettings />} />
                <Route path='/about' element={<AboutEmployee />} />


                <Route path='/resetPassword' element={<ResetPwd />} />
                <Route path='/resetPasswordFinalStep' element={<ResetFinalPwd />} />
                <Route path='/resetSecurityImage' element={<ForgetSecurityImage />} />

<<<<<<< HEAD
                <Route path='/employeeDashboard' element={<EmployeeDashboard />} />
                <Route path='/feedback' element={<Feedback />} />
                <Route path='/feedback/feedbackForm' element={<FeedbackForm />} />
                <Route path='/feedback/complaintForm' element={<ComplaintForm />} />
                <Route path='/feedback/pendingAssessments' element={<PendingAssessments />} />
                <Route path='/employeeSettings' element={<EmployeeSettings />} />
                <Route path='/userProfile' element={<UserProfile />} />
                <Route path='/developmentPlans' element={<DevelopmentPlans />} />
                <Route path='/aboutAdmin' element={<AboutAdmin />} />
=======
      <Route path='/employeeDashboard' element={<EmployeeDashboard /> } />
      <Route path='/feedback' element={<Feedback/>} />
      <Route path='/feedbackForm' element={<FeedbackForm/>} />
      <Route path='/employeeSettings' element={<EmployeeSettings/>} />
      <Route path='/userProfile' element={<UserProfile/>} />
      <Route path='/developmentPlans' element={<DevelopmentPlans/>} />
      <Route path='/aboutAdmin' element={<AboutAdmin/>} />
      <Route path='/AdminProfile' element={<AdminProfile/>} />
>>>>>>> settings-branch


            </Routes>
        </UserContextProvider>
    )
}

export default App
