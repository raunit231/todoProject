import React, { useState } from "react";
import "./Login.css";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch} from "react-redux";
import axios from "axios";
import { setLogin, setTasks } from "../State/authSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
function SignUp() {
	const dispatch = useDispatch();
  const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const initialValues = {
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	};
	const validationSchema = Yup.object({
		firstName: Yup.string().required("First Name is required"),
		lastName: Yup.string().required("Last Name is required"),
		email: Yup.string()
			.email("Invalid email address")
			.required("Email is required"),
		password: Yup.string().required("Password is required"),
	});
	const handleSubmit = async (values) => {
		try {
			setIsLoading(true);
			const { data } = await axios.post(
				"https://todo-project-xsev.onrender.com/auth/register",
				values,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			const { token, user } = data;
      dispatch(setLogin({
        token:token,
        user:user
      }));
      const { _id } =user;
      const { data:tasklist } = await axios.get(
				`https://todo-project-xsev.onrender.com/task/${_id}/tasks`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
      dispatch(setTasks({
        tasks:tasklist
      }));
      if(token){
        navigate("/main");
      }

		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="login__container">
			{isLoading && <Spinner />}
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
					<Form className="login__form space-y-3">
						<Field
							name="firstName"
							className=""
							placeholder="First Name"
							type="text"
						/>
						<ErrorMessage
							name="firstName"
							component={"div"}
							className="error"
						/>
						<Field
							name="lastName"
							className=""
							placeholder="Last Name"
							type="text"
						/>
						<ErrorMessage name="lastName" component={"div"} className="error" />
						<Field name="email" className="" placeholder="Email" type="email" />
						<ErrorMessage name="email" component={"div"} className="error" />
						<Field
							name="password"
							className=""
							placeholder="Password"
							type="password"
						/>
						<ErrorMessage name="password" component={"div"} className="error" />
						<button type="submit">Sign Up</button>
					</Form>
				</Formik>
			</div>
		</div>
	);
}

export default SignUp;
