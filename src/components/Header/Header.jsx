import React, {useState, useEffect, useContext} from 'react';
import axios from "axios";
import styles from './Header.module.css';
import { WeatherContext } from "../../contexts/WeatherContext"

const Header = () => {

	const savedQuery = localStorage.getItem('savedQuery') || 'Ekaterinburg';
	const { setGeoData } = useContext(WeatherContext);
	const [query, setQuery] = useState('');

	const handleInputChange = (event) => {
		const inputValue = event.target.value;
			setQuery(inputValue);
	}

	const handleKeyPress = (event) => {
		if(event.key === 'Enter') {
			localStorage.setItem('savedQuery', query);
		}
	}
	useEffect(() => {
		const fetchGeoCode = () => {
			const apiKey = 'bb002b39-5de5-48bb-b950-b69a678192c9';
			const geocodingApi = `https://graphhopper.com/api/1/geocode?q=${savedQuery}&locale=en&limit=1&key=${apiKey}`;
			axios.get(geocodingApi)
				.then((response) => {
					const geocodingApiData = response.data.hits[0];
					setGeoData([
						geocodingApiData.city || geocodingApiData.name,
						geocodingApiData.point.lat,
						geocodingApiData.point.lng]);
				})
		}
		fetchGeoCode();
	}, []);

	return (
		<header>
			<div className={styles['content-container']}>
				<div className={styles['logo-container']}>
					<a href='/*'>
						<img className={styles['service-logo']} src='/weather-logo.jpg'></img>
						<p>Моя погода</p>
					</a>
				</div>
				<form className={styles['search-bar-container']}>
					<input 
					className={styles['search-input-field']} 
					placeholder='Enter place...'
					value={query}
					onChange={handleInputChange}
					onKeyPress={handleKeyPress}
					/>
				</form>
				<div className={styles['something']}></div>
			</div>
		</header>
	)
}

export default Header