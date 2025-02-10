const express = require("express");
const cors = require("cors");

const courseRouter = require("./routes/courseRouter");
const accountRouter = require("./routes/accountRouter");
const reviewRouter = require("./routes/reviewRouter");

const {writeCourseData, writeAccountData} = require('./database/WriteDummyData');

const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
})); 

app.use(express.json());

app.use('/courses', courseRouter);
app.use('/accounts', accountRouter);
app.use('/reviews', reviewRouter);

writeCourseData();
writeAccountData();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
