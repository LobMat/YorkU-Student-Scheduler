const express = require("express");
const cors = require("cors");

const accountRouter = require('./routes/accountRouter');
const courseRouter = require("./routes/courseRouter");

const writeCourseData = require("./database/DummyData");

const app = express();
const PORT = 5000;

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
}));
app.use(express.json());

app.use('/accounts', accountRouter);    //use account routes on the endpoint /accounts
app.use('/courses', courseRouter);

writeCourseData();

app.get("/api/test", (req, res) => {
    res.json({message: "BACKEND UP."});
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


