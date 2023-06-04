/** @format */
const nodemailer = require("nodemailer");
const User = require("../model/userModel");
require("dotenv").config();

const sendEmailMiddleware = async (req, res, next) => {
	try {
		const { email } = req.body;

		// finding if any user with same email already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) return res.send({ error: "User already exists" });

		// so let's create the otp
		var otp = "";
		function generateOTP() {
			for (var i = 0; i < 6; i++) {
				otp += Math.floor(Math.random() * 10);
			}
			return otp;
		}
		// generating otp
		var otp = generateOTP();

		// Create a Nodemailer transporter
		const transporter = nodemailer.createTransport({
			service: "Gmail",
			auth: {
				user: process.env.user,
				pass: process.env.pass,
			},
		});

		// Email data
		const mailOptions = {
			from: process.env.user,
			to: email,
			subject: "Verify your email",
			text: `Your one time password is ${otp}`,
		};

		// Send email
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				return res.send({
					error: "Error occurred while sending email.",
				});
			} else {
				return res.send({ error: "Email sent successfully." });
			}
		});
		req.otp = otp;
		next();
	} catch (error) {
		throw new Error(error);
	}
};

module.exports = { sendEmailMiddleware };
