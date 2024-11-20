import React from "react";
import styles from "./WeatherTodayBlock.module.css";
import TodayWeatherHourlyForecastBlock from "./TodayWeatherHourlyForecastBlock/TodayWeatherHourlyForecastBlock";
import { convertCode } from "../../utils/weatherUtils.js";

const TodayWeatherBlock = ({ appState }) => {

	const data = appState.weatherData.current;
	const weatherDescription = convertCode(data.weather_code, 0); //state: 0 - get desc&imgSource; 1 - desc; 2 - source
	const forecastData = appState.weatherData.hourly;
	const fetchingData = {
		temp: data.temperature_2m,
		weatherDesc: weatherDescription[0],
		feelsLike: data.apparent_temperature,
		windSpeed: data.wind_speed_10m,
		windDirection: data.wind_direction_10m,
		humidity: data.relative_humidity_2m,
		pressure: data.pressure_msl,
		city: appState.city,
		isDay: data.is_day,
	}

	const calculateTemp = () => {
		return Math.round(fetchingData.temp);
	}

	const calculateFeelsLikeTemp = () => {
		return Math.round(fetchingData.feelsLike);
	}

	const convertPressure = () => {
		return Math.round(fetchingData.pressure * 0.75);
	}

	const getDate = () => {
		const timezone = appState.weatherData.utc_offset_seconds / 3600;
		let date = new Date();
		let hours = date.getHours() - 5 + timezone;
		let minutes = date.getMinutes();
		return hours + ':' + (minutes < 10 ? '0' + minutes: minutes);
	}

	const classes = {
		contentContainer: styles['content-container'],
		day: styles['day'],
		night: styles['night'],
	}

	const backgroundChanger = () => {
		if(fetchingData.isDay) return classes.day
		return classes.night
	}

	return (
		<div className={`${classes.contentContainer} ${backgroundChanger()}`}>
			<h1 className={styles['geolocation']}>{fetchingData.city}</h1>
			<p className={styles['time-now']}>Time now - {getDate()}</p>
			<div className={styles['temperature-weather-state-container']}>
				<p className={styles['temperature-now']}>{calculateTemp()}&deg;</p>
				<img src={`/${weatherDescription[1]}`}></img>
				<div className={styles['description-wrap']}>
					<p>{fetchingData.weatherDesc}</p>
					<p>feels like {calculateFeelsLikeTemp()}&deg;</p>
				</div>
			</div>
			<div className={styles['fact-props-wrap']}>
				<div className={styles['wind-wrap']}>
					<img src="/wind-icon1.png"></img>
					<p>{fetchingData.windSpeed} m/s</p>
				</div>
				<div className={styles['humidity-wrap']}>
					<img src="/humidity-icon.png"></img>
					<p>{fetchingData.humidity}%</p>
				</div>
				<div className={styles['pressure-wrap']}>
					<img src="/atmospheric.png"></img>
					<p>{convertPressure()} mmhg</p>
				</div>
			</div>
			<div className={styles['spacer']}></div>
			<TodayWeatherHourlyForecastBlock forecastData={forecastData}></TodayWeatherHourlyForecastBlock>
		</div>
	)
}

export default TodayWeatherBlock;