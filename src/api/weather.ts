import axios from 'axios';
import type { WeatherData, ForecastData, GeoSuggestion, WeatherQuery } from '../types';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchWeather = async (query: WeatherQuery): Promise<WeatherData> => {
  try {
    const params: any = {
      appid: API_KEY,
      units: 'metric',
      lang: 'id',
    };

    if (typeof query === 'string') {
      params.q = query;
    } else {
      params.lat = query.lat;
      params.lon = query.lon;
    }

    const response = await axios.get<WeatherData>(`${BASE_URL}/weather`, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchForecast = async (query: WeatherQuery): Promise<ForecastData> => {
  try {
    const params: any = {
      appid: API_KEY,
      units: 'metric',
      lang: 'id',
    };

    if (typeof query === 'string') {
      params.q = query;
    } else {
      params.lat = query.lat;
      params.lon = query.lon;
    }

    const response = await axios.get<ForecastData>(`${BASE_URL}/forecast`, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchCities = async (query: string): Promise<GeoSuggestion[]> => {
  if (!query) return [];
  try {
    const response = await axios.get<GeoSuggestion[]>(`https://api.openweathermap.org/geo/1.0/direct`, {
      params: {
        q: query,
        limit: 5,
        appid: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching cities:', error);
    return [];
  }
};
