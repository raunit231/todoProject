import React, { useEffect, useRef, useState } from "react";
import "./Timeline.css";
import { useSelector } from "react-redux";
import { rygColor } from "../../assets/color";

function TimelineBar() {
	const tasklist = useSelector((state) => state.tasks);
	const todayTasks = tasklist.filter((task) => {
		const currentDate = new Date();
		currentDate.setHours(0, 0, 0, 0);
		const taskDate = new Date(task.date);
		taskDate.setHours(0, 0, 0, 0);
		return taskDate.getTime() === currentDate.getTime();
	});
	const timelineRef = useRef(null);
	const timelineScrollRef = useRef(null);
	const [hourWidth, setHourWidth] = useState(0);
	useEffect(() => {
		const timeline = timelineRef.current;
		const hourWidth = timeline.clientWidth / 6;
		setHourWidth(hourWidth);
		const timelineScroll = timelineScrollRef.current;
		let currentHour = new Date();
		currentHour = currentHour.getHours();
		setTimeout(() => {
			timelineScroll.scroll({
				top: 0,
				left: (currentHour - 3) * hourWidth,
				behavior: "smooth",
			});
		}, 500);
	}, []);
	const HourStripe = ({ hourWidth }) => {
		const hours = Array.from({ length: 25 }, (_, i) => i);
		return (
			<div className="hourStripe">
				<div
					className="hourStripe__inner"
					style={{ width: `${hourWidth * 25}px` }}
				>
					{hours.map((hour) => {
						let hourTag;
						if (hour !== 0 && hour !== 12)
							hourTag = hour > 11 ? `${hour - 12} PM` : `${hour} AM`;
						else hourTag = hour === 0 ? "12 AM" : "12 PM";
						return (
							<div
								className={`hourStripe__item `}
								key={hour}
								style={{ width: `${hourWidth}px` }}
							>
								{hourTag}
							</div>
						);
					})}
				</div>
			</div>
		);
	};

	const TimelineBlockItem = ({ heading, description, from, to, priority }) => {
		from = new Date(from);
		to = new Date(to);
		const durationInms = to.getTime() - from.getTime();
		const currentDate = new Date();
		currentDate.setHours(0, 0, 0, 0);
		let start = (from.getTime() - currentDate.getTime()) / (1000 * 60 * 60);
		const duration = durationInms / 1000 / (60 * 60);
		let currentHour = new Date();
		currentHour = currentHour.getTime();
		const startTimeInLocale = from.toLocaleString("en-US", {
			hour: "numeric",
			minute: "numeric",
			hour12: true,
		});
		const endTimeInLocale = to.toLocaleString("en-US", {
			hour: "numeric",
			minute: "numeric",
			hour12: true,
		});
		const priorityColor = rygColor;

		return (
			<div
				className={`timeline__block_inner_item 
        ${
					from.getTime() < currentHour && to.getTime() > currentHour
						? "active"
						: ""
				}`}
				style={{
					width: `${duration * hourWidth}px`,
					left: `${start * hourWidth}px`,
					"--hover-color": priorityColor[priority - 1],
				}}
			>
				<h2>{`${startTimeInLocale}-${endTimeInLocale}`}</h2>
				<div className="flex-1 flex flex-col justify-center items-center ">
					<h1 className="text-xl font-medium">{heading}</h1>
					<h2 className="text-sm font-light">{description}</h2>
				</div>
			</div>
		);
	};
	return (
		<div ref={timelineRef} className="timeline h-full">
			<div className="timelineScroll" ref={timelineScrollRef}>
				<div className="timeline__block">
					<div
						className="timeline__block_inner"
						style={{ width: `${hourWidth * 25}px` }}
					>
						{todayTasks.map(
							({ heading, description, from, to, _id, priority }) => {
								return (
									<TimelineBlockItem
										key={_id}
										heading={heading}
										description={description}
										from={from}
										to={to}
										priority={priority}
									/>
								);
							}
						)}
						{/* <div className="bottom-0 left-[8%] absolute w-[8%] timeline__block_inner_item"></div> */}
					</div>
				</div>
				<HourStripe hourWidth={hourWidth} />
			</div>
		</div>
	);
}

export default TimelineBar;
