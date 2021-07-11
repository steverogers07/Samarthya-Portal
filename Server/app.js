// configure envs
require("dotenv").config();

// import express
const express = require("express");

// initalize app
const app = express();

// import bodyparser
const bodyparser = require("body-parser");

// use neccessary middleware
app.use(bodyparser.json());

var cookieParser = require('cookie-parser')
app.use(cookieParser());

//cors
const cors = require("cors");

// add moddleware
// app.use(cors({
//   origin:'http://localhost:4200',
//   credentials:true
// }));

// base url
app.get("/samarthya/", (req, res) => {
  return res
    .status(200)
    .json({ success: true, message: "server is up and running!" });
});

// userRouter
let indexRouter = require("./routes/index");
app.use("/samarthya", indexRouter);

app.listen(process.env.PORT, () => {
  console.log(
    `server is running on url http://localhost:${process.env.PORT}/samarthya/`
  );
});
