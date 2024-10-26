import React from "react";
import styles from "./DailyForecastElement.module.css";
import {convertCode, dateBuilder} from "../../../utils/weatherUtils.js";

const DailyForecastElement = ({ mergedForecastData }) => {

	const weatherDescription = convertCode(mergedForecastData.code, 0);
	const calculateTemp = (temp) => {
		return Math.round(temp)
	}

	return (
		<div className={styles['daily-forecast-wrap']}>
			<div className={styles['week-day']}>{dateBuilder(mergedForecastData.time, 0)[0]}</div>
			<div className={styles['date']}>{dateBuilder(mergedForecastData.time, 0)[1]}</div>
			<img src={`/${weatherDescription[1]}`}></img>
			<div className={styles['temp-day']}>{calculateTemp(mergedForecastData.temp_max)}&deg;</div>
			<div className={styles['temp-night']}>{calculateTemp(mergedForecastData.temp_min)}&deg;</div>
			<div className={styles['weather-description']}>{weatherDescription[0]}</div>
		</div>
	)
}

export default DailyForecastElement;