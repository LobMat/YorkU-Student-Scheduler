const express = require("express");
const cors = require("cors");

const courseRouter = require("./routes/courseRouter");
const {writeCourseData} = require('./database/WriteDummyData');

const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
})); 

app.use(express.json());

app.use('/courses', courseRouter);
writeCourseData();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
