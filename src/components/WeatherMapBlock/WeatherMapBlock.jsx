import React, {useContext, useEffect} from "react";
import styles from "./WeatherMapBlock.module.css";
import './MapControl.css';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { fromLonLat } from 'ol/proj'
import {WeatherContext} from "../../contexts/WeatherContext.jsx";
import OSM from "ol/source/OSM";
import Control from "ol/control/Control";

const WeatherMapBlock = () => {
	const { geoData } = useContext(WeatherContext);
	const apiKey = '643dc39e396a8b2b199668f091218960';

	const imgAndLayer = {
		precipitation: ['', 'precipitation_new'],
		clouds: ['', 'clouds_new'],
		seaLevelPressure: ['', 'pressure_new'],
		windSpeed: ['', 'wind_new'],
		temperature: ['', 'temp_new']
	}

	const WeatherMap = () => {
		useEffect(() => {
			// const map = new Map({
			// 	target: 'map',
			// 	layers: [
			// 		new TileLayer({
			// 			source: new OSM(),
			// 		}),
			// 		new TileLayer({
			// 			source: new XYZ({
			// 				url: `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=643dc39e396a8b2b199668f091218960`,
			// 			}),
			// 		})
			// 	],
			// 	view: new View({
			// 		center: fromLonLat([geoData[2], geoData[1]]),
			// 		zoom: 9,
			// 	})
			// });
			const baseMapLayer = new TileLayer({
				source: new OSM(),
			});

			const weatherLayer = new TileLayer({
				source: new XYZ({
					url: `https://tile.openweathermap.org/map/precipitation_new/
					{z}/{x}/{y}.png?appid=${apiKey}`,
				}),
			});

			const map = new Map({
				target: 'map',
				layers: [baseMapLayer, weatherLayer],
				view: new View({
					center: fromLonLat([geoData[2], geoData[1]]),
					zoom: 9
				}),
			});

			const changeWeatherLayer = (layer) => {
				const newUrl = `https://tile.openweathermap.org/map/${layer}/
				{z}/{x}/{y}.png?appid=${apiKey}`
				weatherLayer.setSource(
					new XYZ({
						url: newUrl
					}),
				);
			};

			const toggleButtonsDropdown = () => {
				layerButtons.classList.toggle('hidden');
				console.log('button press')
			}

			const changeLayerButton = document.createElement('button');
			changeLayerButton.innerHTML = '[]';
			changeLayerButton.onclick = toggleButtonsDropdown

			const precipitationButton = document.createElement('button');
			precipitationButton.innerHTML = 'Pr'
			precipitationButton.onclick = () => changeWeatherLayer(imgAndLayer.precipitation[1])

			const cloudsButton = document.createElement('button');
			cloudsButton.innerHTML = 'Cl';
			cloudsButton.onclick = () => changeWeatherLayer(imgAndLayer.clouds[1])

			const seaLevelPressureButton = document.createElement('button');
			seaLevelPressureButton.innerHTML = 'Pl';
			seaLevelPressureButton.onclick = () => changeWeatherLayer(imgAndLayer.seaLevelPressure[1])

			const windSpeedButton = document.createElement('button');
			windSpeedButton.innerHTML = 'Ws';
			windSpeedButton.onclick = () => changeWeatherLayer(imgAndLayer.windSpeed[1])

			const temperatureButton = document.createElement('button');
			temperatureButton.innerHTML = 'Te'
			temperatureButton.onclick = () => changeWeatherLayer(imgAndLayer.temperature[1])

			const layerButtons = document.createElement('div');
			layerButtons.className = 'layer-buttons hidden';
			layerButtons.appendChild(precipitationButton);
			layerButtons.appendChild(cloudsButton);
			layerButtons.appendChild(seaLevelPressureButton);
			layerButtons.appendChild(windSpeedButton);
			layerButtons.appendChild(temperatureButton);

			const element = document.createElement('div');
			element.className = 'weather-controls';
			element.appendChild(changeLayerButton);
			element.appendChild(layerButtons);

			const weatherControl = new Control({ element });
			map.addControl(weatherControl)

			return () => {
				map.setTarget(null)
			}
		}, []);
	}
	WeatherMap()

	return (
		<div className={styles['content-container']}>
			<div id="map" className={styles['map']}></div>
		</div>
	)
}

export default WeatherMapBlock;