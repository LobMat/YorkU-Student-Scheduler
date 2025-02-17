const express = require("express");
const cors = require("cors");
const accountRouter = require('./routes/accountRouter');
const writeCourseData = require("./database/DummyData");
const courseRepository = require("./repositories/courseRepository");
const app = express();
const PORT = 5000;

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
}));
app.use(express.json());

app.use('/accounts', accountRouter);    //use account routes on the endpoint /accounts

writeCourseData();

app.get("/api/test", (req, res) => {
    res.json({message: "BACKEND UP."});
});

app.get('/courses/:name', async (req, res) => {
    const courseCode = req.params.name;

    const course = await courseRepository.readCourse(courseCode); // Assuming a hashmap stores courses
    if (course != null) {
        res.json(course);
    } else {
        res.status(404).json({ message: "Course not found" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


