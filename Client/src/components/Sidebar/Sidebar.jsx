import React, { useState } from "react";
import "animate.css";
import "./Sidebar.css";
import TaskElement from "./TaskElement";
import { useSelector } from "react-redux";
import AddTask from "./AddTask";
import Profile from "./Profile";
function Sidebar() {
	let tasklist = useSelector((state) => state.tasks);
	tasklist = tasklist.filter((task) => {
		return !task.completed;
	});
	const [expandedIndex, setExpandedIndex] = useState(0);
	const toggleExpand = (index) => {
		if (expandedIndex !== index) {
			setExpandedIndex(index);
		}
	};
	const currentDate = new Date();
	currentDate.setHours(0, 0, 0, 0);
	const todayTasks = tasklist.filter((task) => {
		const taskDate = new Date(task.date);
		taskDate.setHours(0, 0, 0, 0);
		return taskDate.getTime() === currentDate.getTime();
	});
	const startOfWeek = new Date();
	startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
	startOfWeek.setHours(0, 0, 0, 0);
	const endOfWeek = new Date();
	endOfWeek.setDate(startOfWeek.getDate() + 6);
	endOfWeek.setHours(23, 59, 59, 999);
	const thisWeekTasks = tasklist.filter((task) => {
		const taskDate = new Date(task.date);
		return taskDate >= startOfWeek && taskDate <= endOfWeek;
	});
	const upcomingTasks = tasklist.filter((task) => {
		const taskDate = new Date(task.date);
		return taskDate > endOfWeek;
	});

	return (
		<div className="sidebar mt-8">
			<div className={`sidebar__items '}`}>
				<div className="sidebar__items_title " onClick={() => toggleExpand(0)}>
					TODAY
				</div>
				<div
					className={`overflow-hidden sidebar__items_container ${
						expandedIndex === 0 ? "show" : ""
					}`}
				>
					{
						<div className={`sidebar__items_tasklist `}>
							{todayTasks.length > 0 ? (
								todayTasks.map((task) => {
									return (
										<TaskElement
											userId={task.userId}
											_id={task._id}
											key={task._id}
											taskTitle={task.heading}
											taskDesc={task.description}
											from={task.from}
											to={task.to}
											date={task.date}
											priority={task.priority}
											completed={task.completed}
											task={task}
										/>
									);
								})
							) : (
								<h1>No tasks</h1>
							)}
						</div>
					}
				</div>
			</div>
			<div className="sidebar__items">
				<div className="sidebar__items_title" onClick={() => toggleExpand(1)}>
					THIS WEEK
				</div>
				<div
					className={` overflow-hidden sidebar__items_container ${
						expandedIndex === 1 ? "show" : ""
					}`}
				>
					{
						<div className="sidebar__items_tasklist">
							{thisWeekTasks.length > 0 ? (
								thisWeekTasks.map((task) => {
									return (
										<TaskElement
											userId={task.userId}
											_id={task._id}
											key={task._id}
											taskTitle={task.heading}
											taskDesc={task.description}
											from={task.from}
											to={task.to}
											date={task.date}
											priority={task.priority}
											completed={task.completed}
											task={task}
										/>
									);
								})
							) : (
								<h1>No tasks</h1>
							)}
						</div>
					}
				</div>
			</div>
			<div className="sidebar__items">
				<div className="sidebar__items_title" onClick={() => toggleExpand(2)}>
					THIS MONTH
				</div>
				<div
					className={`overflow-hidden sidebar__items_container ${
						expandedIndex === 2 ? "show" : ""
					}`}
				>
					{
						<div className="sidebar__items_tasklist">
							{upcomingTasks.length > 0 ? (
								upcomingTasks.map((task) => {
									return (
										<TaskElement
											userId={task.userId}
											_id={task._id}
											key={task._id}
											taskTitle={task.heading}
											taskDesc={task.description}
											from={task.from}
											to={task.to}
											date={task.date}
											priority={task.priority}
											completed={task.completed}
											task={task}
										/>
									);
								})
							) : (
								<h1>No upcoming tasks</h1>
							)}
						</div>
					}
				</div>
			</div>
			<div className="sidebar__items addItem">
				<div className="sidebar__items_title" style={{fontWeight:400}} onClick={() => toggleExpand(3)}>
					Add Task
				</div>
				<div
					className={`overflow-hidden sidebar__items_container  ${
						expandedIndex === 3 ? "show" : ""
					}`}
				>
					<AddTask setExpandedIndex={setExpandedIndex} />
				</div>
				<div>
					<Profile />
				</div>
			</div>
		</div>
	);
}

export default Sidebar;

//
