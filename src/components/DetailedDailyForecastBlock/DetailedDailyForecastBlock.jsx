import React, {useContext, useEffect, useRef} from 'react';
import styles from "./DetailedDailyForecastBlock.module.css"
import {WeatherContext} from "../../contexts/WeatherContext.jsx";
import DetailedDailyForecastElement from "./DetailedDailyForecastElement/DetailedDailyForecastElement.jsx";
import {useLocation} from "react-router-dom";

const DetailedDailyForecastBlock = () => {

    const { appState } = useContext(WeatherContext)
    const city = appState.city;
    const detailedDailyWeatherData = appState.detailedDailyWeatherData

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const dayIndex = parseInt(params.get("day"), 10);
    const dayRefs = useRef([]);

    useEffect(() => {
        if(dayRefs.current[dayIndex]) {
            dayRefs.current[dayIndex].scrollIntoView({behavior: 'smooth'});
        }
    }, [dayIndex, detailedDailyWeatherData])

    const fusionData = (detailedDailyWeatherData) => {
        let mergedWeatherDailyData = [];
        let mergedWeatherHourlyData = [];
        const resultWeatherDailyData = [];
        for(let i = 0; i < detailedDailyWeatherData.length - 1 ; i++) {
                if(Number(detailedDailyWeatherData[i].datetimeStr.split('T')[0].split('-')[2])
                    === Number(detailedDailyWeatherData[i + 1].datetimeStr.split('T')[0].split('-')[2])) {
                    mergedWeatherHourlyData.push({
                        temp: detailedDailyWeatherData[i].temp,
                        pressure: detailedDailyWeatherData[i].sealevelpressure,
                        humidity: detailedDailyWeatherData[i].humidity,
                        windDirection: detailedDailyWeatherData[i].wdir,
                        wind: detailedDailyWeatherData[i].wspd,
                        condition: detailedDailyWeatherData[i].conditions,
                        uvIndex: detailedDailyWeatherData[i].uvindex,
                        date: detailedDailyWeatherData[i].datetimeStr,
                    })
                } else {
                    mergedWeatherHourlyData.push({
                        temp: detailedDailyWeatherData[i].temp,
                        pressure: detailedDailyWeatherData[i].sealevelpressure,
                        humidity: detailedDailyWeatherData[i].humidity,
                        windDirection: detailedDailyWeatherData[i].wdir,
                        wind: detailedDailyWeatherData[i].wspd,
                        condition: detailedDailyWeatherData[i].conditions,
                        uvIndex: detailedDailyWeatherData[i].uvindex,
                        date: detailedDailyWeatherData[i].datetimeStr,
                    })
                    mergedWeatherDailyData.push(mergedWeatherHourlyData);
                    mergedWeatherHourlyData = []
                }
        }

        const dayTime = [
            "night",
            "morning",
            "day",
            "evening"
        ]

        for (let i = 1; i < mergedWeatherDailyData.length; i++) {
            const subArray = mergedWeatherDailyData[i];
            const resultWeatherHourlyData = {
                date: subArray[0].date.split('T')[0],
                id: i,
            };
            let dayTimeIndex = 0;
            for (let j = 0; j < subArray.length; j += 6) {
                const tempKey = `${dayTime[dayTimeIndex]}Temp`;
                const humidityKey = `${dayTime[dayTimeIndex]}Humidity`;
                const pressureKey = `${dayTime[dayTimeIndex]}Pressure`;
                const windKey = `${dayTime[dayTimeIndex]}Wind`;
                const windDirectionKey = `${dayTime[dayTimeIndex]}WindDirection`;
                const uvIndex = 'uvIndex';
                resultWeatherHourlyData[tempKey] = 0;
                resultWeatherHourlyData[humidityKey] = 0;
                resultWeatherHourlyData[pressureKey] = 0;
                resultWeatherHourlyData[windKey] = 0;
                resultWeatherHourlyData[windDirectionKey] = 0;
                resultWeatherHourlyData[uvIndex] = 0
                let maxTemp = -9999;
                let minTemp = 9999;
                for(let k = 0; k < 6; k++) {
                    if(k === 3) {
                        resultWeatherHourlyData[`${dayTime[dayTimeIndex]}Condition`] =
                            subArray[j + k].condition;
                    }
                    if(subArray[j + k].temp > maxTemp) {
                        maxTemp = subArray[j + k].temp;
                        resultWeatherHourlyData[`${dayTime[dayTimeIndex]}MaxTemp`] = Math.round(maxTemp);
                    }
                    if(subArray[j + k].temp < minTemp) {
                        minTemp = subArray[j + k].temp;
                        resultWeatherHourlyData[`${dayTime[dayTimeIndex]}MinTemp`] = Math.round(minTemp);
                    }
                    resultWeatherHourlyData[`${dayTime[dayTimeIndex]}Temp`] +=
                        subArray[j + k].temp;
                    resultWeatherHourlyData[`${dayTime[dayTimeIndex]}Pressure`] +=
                        subArray[j + k].pressure;
                    resultWeatherHourlyData[`${dayTime[dayTimeIndex]}Humidity`] +=
                        subArray[j + k].humidity;
                    resultWeatherHourlyData[`${dayTime[dayTimeIndex]}WindDirection`] +=
                        subArray[j + k].windDirection;
                    resultWeatherHourlyData[`${dayTime[dayTimeIndex]}Wind`] +=
                        subArray[j + k].wind;
                    resultWeatherHourlyData['uvIndex'] +=
                        subArray[j + k].uvIndex;
                }
                resultWeatherHourlyData[tempKey] = Math.round(resultWeatherHourlyData[tempKey] / 6);
                resultWeatherHourlyData[pressureKey] = Math.round(resultWeatherHourlyData[pressureKey] / 6);
                resultWeatherHourlyData[humidityKey] = Math.round(resultWeatherHourlyData[humidityKey] / 6);
                resultWeatherHourlyData[windDirectionKey] = Math.round(resultWeatherHourlyData[windDirectionKey] / 6);
                resultWeatherHourlyData[windKey] = Math.round(resultWeatherHourlyData[windKey] / 6);
                resultWeatherHourlyData[uvIndex] = Math.round(resultWeatherHourlyData[uvIndex] / 24);
                dayTimeIndex++;
            }
            resultWeatherDailyData.push(resultWeatherHourlyData);
        }
        console.log(resultWeatherDailyData);
        return resultWeatherDailyData;

    }

    return (
        <div className={styles['main-container']}>
            <h1 className={styles["title"]}>Weather for 10 days - {city}</h1>
            <div className={styles["content-container"]}>
                {fusionData(detailedDailyWeatherData).map((detailedWeatherData, index) => (
                    <div
                         key={detailedWeatherData.id}
                         ref={(el) => (dayRefs.current[detailedWeatherData.id] = el)}>
                        <DetailedDailyForecastElement
                            key={detailedWeatherData.id}
                            detailedWeatherData={detailedWeatherData}>
                        </DetailedDailyForecastElement>
                    </div>
                    ))}
            </div>
        </div>


)
}

export default DetailedDailyForecastBlock;