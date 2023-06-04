/** @format */

// requiring the npm packages
const express = require("express");
const cors = require("cors");
var mongoose = require("mongoose");
const authRouter = require("./route/authRouter");
require("dotenv").config();

// initializing express app
const app = express();

// injecting express middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//Set up mongoose connection
var mongoDB = process.env.db_uri;
var connect = async () => {
	await mongoose.connect(mongoDB);
};

// listening app
app.listen(8080, async (error) => {
	if (!error) {
		connect();
		console.log("connection established with the database successfully");
		console.log("server is listening on http://localhost:8080");
	} else console.log(error.message);
});

// auth routes
app.use("/auth", authRouter);
