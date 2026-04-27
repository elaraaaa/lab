const express = require('express');
const sequelize = require('./config/database');

// Import models to initialize associations
const models = require('./models');

const logger = require('./middleware/logger');
const studentRoutes = require('./routes/students');
const courseRoutes = require('./routes/courses');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(logger); // Logger middleware - AFTER json parser, BEFORE routes

// Routes
app.use('/students', studentRoutes);
app.use('/courses', courseRoutes);

// Test route
app.get('/', (req, res) => {
    res.json({ message: 'API is running' });
});

// 404 handler - must be AFTER all app.use() route registrations
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found.' });
});

// Global error handler - must have exactly 4 parameters
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'An unexpected error occurred.' });
});

// DB + Server start
sequelize.sync()
    .then(() => {
        console.log('Database connected');
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch(err => console.error('DB error:', err));