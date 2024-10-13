import React from "react";
import styles from "./HourlyForecastElement.module.css";
import { convertCode } from "../../../../utils/weatherUtils.js";

const HourlyForecastElement = ({ forecastData }) => {

	const imgSource = convertCode(forecastData.code, 2);
	
	const getTime = () => {
		return forecastData.time.split('T')[1];
	}

	const calculateTemp = () => {
		return Math.round(forecastData.temp);
	}

	return (
		<div className={styles['hourly-forecast-wrap']}>
			<p>{getTime()}</p>
			<img src={`/${imgSource}`}/>
			<p>{calculateTemp()}&deg;</p>
		</div>
	)
}

export default HourlyForecastElement;