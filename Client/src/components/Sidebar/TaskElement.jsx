import React, { useState } from "react";
import "./TaskElement.css";
import { Button, Checkbox, IconButton, Radio } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import {
	DatePicker,
	LocalizationProvider,
	TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import de from "date-fns/locale/de";
import { useDispatch, useSelector } from "react-redux";
import {
	deleteTask,
	setCompleted,
	setIsRunning,
	setTask,
	setTimerTask,
	setTimerViewToggle,
} from "../../State/authSlice";
import axios from "axios";
import { rygColor } from "../../assets/color";
import Spinner from "../Spinner";

function TaskElement({
	userId,
	_id,
	taskTitle,
	taskDesc,
	from,
	to,
	date,
	priority,
	completed,
	timeSpent,
	task,
}) {
	const [isLoading, setIsLoading] = useState(false);
	const [expand, setExpand] = useState(false);
	const [checked, setChecked] = useState(completed);
	const [taskTitleValue, setTaskTitleValue] = useState(taskTitle);
	const [taskDescValue, setTaskDescValue] = useState(taskDesc);
	const [selectedDate, setSelectedDate] = useState(new Date(date));
	from = new Date(from);
	to = new Date(to);
	const [startTime, setStartTime] = useState(
		new Date(
			selectedDate.getFullYear(),
			selectedDate.getMonth(),
			selectedDate.getDate(),
			from.getHours(),
			from.getMinutes(),
			from.getSeconds(),
			from.getMilliseconds()
		)
	);
	const [endTime, setEndTime] = useState(
		new Date(
			selectedDate.getFullYear(),
			selectedDate.getMonth(),
			selectedDate.getDate(),
			to.getHours(),
			to.getMinutes(),
			to.getSeconds(),
			to.getMilliseconds()
		)
	);

	const dispatch = useDispatch();
	const priorityMap = {
		1: "a",
		2: "b",
		3: "c",
	};
	const token = useSelector((state) => state.token);
	const handleCheck = async (e) => {
		try {
			setIsLoading(true);
			setChecked(e.target.checked);
			setTimeout(() => {
				dispatch(
					setCompleted({
						_id: _id,
						completed: e.target.checked,
					})
				);
			}, 10);

			await axios.patch(
				`https://todo-project-xsev.onrender.com/task/${_id}/completed`,
				{
					completed: e.target.checked,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				}
			);
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};
	const handleTaskChange = (e) => {
		setTaskTitleValue(e.target.value);
	};
	const handleExpand = () => {
		setExpand(true);
	};
	const handleTimer = () => {
		setExpand(false);
		dispatch(
			setTimerTask({
				task: task,
			})
		);
		dispatch(setIsRunning({ isRunning: true }));
		dispatch(setTimerViewToggle({ toggle: false }));
	};
	const [selectedValue, setSelectedValue] = React.useState(
		priorityMap[priority]
	);
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
		try {
			setIsLoading(true);
			let prioritySelected =
				selectedValue === "a" ? 1 : selectedValue === "b" ? 2 : 3;
			setExpand(false);
			const { data } = await axios.patch(
				`https://todo-project-xsev.onrender.com/task/${_id}`,
				{
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
				setTask({
					_id: _id,
					task: data,
				})
			);
		} catch (error) {
			console.error(error);
		} finally{
			setIsLoading(false);
		}
	};
	const handleDelete = async () => {
		try {
			setIsLoading(true);
			dispatch(
				deleteTask({
					_id: _id,
				})
			);
			await axios.delete(`https://todo-project-xsev.onrender.com/task/${_id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<div
			className={`task p-[0.35rem]  flex flex-col my-2 ${expand ? "task_editable" : ""}`}
		>
			{isLoading && <Spinner/>}
			<div className="task__heading space-x-1 hover:bg-gray-50">
				{!expand && (
					<Checkbox
						className="w-auto h-[10%]"
						icon={<RadioButtonUncheckedIcon />}
						checkedIcon={<CheckCircleOutlineIcon className="text-black" />}
						onChange={handleCheck}
						checked={checked}
					/>
				)}
				<div
					className="task__heading_title w-[90%] flex-1 flex items-center"
					onClick={handleExpand}
				>
					{expand ? (
						<textarea
							placeholder="Task Title"
							autoFocus={true}
							value={taskTitleValue}
							onChange={handleTaskChange}
							rows={1}
						></textarea>
					) : (
						<div className="ml-[9px] h-full">{taskTitleValue}</div>
					)}
				</div>
				{!expand && (
					<div
						className={`w-3 h-3 rounded-full bg-[${
							selectedValue === "a"
								? rygColor[0]
								: selectedValue === "b"
								? rygColor[1]
								: rygColor[2]
						}]`}
						style={{
							backgroundColor:
								selectedValue === "a"
									? rygColor[0]
									: selectedValue === "b"
									? rygColor[1]
									: rygColor[2],
						}}
					></div>
				)}
			</div>
			<div className={`task__expansion ${expand ? "show" : ""}`}>
				{
					<div className="task__expansion_menu">
						<div className="task__expansion_desc mx-5">
							<h1 className="text-black text-left col-span-3">Description:</h1>
							<textarea
								rows={4}
								placeholder="Task Description"
								value={taskDescValue}
								onChange={(e) => setTaskDescValue(e.target.value)}
							></textarea>
						</div>
						{/* <div className='m-2 container-grid-3'>
              <InsertLinkRoundedIcon />
              <input placeholder='Add link' type="url" className='outline-none mx-1 rounded-md p-1' />
            </div> */}
						<div className="task__expansion_menu_timer">
							<p className="flex justify-center items-center">Date</p>
							<div className="flex items-center justify-center ">
								<LocalizationProvider
									dateAdapter={AdapterDateFns}
									adapterLocale={de}
								>
									<DatePicker
										value={selectedDate}
										onChange={(e) => setSelectedDate(e)}
									/>
								</LocalizationProvider>
							</div>
							<div></div>
							<p className="flex justify-center items-center">From</p>
							<div className="flex justify-center items-center">
								<LocalizationProvider
									dateAdapter={AdapterDateFns}
									adapterLocale={de}
								>
									<TimePicker
										value={startTime}
										onChange={(e) => setStartTime(e)}
									/>
								</LocalizationProvider>
							</div>
							<div className="flex justify-center items-center">
								<IconButton onClick={handleTimer}>
									<AvTimerIcon />
								</IconButton>
							</div>
							<p className="flex justify-center items-center">To</p>
							<div className="flex justify-center items-center">
								<LocalizationProvider
									dateAdapter={AdapterDateFns}
									adapterLocale={de}
								>
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
							<Button onClick={handleDelete} variant="outlined" color="error">
								Delete
							</Button>
						</div>
					</div>
				}
			</div>
		</div>
	);
}

export default TaskElement;
