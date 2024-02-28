const express = require('express')
const router = express.Router()
const cors = require('cors')
const {test, registerUser, loginUser, getProfile} = require('../controllers/authControllers')

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

module.exports = router