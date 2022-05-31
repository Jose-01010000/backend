const express = require("express");
const app = express();
const bodyParse = require("body-parser");
const cors = require("cors");

app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());

app.use(cors());

// Routes
const userRoute = require("./api/routes/user");
app.use("/user", userRoute);

const cursoRoute = require("./api/routes/cursos");
app.use("/curso", cursoRoute);

module.exports = app;
