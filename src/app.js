const express = require("express");
const bodyParser = require("body-parser");
const database = require("./database");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
// API Endpoints
database.connectToDatabase();

// Load Course Routes
const courseRoutes = require("./routes/courseRoutes");
app.use("/courses", courseRoutes);

// Load Instructor Routes
const instructorRoutes = require("./routes/instructorRoutes");
app.use("/instructors", instructorRoutes);

// Load Students Routes
const studentsRoutes = require("./routes/studentsRoutes");
app.use("/students", studentsRoutes);

// Add other route modules...

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
