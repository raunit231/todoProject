import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import "./PieChartElement.css";
import { useSelector } from "react-redux";
import { rygColor } from "../../assets/color";
function PieChartElement() {
	const tasklist = useSelector((state) => state.tasks);
	const currentDate = new Date();
	currentDate.setHours(0, 0, 0, 0);
	const todayTasks = tasklist.filter((task) => {
		const taskDate = new Date(task.date);
		taskDate.setHours(0, 0, 0, 0);
		return taskDate.getTime() === currentDate.getTime();
	});
	const priority1 = todayTasks.filter(
		(task) => task.priority === 1 && task.completed === true
	).length;
	const priority2 = todayTasks.filter(
		(task) => task.priority === 2 && task.completed === true
	).length;
	const priority3 = todayTasks.filter(
		(task) => task.priority === 3 && task.completed === true
	).length;
	const notCompleted = todayTasks.filter(
		(task) => task.completed === false
	).length;
	const totalCompletedTasks = todayTasks.length - notCompleted;
	const data = [
		{
			priority: 3,
			value: priority3,
			color: rygColor[2],
		},
		{
			priority: 2,
			value: priority2,
			color: rygColor[1],
		},
		{
			priority: 1,
			value: priority1,
			color: rygColor[0],
		},
		{
			priority: 0,
			value: notCompleted,
			color: "#8B9198",
		},
	];
	const RADIAN = Math.PI / 180;
	const renderCustomizedLabel = ({
		cx,
		cy,
		midAngle,
		innerRadius,
		outerRadius,
		percent,
		index,
	}) => {
    const radius = (innerRadius + (outerRadius - innerRadius) * 0.5)+20;
    console.log(radius);
		const x = cx + radius * Math.cos(-midAngle * RADIAN);
		const y = cy + radius * Math.sin(-midAngle * RADIAN);

		return (
			<text
				x={x}
				y={y}
				fill="black"
				textAnchor={x > cx ? "start" : "end"}
				dominantBaseline="central"
			>
				{`${(percent * 100).toFixed(0)}%`}
			</text>
		);
	};
	return (
		<div className="pie flex flex-col flex-1 my-7 mx-4 justify-around items-center rounded-xl bg-white">
			<div className="pie__taskData mt-1 flex w-[90%] justify-around">
				<div className="flex items-center ">
					<div className="flex flex-col justify-center h-full">
						<h1>Total</h1>
						<h1>Tasks</h1>
					</div>
					<div className="pie__taskData_count">
						{`${
							todayTasks.length > 9
								? todayTasks.length
								: `0${todayTasks.length}`
						}`}
					</div>
				</div>
				<div className="flex ">
					<div className="flex flex-col justify-center h-full">
						<h1>Completed</h1>
						<h1>Tasks</h1>
					</div>
					<div className="pie__taskData_count">
						{`${
							totalCompletedTasks > 9
								? totalCompletedTasks
								: `0${totalCompletedTasks}`
						}`}
					</div>
				</div>
			</div>
			<div className="pie__element flex justify-center w-[70%]">
				<ResponsiveContainer width="70%" aspect={1}>
					<PieChart>
						<Pie
							data={data}
							dataKey={"value"}
							labelLine={false}
							label={renderCustomizedLabel}
							fill="#8884d8"
						>
							{data.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={entry.color} />
							))}
						</Pie>
					</PieChart>
				</ResponsiveContainer>
			</div>
			<div className="pie__priorityDetails">
				<h1>
					<span style={{ backgroundColor: rygColor[0] }} className={`inline-block w-3 h-3 rounded-full`}></span>
					1st Priority
				</h1>
				<h1>
					<span style={{ backgroundColor: rygColor[1] }} className={`inline-block w-3 h-3 rounded-full`}></span>
					2nd Priority
				</h1>
				<h1>
					<span style={{ backgroundColor: rygColor[2] }} className={`inline-block w-3 h-3 rounded-full`}></span>
					3rd Priority
				</h1>
				<h1>
					<span className="inline-block w-3 h-3 bg-[#8B9198] rounded-full"></span>
					Incomplete
				</h1>
			</div>
		</div>
	);
}

export default PieChartElement;
