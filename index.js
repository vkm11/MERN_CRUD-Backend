const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const studentRoute = require('./routes/student.routes');
const schoolRoute = require('./routes/school.routes');
const userRoute = require('./routes/user.routes');
const roleRoute = require('./routes/role.routes');
const sectionRoute = require('./routes/section.routes');
const parentRoute = require('./routes/parent.routes');
const teacherRoute = require('./routes/teacher.routes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use('/students', studentRoute);
app.use('/school', schoolRoute);
app.use('/user', userRoute);
app.use('/role', roleRoute);
app.use('/section', sectionRoute);
app.use('/parent', parentRoute);
app.use('/teacher', teacherRoute);

// PORT
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// 404 Error
app.use((req, res, next) => {
    res.status(404).send('Not Found');
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(err.statusCode || 500).send(err.message);
});
