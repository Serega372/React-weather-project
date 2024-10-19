import React, {createContext, useContext, useState} from "react";

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
    const [geoData, setGeoData] = useState({});
    const [appState, setAppState] = useState({
        weatherData: null,
        city: null,
        detailedDailyWeatherData: null,
    });

    return (
        <WeatherContext.Provider value={{ geoData, setGeoData, appState, setAppState }}>
            {children}
        </WeatherContext.Provider>
    )
}
