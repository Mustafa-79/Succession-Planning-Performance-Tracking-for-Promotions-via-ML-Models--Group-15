import './App.css'
import {Routes, Route} from 'react-router-dom';
import Navbar from '../src/components/Navbar';
import Home from '../src/pages/Home';
import Signup from './pages/Signup';
import Login from '../src/pages/Login';
import ResetPwd from './pages/resetPwd';
import ResetFinalPwd from './pages/resetPg2'
import axios from 'axios';
import {Toaster} from 'react-hot-toast';
import { UserContextProvider } from '../context/userContext';
import Dashboard from './pages/Dashboard';
import AssessFeedback from './pages/AssessFeedback';
import CreateAssessment from './pages/CreateAssessment';
import EmployeeData from './pages/EmployeeData';
import AdminSettings from './pages/AdminSettings';
import ForgetSecurityImage from './pages/forgetsecimg'
import About from './pages/About'
import EmployeeDashboard from './pages/EmpDashboard';
import Feedback from './pages/Feedback';
import FeedbackForm from './pages/FeedbackForm';
import UserProfile from './pages/UserProfile';
import EmployeeSettings from './pages/EmployeeSettings';
import DevelopmentPlans from './pages/DevelopmentPlans';
import AboutAdmin from './pages/About';

axios.defaults.baseURL = 'http://localhost:8000/';
axios.defaults.withCredentials = true

function App() {
  return (
    <UserContextProvider>
    <Toaster position='bottom-right' toastOptions={{duration: 2000}} />
    <Routes>
      <Route path='/' element={<Login /> } />
      <Route path='/signup' element={<Signup /> } />
      <Route path='/login' element={<Login /> } />

      <Route path='/dashboard' element={<Dashboard /> } />
      <Route path='/assess_feedback' element={<AssessFeedback /> } />
      <Route path='/create_assessment' element={<CreateAssessment /> } />
      <Route path='/employee_data' element={<EmployeeData /> } />
      <Route path='/admin_settings' element={<AdminSettings /> } />
      <Route path='/about' element={<About/> } />


      <Route path='/resetPassword' element={<ResetPwd /> } />
      <Route path='/resetPasswordFinalStep' element={<ResetFinalPwd/>} />
      <Route path='/resetSecurityImage' element={<ForgetSecurityImage/>} />

      <Route path='/employeeDashboard' element={<EmployeeDashboard /> } />
      <Route path='/feedback' element={<Feedback/>} />
      <Route path='/feedbackForm' element={<FeedbackForm/>} />
      <Route path='/employeeSettings' element={<EmployeeSettings/>} />
      <Route path='/userProfile' element={<UserProfile/>} />
      <Route path='/developmentPlans' element={<DevelopmentPlans/>} />
      <Route path='/aboutAdmin' element={<AboutAdmin/>} />


    </Routes>
    </UserContextProvider>
  )
}

export default App
