/** @format */

var mongoose = require("mongoose");

const User = new mongoose.Schema(
	{
		name: {
			type: "string",
			required: true,
		},
		email: {
			type: "string",
			required: true,
			unique: true,
		},
		otp: {
			type: Number,
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model("User", User);
