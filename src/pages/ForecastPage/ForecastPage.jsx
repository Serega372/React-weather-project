import React, {useContext, useEffect} from "react";
import Header from "../../components/Header/Header";
import DetailedDailyForecastBlock from "../../components/DetailedDailyForecastBlock/DetailedDailyForecastBlock.jsx";
import styles from "./ForecastPage.module.css";
import {WeatherContext} from "../../contexts/WeatherContext.jsx";
import axios from "axios";

const ForecastPage = () => {

    const { appState, geoData, setAppState } = useContext(WeatherContext);

    useEffect(() => {
        const fetchWeather = () => {
            const secondApiKey = 'SUCYAHNGQH58X34R89E2MQK2K';
            const detailedApiData = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/
			services/weatherdata/forecast?locations=${geoData[1]},${geoData[2]}&iconSet=icons1&aggregateHours=1&forecastDays=10&unitGroup=metric
			&shortColumnNames=false&contentType=json&key=${secondApiKey}`;
            axios.get(detailedApiData)
                .then((response) => {
                    const detailedApiData = response.data.locations;
                    setAppState({
                        detailedDailyWeatherData: detailedApiData[Object.keys(detailedApiData)[0]].values,
                        city: geoData[0]
                    })
                })
        }
        fetchWeather()
    }, [geoData])

    console.log(geoData)
    console.log(appState)
    return(
        <div>
            <Header></Header>
            <div className={styles["content-container"]}>
                {!appState.detailedDailyWeatherData ? (
                    <p className={styles['loading-text']}>Please hold on, fetching data :)</p>
                ) : (
                    <>
                        <DetailedDailyForecastBlock></DetailedDailyForecastBlock>
                    </>
                )}

            </div>

        </div>

    )
}

export default ForecastPage;