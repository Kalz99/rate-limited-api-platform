const express = require('express');
const cors = require('cors');
const authRoutes = require('./modules/auth/authRoutes');
const apiRoutes = require('./modules/api/apiRoutes');
const userRoutes = require('./modules/users/userRoutes');
const app = express();

// Middleware

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', authRoutes);
app.use('/api', apiRoutes);
app.use('/', userRoutes);
// Error Handling Middleware (Basic)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});

module.exports = app;
