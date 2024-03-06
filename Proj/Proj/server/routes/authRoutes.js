const express = require('express')
const router = express.Router()
const cors = require('cors')
const {test, registerUser, loginUser, getProfile, retrieveName, resetPassword, retrieveSecurityQuestion, setPassword, resetSecurityImage, verifySecurityAnswer} = require('../controllers/authControllers')
const {dashboardEmployees, positionIDtoName, addEmployeeFromAdminDashboard, deleteEmployeefromAdminDashboard} = require('../controllers/dashboardAdmin')

//middleware
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

router.get('/', loginUser)
router.post('/signup', registerUser)
router.post('/login', loginUser)
router.get('/profile', getProfile)
router.post('/registerUser', retrieveName)
router.post('/resetPassword', resetPassword)
router.post('/retrieveSecurityQuestion', retrieveSecurityQuestion)
router.post('/resetPasswordFinalStep', setPassword)
router.post('/resetSecurityImage', resetSecurityImage)
router.post('/verifySecurityAnswer', verifySecurityAnswer)
router.get('/dashboard-employees', dashboardEmployees)
router.get('/dashboard-position-titles', positionIDtoName)
router.post('/addEmployeeFromAdminDashboard', addEmployeeFromAdminDashboard)

// create a route for axios.post(`/deleteEmployee/${employeeID}`);
router.post('/deleteEmployee/:id', deleteEmployeefromAdminDashboard)


module.exports = router