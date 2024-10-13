import { useState } from 'react'
import {Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import MainPage from './pages/MainPage/MainPage.jsx';
import ForecastPage from "./pages/ForecastPage/ForecastPage.jsx";
import { WeatherProvider } from "./contexts/WeatherContext.jsx";

const App = () => {
  return (
      <WeatherProvider>
        <Routes>
          <Route path='/' element={<MainPage/>} />
          <Route path='*' element={<Navigate to='/'/>} />
          <Route path='/forecast-page' element={<ForecastPage/>} />
        </Routes>
      </WeatherProvider>
  )
}

export default App
