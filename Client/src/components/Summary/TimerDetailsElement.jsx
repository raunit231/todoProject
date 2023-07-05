import React, { useEffect, useState } from "react";
import "./TimerDetailsElement.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Checkbox, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { ReactComponent as PauseIcon } from "../../assets/8665737_pause_icon.svg";
import { ReactComponent as PlayIcon } from "../../assets/211876_play_icon.svg";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
	deleteTask,
	setCompleted,
	setIsRunning,
	setTask,
	setTimerTask,
	setTimerViewToggle,
	updateTimer,
} from "../../State/authSlice";
import axios from "axios";
import Spinner from "../Spinner";
function TimerDetailsElement() {
	const [isLoading, setIsLoading] = useState(false);
	let tasklist = useSelector((state) => state.tasks);
	tasklist = tasklist.filter((task) => task.completed);
	const token = useSelector((state) => state.token);
	const dispatch = useDispatch();
	const isRunning = useSelector((state) => state.isRunning);
	const toggle = useSelector((state) => state.timerViewToggle);
	const task = useSelector((state) => state.timerTask);
	const CompletedElement = ({ heading, completed, _id, timeSpent }) => {
		const [checked, setChecked] = useState(completed);
		const handleCheck = async (e) => {

			try {
				setChecked(e.target.checked);
				setIsLoading(true);
				setTimeout(() => {
					dispatch(
						setCompleted({
							_id: _id,
							completed: e.target.checked,
						})
					);
					setIsLoading(false);
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
			}
		};
		const handleDelete = async () => {
			try {
				setIsLoading(true);
				dispatch(deleteTask({
					_id: _id
				}));
				await axios.delete(
					`https://todo-project-xsev.onrender.com/task/${_id}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
			} catch (error) {
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		};
		return (
			<div className="completed_task">
				<Checkbox
					className="w-[10%]"
					icon={<RadioButtonUncheckedIcon />}
					checkedIcon={<CheckCircleOutlineIcon className="text-black" />}
					onChange={handleCheck}
					checked={checked}
				/>
				<div>
					<h1 className="flex-1 line-through">{heading}</h1>
					<h2>{formatTimer(timeSpent)}</h2>
					<IconButton onClick={handleDelete}>
						<DeleteOutlineIcon />
					</IconButton>
				</div>
			</div>
		);
	};

	useEffect(() => {
		let timeInterval = null;
		if (isRunning && task) {
			timeInterval = setInterval(() => {
				dispatch(updateTimer());
			}, 1000);
		} else {
			clearInterval(timeInterval);
		}

		return () => {
			clearInterval(timeInterval);
		};
	}, [isRunning, dispatch, task]);
	const formatTimer = (timeSpent) => {
		const hours = Math.floor(timeSpent / 3600);
		const minutes = Math.floor((timeSpent % 3600) / 60);
		const seconds = Math.floor(timeSpent % 60);
		return `${hours} : ${minutes<=9 ? `0${minutes}`: minutes} : ${seconds<=9 ? `0${seconds}`: seconds}`;
	};
	const TimerElement = () => {
		const timerValue = task ? formatTimer(task.timeSpent) : "00:00:00";
		const handlePlay = async () => {
			if (isRunning) {
				dispatch(setIsRunning({ isRunning: false }));
				if (task) {
					try {
						const { data } = await axios.patch(
							`https://todo-project-xsev.onrender.com/task/${task._id}/timer`,
							{
								timeSpent: task.timeSpent,
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
									_id: data._id,
									task: data,
								})
							);
					} catch (error) {
						console.error(error);
					}
				}
			} else {
				dispatch(setIsRunning({ isRunning: true }));
			}
		};
		const handleReset = () => {
			if (task) dispatch(setTimerTask({ task: { ...task, timeSpent: 0 } }));
		};
		return (
			<div className={`timerElement px-1`}>
				<div className="timerElement__showTimer">
					<div>
						<h1>{timerValue}</h1>
					</div>
				</div>
				<div className="timerElement__buttons">
					<div
						onClick={handlePlay}
						className={`timerElement__button_play border ${
							!isRunning ? "border-red-800" : "border-green-800"
						} cursor-pointer hover:bg-[#00000010]`}
					>
						{isRunning ? (
							<PauseIcon className="text-2xl w-8 h-8 fill-green-700" />
						) : (
							<PlayIcon className="text-2xl w-8 h-8 fill-red-700 " />
						)}
					</div>
					<div
						onClick={handleReset}
						className="timerElement__button_reset cursor-pointer hover:bg-[#00000010]"
					>
						Reset
					</div>
				</div>
			</div>
		);
	};
	return (
		<div
			className={`my-7 mx-4 flex-1 items-center space-y-2 flex flex-col overflow-hidden`}
		>
			{isLoading && <Spinner/>}
			<div
				className={`allcompleted_task py-1 rounded-xl bg-white ${
					toggle ? "flex-1" : ""
				}`}
			>
				<h1 className="text-center flex items-center">
					<span className="flex-1">All Completed Tasks</span>{" "}
					<span className={`pl-1 ${toggle ? "" : "-rotate-90"}`}>
						<IconButton
							onClick={() => dispatch(setTimerViewToggle({ toggle: !toggle }))}
						>
							<ExpandMoreIcon />
						</IconButton>
					</span>
				</h1>
				{toggle && (
					<div className={`allcompleted_task_list`}>
						{tasklist.length > 0 ? (
							tasklist.map((task) => {
								return (
									<CompletedElement
										heading={task.heading}
										completed={task.completed}
										_id={task._id}
										key={task._id}
										timeSpent={task.timeSpent}
									/>
								);
							})
						) : (
							<h1 className="text-center py-10 text-gray-400 ">
								No Tasks Completed
							</h1>
						)}
					</div>
				)}
			</div>
			<div
				className={`timer py-2 ${toggle ? "" : "flex-1"} ${
					isRunning ? "bg-[#D5E5DB80]" : "bg-[#F5C9C980]"
				}`}
			>
				<div className="text-center flex items-center">
					<div className="flex-1 ml-2 timer__heading px-1  py-1">
						<h1>{task ? task.heading : "No Task"} </h1>
						<span className={`${isRunning ? "text-green-700" : "text-red-700"}`} >{task ? formatTimer(task.timeSpent) : "0:00:00"}</span>
					</div>
					<span className={`pl-1 ${!toggle ? "" : "-rotate-90"}`}>
						<IconButton
							onClick={() => dispatch(setTimerViewToggle({ toggle: !toggle }))}
						>
							<ExpandMoreIcon />
						</IconButton>
					</span>
				</div>
				<div className={`${toggle ? "h-0 overflow-hidden" : "flex-1"}`}>
					<TimerElement />
				</div>
			</div>
		</div>
	);
}

export default TimerDetailsElement;
