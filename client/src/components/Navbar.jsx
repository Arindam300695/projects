/** @format */

import { NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Navbar = () => {
	return (
		<div className="bg-slate-900 flex text-red-200 p-3 h-16">
			<NavLink
				to="/"
				className="ms-4 hover:bg-slate-50 hover:font-semibold hover:text-ellipsis hover:rounded-md hover:p-2 hover:text-red-500 transition-all duration-300"
			>
				Home
			</NavLink>
			<ul className="flex ms-auto mr-4 ">
				<NavLink
					to="/signup"
					className="mr-4 hover:bg-slate-50 hover:font-semibold hover:text-ellipsis hover:rounded-md hover:p-2 hover:text-red-500 transition-all duration-300"
				>
					<li>Signup</li>
				</NavLink>
				<NavLink
					to="/login"
					className="mr-4 hover:bg-slate-50 hover:font-semibold hover:text-ellipsis hover:rounded-md hover:p-2 hover:text-red-500 transition-all duration-300"
				>
					<li>Login</li>
				</NavLink>
			</ul>
			<ToastContainer />
		</div>
	);
};

export default Navbar;
