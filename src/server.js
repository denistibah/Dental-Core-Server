// server.js
require('dotenv').config()

const express = require('express')
const cors = require('cors')

const authenticate = require('./middleware/authenticate')
const authRoutes = require('./routes/auth.routes')
const usersRoutes = require('./routes/users.routes')
const patientRoutes = require('./routes/patient.routes')
const appointmentRoutes = require('./routes/appointment.routes')

const app = express()

// ——— Global Middleware ———
app.use(cors())
app.use(express.json())

// ——— Public Routes ———
// signup, login, etc.
app.use('/api/auth', authRoutes)

// ——— Protected Routes ———
// /api/users/me (inside users.routes.js we call `authenticate` on that GET)
// you could also do: app.use('/api/users', authenticate, usersRoutes)
app.use('/api/users', usersRoutes)

// Patients & appointments require a valid Firebase token
app.use('/api/patients', authenticate, patientRoutes)
app.use('/api/appointments', authenticate, appointmentRoutes)

// ——— Health Check ———
app.get('/', (req, res) => res.send('Denta API Running'))

// ——— Start Server ———
const PORT = process.env.PORT || 5001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
