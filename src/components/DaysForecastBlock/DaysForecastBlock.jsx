import React from "react";
import styles from "./DaysForecastBlock.module.css"
import DailyForecastElement from "./DailyForecastElement/DailyForecastElement";
import {useNavigate} from "react-router-dom";

const DaysForecastBlock = ({ dailyForecastData }) => {

	const forecastData = dailyForecastData.daily;
	const navigate = useNavigate();

	const handleDayClick = (dayIndex) => {
		navigate(`/forecast-page?day=${dayIndex}`);
	};

	const fusionData = (forecastData) => {
		let mergedForecastData = [];
		for(let i = 1; i < 11; i++) {
			mergedForecastData.push({
				temp_max: forecastData.temperature_2m_max[i],
				temp_min: forecastData.temperature_2m_min[i],
				time: forecastData.time[i],
				code: forecastData.weather_code[i],
				id: i,
			})
		}
		return mergedForecastData
	}

	console.log(fusionData(forecastData))

	return (
		<div className={styles['content-container']}>
			<div className={styles['content-wrap']}>
				<a href="/forecast-page" className={styles['forecast-title']}>10 days forecast</a>
				<div className={styles['forecast-container']}>
					{fusionData(forecastData).map((forecastData) => (
						<div className={styles['component-wrap']}
							 key={forecastData.id}
							 onClick={() => handleDayClick(forecastData.id)}>
							<DailyForecastElement
								key={forecastData.id}
								mergedForecastData={forecastData}>
							</DailyForecastElement>
						</div>
				))}
				</div>
			</div>
		</div>
	)
}

export default DaysForecastBlock;