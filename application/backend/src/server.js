const express = require("express");
const cors = require("cors");

const courseRouter = require("./routes/courseRouter");

const app = express();
const port = 3000;

app.use(express.json());

app.use('/courses', courseRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
