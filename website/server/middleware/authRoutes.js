const express = require("express");
const app = express();
const cors = require("cors");

// middleware

app.use(express.json()) //req.body
app.use(cors())

// ROUTES //

// register and login routes

app.use("/auth", require("../routes/jwtAuth"));
//app.use("/dashboard", require("../routes/dashboard"));

// Course information routes
app.use("/courses", require("../routes/TeamBanditPages/courseRoutes"));
app.use("/students", require("../routes/TeamBanditPages/studentRoutes"));
app.use("/projects", require("../routes/TeamBanditPages/projectRoutes"));
app.use("/mentors", require("../routes/TeamBanditPages/mentorRoutes"));
app.use("/clients", require("../routes/TeamBanditPages/clientRoutes"));

app.listen(5000, ()=> {
    console.log("server is running on port 5000");
})