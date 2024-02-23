"use client";

import Day from "@/components/molecules/Day";
import { useEventContext, useSettingContext } from "@/components/utils/Context";
import { getDateRange } from "@/lib/utils";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDebounceCallback, useWindowSize } from "usehooks-ts";
import Logo from "../atoms/Logo";

interface Props {
	gridRef: React.RefObject<HTMLDivElement>;
	scrollToCurrentDate: () => void;
	setCurrentMonth: () => void;
}

export default function Grid({
	gridRef,
	scrollToCurrentDate,
	setCurrentMonth,
}: Props) {
	const [days, setDays] = useState(
		getDateRange(dayjs().startOf("day").toDate()),
	);
	const eventContext = useEventContext();
	const { width: windowWidth } = useWindowSize({
		debounceDelay: 100,
		initializeWithValue: true,
	});
	const [dayWidth, setDayWidth] = useState(0);
	const settingContext = useSettingContext();

	useEffect(() => {
		console.log(eventContext.events);
	}, [eventContext.events]);

	useEffect(() => {
		scrollToCurrentDate();
	}, [dayWidth, scrollToCurrentDate]);

	useEffect(() => {
		if (gridRef.current) {
			setDayWidth(gridRef.current.offsetWidth / settingContext.view);
		}
	}, [gridRef, settingContext.view, windowWidth]);

	return (
		<div
			className="grid-col-3 grid w-full snap-x snap-mandatory grid-flow-col overflow-scroll"
			ref={gridRef}
			onScroll={useDebounceCallback(setCurrentMonth, 100)}>
			{dayWidth === 0 ? (
				// Render a placeholder or loading indicator until dayWidth is calculated
				<div className="h-[calc(100vh-120px)] w-full flex justify-center items-center">
					<Logo />
				</div>
			) : (
				// Render days using dayWidth
				days.map((day, index) => (
					<Day
						key={index}
						day={dayjs(day).startOf("day").toDate()}
						width={dayWidth}
					/>
				))
			)}
		</div>
	);
}
