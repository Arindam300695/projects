/** @format */

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const baseUrl = "http://localhost:8080";

const Signup = () => {
	const navigate = useNavigate();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [isModalOpen, setModalOpen] = useState(false);
	const [userOtp, setUserOtp] = useState("");

	const handleNameChange = (event) => {
		setName(event.target.value);
	};

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};

	const handleOpenModal = () => {
		setModalOpen(true);
	};

	const handleCloseModal = () => {
		setModalOpen(false);
	};

	const handleOtpChange = (event) => {
		setUserOtp(event.target.value);
	};

	// handleOtpSubmit function to submit the otp sent to user's email address and verify the user
	const handleOtpSubmit = async () => {
		try {
			// Perform desired actions with the submitted OTP
			const res = await axios.post(`${baseUrl}/auth/emailVerification`, {
				email,
				userOtp,
			});

			// for errors
			if (res.data.error) {
				toast.error(res.data.error);
				// Close the modal after submission
				setModalOpen(false);
				setTimeout(() => {
					navigate("/");
				}, 2500);
				return;
			} else {
				// for successful submission

				toast.success(res.data.message);
				// Close the modal after submission
				setModalOpen(false);
				setTimeout(() => {
					navigate("/");
				}, 2500);
			}
			return;
		} catch (error) {
			toast.error(error.message);
		}
	};

	// handleSubmit function to submit name and email
	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			// making sure that no fields remain empty
			if (!name || !email)
				return toast.warning("All fields are required");

			// setEmail("");
			// setName("");

			const res = await axios.post(`${baseUrl}/auth/registration`, {
				name,
				email,
			});
			if (res.data.error) return toast.error(res.data.error);

			if (
				res.data.message ===
				"Enter the otp sent to your email to verify yourself"
			) {
				// Open the modal for OTP verification
				handleOpenModal();
				return toast.success(res.data.message);
			}
		} catch (error) {
			toast.error(error.message);
		}
	};

	return (
		<>
			<Navbar />
			<div className="max-w-md p-6 mx-auto bg-white rounded shadow">
				<h2 className="mb-4 text-2xl font-bold">Signup</h2>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label
							htmlFor="name"
							className="block mb-2 font-medium"
						>
							Name:
						</label>
						<input
							type="text"
							id="name"
							value={name}
							onChange={handleNameChange}
							className="w-full px-4 py-2 border border-gray-300 rounded"
						/>
					</div>
					<div className="mb-4">
						<label
							htmlFor="email"
							className="block mb-2 font-medium"
						>
							Email:
						</label>
						<input
							type="email"
							id="email"
							value={email}
							onChange={handleEmailChange}
							className="w-full px-4 py-2 border border-gray-300 rounded"
						/>
					</div>
					<button
						type="submit"
						className="px-4 py-2 font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
					>
						Submit
					</button>
				</form>

				<div
					className={`fixed inset-0 flex items-center justify-center z-50 ${
						isModalOpen ? "block" : "hidden"
					}`}
				>
					<div className="p-6 bg-white rounded shadow-md">
						<h2 className="mb-4 text-2xl font-bold">Enter OTP</h2>
						<form onSubmit={() => handleOtpSubmit(userOtp)}>
							<input
								type="number"
								value={userOtp}
								onChange={handleOtpChange}
								className="w-48 px-4 py-2 mb-4 border border-gray-300 rounded"
								placeholder="OTP"
							/>
							<div className="flex justify-end">
								<button
									type="button"
									onClick={handleCloseModal}
									className="px-4 py-2 mr-2 font-medium text-gray-700 bg-gray-300 rounded hover:bg-gray-400"
								>
									Cancel
								</button>
								<button
									type="submit"
									className="px-4 py-2 font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
									onClick={(event) => {
										event.preventDefault();
										handleOtpSubmit();
									}}
								>
									Submit
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default Signup;
