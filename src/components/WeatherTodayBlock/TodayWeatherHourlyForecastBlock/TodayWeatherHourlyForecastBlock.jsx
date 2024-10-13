import React from "react";
import HourlyForecastElement from "./HourlyForecastElement/HourlyForecastElement";
import styles from "./TodayWeatherHourlyForecastBlock.module.css";

const TodayWeatherHourlyForecastBlock = ({ forecastData }) => {

	const fusionData = (forecastData) => {
		let mergedHourlyForecastData = [];
		for(let i = 0; i < 8; i++) {
			mergedHourlyForecastData.push({
				temp: forecastData.temperature_2m[i],
				time: forecastData.time[i],
				code: forecastData.weather_code[i],
				id: i,
			})
		}
		return mergedHourlyForecastData
	}

	console.log(fusionData(forecastData))

	return (
		<div className={styles['forecast-container']}>
			{fusionData(forecastData).map(hourlyForecastData => (
			<HourlyForecastElement key={hourlyForecastData.id} forecastData={hourlyForecastData}></HourlyForecastElement>
			))}
		</div>
		
	);
}

export default TodayWeatherHourlyForecastBlock;