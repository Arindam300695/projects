/** @format */

const express = require("express");
const {
	registrationController,
	verifyEmailController,
} = require("../controller/authController");
const { sendEmailMiddleware } = require("../middleware/authMiddlewares");
const authRouter = express.Router();

authRouter.post("/registration", sendEmailMiddleware, registrationController);
authRouter.post("/emailVerification", verifyEmailController);

module.exports = authRouter;
