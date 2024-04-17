const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const { mongoose } = require('mongoose')
const init_db = require('./mongodb_init')
const init_weights = require('./weights_init')
const bodyParser = require('body-parser');
const app = express()
const cookieParser = require('cookie-parser')



// database connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Database Connected'))
    .catch((err) => console.log('Database not connected', err))

// Initialize database
const db = mongoose.connection;
init_db(db);

// Initialize weights
init_weights(db);

// Set up cors to allow us to accept requests from our client
app.use(cors({
    origin: 'https://succession-planning.vercel.app',
    credentials: true
}));

// middleware
// app.use(express.json())
app.use(cookieParser())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));



app.use('/', require('./routes/authRoutes'))

const port = 8000
app.listen(port, '0.0.0.0' ,() => console.log('Server is running on port', port))
