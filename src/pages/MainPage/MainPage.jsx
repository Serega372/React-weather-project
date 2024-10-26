import React, { useEffect, useContext} from "react";
import axios from "axios";
import Header from "../../components/Header/Header.jsx";
import styles from './MainPage.module.css';
import WeatherTodayBlock from "../../components/WeatherTodayBlock/WeatherTodayBlock.jsx";
import WeatherMapBlock from "../../components/WeatherMapBlock/WeatherMapBlock.jsx";
import DaysForecastBlock from "../../components/DaysForecastBlock/DaysForecastBlock.jsx";
import { WeatherContext } from "../../contexts/WeatherContext.jsx";

const MainPage = () => {

	const { geoData, appState, setAppState } = useContext(WeatherContext);

	useEffect(() => {
		const fetchWeather = () => {
			const secondApiKey = 'SUCYAHNGQH58X34R89E2MQK2K';
			const apiData = `https://api.open-meteo.com/v1/forecast?latitude=${geoData[1]}&longitude=${geoData[2]}
			&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,
			weather_code,pressure_msl,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,
			weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=
			auto&temporal_resolution=hourly_3&forecast_hours=24&forecast_days=11`;
			const detailedApiData = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/
			services/weatherdata/forecast?locations=${geoData[1]},${geoData[2]}&iconSet=icons1&aggregateHours=1&forecastDays=11&unitGroup=metric
			&shortColumnNames=false&contentType=json&key=${secondApiKey}`
			axios.all([
				axios.get(apiData),
				axios.get(detailedApiData),
			]).then((response => {
				const weatherApiData = response[0].data;
				const detailedApiData = response[1].data.locations;
				setAppState({
					weatherData: weatherApiData,
					city: geoData[0],
					detailedDailyWeatherData: detailedApiData[Object.keys(detailedApiData)[0]].values,
				});
			}))
		}
		fetchWeather();
	}, [geoData]);

	const weatherMap = appState.weatherMap
	console.log(appState[Object.keys(appState)[2]])


	return (
		<div>
			<Header></Header>
			<div className={styles['content-container']}>
				{!appState.weatherData ? (
					<p className={styles['loading-text']}>Please hold on, fetching data :)</p>
				) : (
				<>
					<WeatherTodayBlock appState={appState}></WeatherTodayBlock>
					<WeatherMapBlock weatherMap={weatherMap}></WeatherMapBlock>
					<DaysForecastBlock dailyForecastData={appState.weatherData}></DaysForecastBlock>
				</>
				)}
			</div>
		</div>
	)
}

export default MainPage