/** @format */

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const baseUrl = "http://localhost:8080";

const Signup = () => {
	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [showModal, setShowModal] = useState(false);
	const [remainingTime, setRemainingTime] = useState(120);
	const [userOtp, setUserOtp] = useState("");

	useEffect(() => {
		if (showModal) {
			const timer = setTimeout(() => {
				setShowModal(false);
			}, 120000); // Close modal after 2 minutes

			const interval = setInterval(() => {
				setRemainingTime((prevTime) => prevTime - 1);
			}, 1000); // Update remaining time every second

			return () => {
				clearTimeout(timer);
				clearInterval(interval);
			};
		}
	}, [showModal]);

	// handleSubmit function
	const handleSubmit = async (e) => {
		e.preventDefault();
		// You can add your logic here to send the OTP to the user's email

		// making sure that no fields remain empty
		if (!name || !email) return toast.warning("All fields are required");

		const res = await axios.post(`${baseUrl}/auth/registration`, {
			name,
			email,
		});
		console.log(res.data);
		if (res.data.error) return toast.error(res.data.error);

		if (
			res.data.message ===
			"Enter the otp sent to your email to verify yourself"
		) {
			toast.success(res.data.message);
			// Open the modal and reset remaining time
			setShowModal(true);
			setRemainingTime(120);
		}
	};

	// handleOtpSubmit function
	const handleOtpSubmit = async () => {
		if (!userOtp)
			return toast.warning(
				`Please enter your otp which you have recieved in ${email}`,
			);
		const res = await axios.post(`${baseUrl}/auth/emailVerification`, {
			email,
			userOtp,
		});

		// for wrong otp submission
		if (res.data.error) {
			toast.error(res.data.error);

			setTimeout(() => {
				setShowModal(false);
				navigate("/");
			}, 1200);
		} else {
			// if user submits the correct otp
			toast.success(res.data.message);

			setTimeout(() => {
				setShowModal(false);
				navigate("/");
			}, 1200);
		}
	};

	const formatTime = (seconds) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins.toString().padStart(2, "0")}:${secs
			.toString()
			.padStart(2, "0")}`;
	};

	return (
		<>
			<Navbar />
			<div className="container p-4 mx-auto">
				{/* TODO: main form for name and email input field */}
				<form
					onSubmit={handleSubmit}
					className="max-w-sm mx-auto p-3 shadow-md rounded-md shadow-[#1B1464]"
				>
					<div className="mb-4">
						<label htmlFor="name" className="block mb-2 font-bold">
							Name:
						</label>
						<input
							type="text"
							id="name"
							className="w-full px-3 py-2 rounded"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className="mb-4">
						<label htmlFor="email" className="block mb-2 font-bold">
							Email:
						</label>
						<input
							type="email"
							id="email"
							className="w-full px-3 py-2 rounded"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<button
						type="submit"
						className="px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
					>
						Submit
					</button>
				</form>

				{/*TODO: modal form */}
				{showModal && (
					<div className="fixed inset-0 z-50 flex items-center justify-center">
						<div className="absolute inset-0 bg-gray-800 opacity-50"></div>
						<div className="relative w-64 p-6 bg-white rounded">
							<h2 className="mb-4 text-xl font-bold">
								Enter OTP
							</h2>
							<input
								type="text"
								className="w-full px-3 py-2 rounded"
								placeholder="OTP"
								value={userOtp}
								onChange={(e) => setUserOtp(e.target.value)}
							/>
							<p className="mt-4">
								Time remaining: {formatTime(remainingTime)}
							</p>
							<button
								type="submit"
								className="px-4 py-2 mt-4 mr-2 font-bold text-white transition-all duration-300 bg-red-500 rounded hover:bg-red-700"
								onClick={() => {
									setShowModal(false);
								}}
							>
								Cancel
							</button>
							<button
								type="submit"
								className="px-4 py-2 mt-4 font-bold text-white transition-all duration-300 bg-blue-500 rounded hover:bg-blue-700"
								onClick={handleOtpSubmit}
							>
								Submit
							</button>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default Signup;
