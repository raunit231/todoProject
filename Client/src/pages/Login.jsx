import React from "react";
import "./Login.css";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { setLogin, setTasks } from "../State/authSlice";
import axios from "axios";

function Login() {
  const initialValues = {
    email:'',
    password:'',
  }
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const validationSchema = Yup.object({
		email: Yup.string()
			.email("Invalid email address")
			.required("Email is required"),
		password: Yup.string().required("Password is required"),
	});
	const handleSubmit = async (values) => {
		try {
			const { data } = await axios.post(
				"http://localhost:3001/auth/login",
				values,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			const { token, user } = data;
			dispatch(
				setLogin({
					token: token,
					user: user,
				})
			);
			const { _id } = user;
			const taskResponse = await axios.get(
				`http://localhost:3001/task/${_id}/tasks`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
      const tasklist = taskResponse.data;
			dispatch(
				setTasks({
					tasks: tasklist,
				})
			);
			if (token) {
				navigate("/main");
			}
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<div className="login__container">
			<div className="login__container_2">
				<img
					className="my-2 object-contain"
					src={require("../assets/logo.png")}
					alt=""
				/>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					<Form className="login__form space-y-3" action="">
						<Field className="" placeholder="Email" name="email" type="email" />
						<ErrorMessage name="email" component={"div"} className="error" />
						<Field
							className=""
							placeholder="Password"
							name="password"
							type="password"
						/>
						<ErrorMessage name="password" component={"div"} className="error" />
						<button type="submit">Log in</button>
					</Form>
				</Formik>
			</div>
		</div>
	);
}

export default Login;
