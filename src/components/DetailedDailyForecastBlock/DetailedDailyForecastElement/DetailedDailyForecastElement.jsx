import React from 'react';
import styles from "./DetailedDailyForecastElement.module.css";
import {dateBuilder} from "../../../utils/weatherUtils.js";

const DetailedDailyForecastElement = ({ detailedWeatherData }) => {

    const convertPressure = (pressure) => {
        return Math.round(pressure * 0.75);
    }

    return (
        <div className={styles['detailed-forecast-container']}>
            <div className={styles['date-info']}>
                <span className={styles["date-number"]}>
                    {dateBuilder(detailedWeatherData.date, 1)[2]}
                </span>
                <div className={styles["date-wrap"]}>
                    <span className={styles["date-month"]}>{dateBuilder(detailedWeatherData.date, 1)[3]},</span>
                    <span className={styles["date-day"]}>{dateBuilder(detailedWeatherData.date, 1)[0]}</span>
                </div>
            </div>
            <div className={`${styles["pressure"]} ${styles['container-0']}`}>
                pressure,<br/>
                mmhg
            </div>
            <div className={`${styles["humidity"]} ${styles['container-0']}`}>humidity</div>
            <div className={`${styles["wind"]} ${styles['container-0']}`}>wind, m/s</div>
            <div className={`${styles["feels-like"]} ${styles['container-0']}`}>feels like</div>
            <div className={styles["border-line"]}></div>
            <div className={`${styles['temp-morning']} ${styles['container-1']}`}>
                night<br/>
                {detailedWeatherData.nightMinTemp}&deg;...{detailedWeatherData.nightMaxTemp}&deg;
            </div>
            <div className={`${styles['condition-morning']} ${styles['container-2']}`}>
                {detailedWeatherData.nightCondition}
            </div>
            <div className={`${styles['pressure-morning']} ${styles['container-2']}`}>
                {convertPressure(detailedWeatherData.nightPressure)}
            </div>
            <div className={`${styles['humidity-morning']} ${styles['container-2']}`}>
                {detailedWeatherData.nightHumidity}%
            </div>
            <div className={`${styles['wind-morning']} ${styles['container-2']}`}>
                {detailedWeatherData.nightWind}
            </div>
            <div className={`${styles['feels-like-morning']} ${styles['container-2']}`}>
                {detailedWeatherData.nightTemp}&deg;
            </div>
            <div className={`${styles['temp-day']} ${styles['container-1']}`}>
                morning<br/>
                {detailedWeatherData.morningMinTemp}&deg;...{detailedWeatherData.morningMaxTemp}&deg;
            </div>
            <div className={`${styles['condition-day']} ${styles['container-2']}`}>
                {detailedWeatherData.morningCondition}
            </div>
            <div className={`${styles['pressure-day']} ${styles['container-2']}`}>
                {convertPressure(detailedWeatherData.morningPressure)}
            </div>
            <div className={`${styles['humidity-day']} ${styles['container-2']}`}>
                {detailedWeatherData.morningHumidity}%
            </div>
            <div className={`${styles['wind-day']} ${styles['container-2']}`}>
                {detailedWeatherData.morningWind} dir
            </div>
            <div className={`${styles['feels-like-day']} ${styles['container-2']}`}>
                {detailedWeatherData.morningTemp}&deg;
            </div>
            <div className={`${styles['temp-evening']} ${styles['container-1']}`}>
                day<br/>
                {detailedWeatherData.dayMinTemp}&deg;...{detailedWeatherData.dayMaxTemp}&deg;
            </div>
            <div className={`${styles['condition-evening']} ${styles['container-2']}`}>
                {detailedWeatherData.dayCondition}
            </div>
            <div className={`${styles['pressure-evening']} ${styles['container-2']}`}>
                {convertPressure(detailedWeatherData.dayPressure)}
            </div>
            <div className={`${styles['humidity-evening']} ${styles['container-2']}`}>
                {detailedWeatherData.dayHumidity}%
            </div>
            <div className={`${styles['wind-evening']} ${styles['container-2']}`}>
                {detailedWeatherData.dayWind}
            </div>
            <div className={`${styles['feels-like-evening']} ${styles['container-2']}`}>
                {detailedWeatherData.dayTemp}&deg;
            </div>
            <div className={`${styles['temp-night']} ${styles['container-1']}`}>
                evening<br/>
                {detailedWeatherData.eveningMinTemp}&deg;...{detailedWeatherData.eveningMaxTemp}&deg;
            </div>
            <div className={`${styles['condition-night']} ${styles['container-2']}`}>
                {detailedWeatherData.eveningCondition}
            </div>
            <div className={`${styles['pressure-night']} ${styles['container-2']}`}>
                {convertPressure(detailedWeatherData.eveningPressure)}
            </div>
            <div className={`${styles['humidity-night']} ${styles['container-2']}`}>
                {detailedWeatherData.eveningHumidity}%
            </div>
            <div className={`${styles['wind-night']} ${styles['container-2']}`}>
                {detailedWeatherData.eveningWind}
            </div>
            <div className={`${styles['feels-like-night']} ${styles['container-2']}`}>
                {detailedWeatherData.eveningTemp}&deg;
            </div>
            <div className={styles["border-line2"]}></div>
            <div className={styles["footer"]}>
                <div>UV-index: {detailedWeatherData.uvIndex}</div>
            </div>
        </div>
    )
}

export default DetailedDailyForecastElement;