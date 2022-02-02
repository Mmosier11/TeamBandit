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

app.use("/courses", require("../routes/TeamBanditPages/courseHomePage"));

app.listen(3000, ()=> {
    console.log("server is running on port 3000");
})
