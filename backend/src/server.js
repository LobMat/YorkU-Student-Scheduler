const express = require("express");
const cors = require("cors");
const writeCourseData = require("./database/DummyData");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

writeCourseData();

app.get("/api/test", (req, res) => {
    res.json({message: "BACKEND UP."});
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


