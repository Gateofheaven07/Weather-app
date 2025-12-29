import { useState, useEffect } from 'react';
import { fetchWeather, fetchForecast } from '../api/weather';
import type { WeatherData, ForecastData, WeatherQuery } from '../types';

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const searchCity = async (query: WeatherQuery) => {
    setLoading(true);
    setError(null);
    try {
      const [weatherData, forecastData] = await Promise.all([
        fetchWeather(query),
        fetchForecast(query),
      ]);
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Gagal mengambil data cuaca');
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    searchCity('Jakarta'); // Default city
  }, []);

  return { weather, forecast, loading, error, searchCity };
};
