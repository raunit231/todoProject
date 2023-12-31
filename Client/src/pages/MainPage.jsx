import React, { useEffect, useState } from "react";
import "./MainPage.css";
import Sidebar from "../components/Sidebar/Sidebar";
import TimelineBar from "../components/Timeline/Timeline";
import Summary from "../components/Summary/Summary";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setTasks } from "../State/authSlice";
import Spinner from "../components/Spinner";

function MainPage() {
	const [isLoading, setIsLoading] = useState(true);
	const token = useSelector((state) => state.token);
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();
	useEffect(() => {
		const fetchData = async () => {
			try {
				const { _id } = user;
				const taskResponse = await axios.get(
					`https://todo-project-xsev.onrender.com/task/${_id}/tasks`,
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
			} catch (error) {
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchData();
	});
	return (
		<div className="main">
			{isLoading && <Spinner />}
			<div className="main__sidebar">
				<Sidebar />
			</div>
			<div className="main__content">
				<div className="main__content_timeline">
					<TimelineBar />
				</div>
				<div className="main__content_summary">
					<Summary />
				</div>
			</div>
		</div>
	);
}

export default MainPage;
