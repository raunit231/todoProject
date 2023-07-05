import { Button, Radio } from "@mui/material";
import {
	DatePicker,
	LocalizationProvider,
	TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { de } from "date-fns/locale";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./TaskElement.css";
import { createTask } from "../../State/authSlice";
import axios from "axios";
import { rygColor } from "../../assets/color";

function AddTask({ setExpandedIndex }) {
	const [taskTitleValue, setTaskTitleValue] = useState("");
	const [taskTitleError, setTaskTitleError] = useState("");
	const [taskDescValue, setTaskDescValue] = useState("");
	const [startTime, setStartTime] = useState(new Date());
	const [endTime, setEndTime] = useState(new Date());
	const dateobj = new Date();
	const [selectedDate, setSelectedDate] = useState(dateobj);
	const dispatch = useDispatch();
	const token = useSelector((state) => state.token);
	const user = useSelector((state) => state.user);
	const handleTaskChange = (e) => {
		setTaskTitleValue(e.target.value);
	};

	const priorityMap = {
		1: "a",
		2: "b",
		3: "c",
	};
	const [selectedValue, setSelectedValue] = React.useState(priorityMap[3]);
	const ColorRadioButtons = () => {
		const handleChange = (event) => {
			setSelectedValue(event.target.value);
		};

		const controlProps = (item) => ({
			checked: selectedValue === item,
			onChange: handleChange,
			value: item,
			name: "color-radio-button-demo",
			inputProps: { "aria-label": item },
		});

		return (
			<div>
				<Radio
					{...controlProps("a")}
					sx={{
						color: rygColor[0],
						"&.Mui-checked": {
							color: rygColor[0],
						},
					}}
				/>
				<Radio
					{...controlProps("b")}
					sx={{
						color: rygColor[1],
						"&.Mui-checked": {
							color: rygColor[1],
						},
					}}
				/>
				<Radio
					{...controlProps("c")}
					sx={{
						color: rygColor[2],
						"&.Mui-checked": {
							color: rygColor[2],
						},
					}}
				/>
			</div>
		);
	};
	const handleDone = async () => {
		if (taskTitleValue.length === 0) {
			setTaskTitleError("Task title is required*");
			return;
		}
		try {
			let prioritySelected =
				selectedValue === "a" ? 1 : selectedValue === "b" ? 2 : 3;
			setExpandedIndex(0);
			const { _id } = user;
			const { data } = await axios.post(
				`https://todo-project-xsev.onrender.com/task/`,
				{
					userId: _id,
					heading: taskTitleValue,
					description: taskDescValue,
					from: startTime,
					to: endTime,
					date: selectedDate,
					priority: prioritySelected,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				}
			);
			dispatch(
				createTask({
					task: data,
				})
			);
			setTaskDescValue("");
			setTaskTitleValue("");
			setTaskTitleError("");
			setSelectedDate(new Date());
			setStartTime(new Date());
			setEndTime(new Date());
		} catch (error) {
			console.error(error);
		}
	};
	const handleCancel = ()=> {
		setExpandedIndex(0);
		setTaskDescValue("");
		setTaskTitleValue("");
		setTaskTitleError("");
		setSelectedDate(new Date());
		setStartTime(new Date());
		setEndTime(new Date());
	}

	return (
		<div className={`flex flex-col bg-white sidebar__items_tasklist`}>
			<div className="flex task__heading_title">
				<textarea
					placeholder="Task Title"
					autoFocus={true}
					value={taskTitleValue}
					onChange={handleTaskChange}
					rows={1}
				></textarea>
			</div>
			{taskTitleError && taskTitleValue.length === 0 && (
				<div className="text-red-700 w-[80%] text-left">{taskTitleError}</div>
			)}
			<div className="task__expansion_desc mx-5">
				<h1 className="text-black text-left col-span-3">Description:</h1>
				<textarea
					rows={4}
					placeholder="Task Description"
					value={taskDescValue}
					onChange={(e) => setTaskDescValue(e.target.value)}
				></textarea>
			</div>
			<div className="task__expansion_menu_timer gap-y-2">
				<p className="flex justify-center items-center">Date</p>
				<div className="flex items-center col-span-2">
					<LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={de}>
						<DatePicker
							value={selectedDate}
							onChange={(e) => setSelectedDate(e)}
						/>
					</LocalizationProvider>
				</div>
				<p className="flex justify-center items-center">From</p>
				<div className="flex justify-center items-center">
					<LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={de}>
						<TimePicker value={startTime} onChange={(e) => setStartTime(e)} />
					</LocalizationProvider>
				</div>
				<div className="flex justify-center items-center">
					{/* <IconButton>
						<AvTimerIcon />
					</IconButton> */}
				</div>
				<p className="flex justify-center items-center">To</p>
				<div className="flex justify-center items-center">
					<LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={de}>
						<TimePicker value={endTime} onChange={(e) => setEndTime(e)} />
					</LocalizationProvider>
				</div>
			</div>
			<div className="task__expansion_menu_priority">
				<ColorRadioButtons />
			</div>
			<div className="flex justify-center space-x-[10%] items-center py-2">
				<Button variant="contained" onClick={handleDone} color="success">
					Save
				</Button>
				<Button variant="outlined" color="error" onClick={handleCancel}>
					Cancel
				</Button>
			</div>
		</div>
	);
}

export default AddTask;
