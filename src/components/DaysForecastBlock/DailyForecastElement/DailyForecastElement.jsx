import React from "react";
import styles from "./DailyForecastElement.module.css";
import { convertCode } from "../../../utils/weatherUtils.js";

const DailyForecastElement = ({ mergedForecastData }) => {

	const weatherDescription = convertCode(mergedForecastData.code, 0);
	const calculateTemp = (temp) => {
		return Math.round(temp)
	}

	const dateBuilder = () => {
		const months = [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec',
		];
		const days = [
			'Sun',
			'Mon',
			'Tue',
			'Wed',
			'Thur',
			'Fri',
			'Sat',
		];

		const date = mergedForecastData.time.split('-')
		const month = months[date[1] - 1];
		const year = date[0];
		const monthDay = Number(date[2]);
		const day = days[new Date(`${month} ${monthDay}, ${year}`).getDay()]
		return [day, `${monthDay} ${month}`]
	}

	return (
		<div className={styles['daily-forecast-wrap']}>
			<div className={styles['week-day']}>{dateBuilder()[0]}</div>
			<div className={styles['date']}>{dateBuilder()[1]}</div>
			<img src={`/${weatherDescription[1]}`}></img>
			<div className={styles['temp-day']}>{calculateTemp(mergedForecastData.temp_max)}&deg;</div>
			<div className={styles['temp-night']}>{calculateTemp(mergedForecastData.temp_min)}&deg;</div>
			<div className={styles['weather-description']}>{weatherDescription[0]}</div>
		</div>
	)
}

export default DailyForecastElement;