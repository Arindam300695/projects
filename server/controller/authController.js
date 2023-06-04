/** @format */

const User = require("../model/userModel");

const registrationController = async (req, res) => {
	try {
		const otp = req.otp;

		const { name, email } = req.body;

		// if the user doesn't exist then need to create a user and need to save the user into the database
		await User.create({ name, email, otp });
		return res.send({
			message: "Enter the otp sent to your email to verify yourself",
		});
	} catch (error) {
		return res.send({ error: error.message });
	}
};

const verifyEmailController = async (req, res) => {
	try {
		const { email, userOtp } = req.body;
		const numberedOtp = Number(userOtp);

		const userToBeVerified = await User.findOne({
			email,
			otp: numberedOtp,
		});
		if (!userToBeVerified) {
			await User.deleteOne({ email });
			return res.send({
				error: "Invalid otp, Please try signing up again",
			});
		} else return res.send({ message: "Registration successfull" });
	} catch (error) {
		return res.send({ error: error.message });
	}
};

module.exports = { registrationController, verifyEmailController };
