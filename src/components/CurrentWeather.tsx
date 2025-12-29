import React from 'react';
import type { WeatherData } from '../types';
import { motion } from 'framer-motion';
import { Wind, Droplets } from 'lucide-react';

interface CurrentWeatherProps {
  data: WeatherData;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data }) => {
  const { name, main, weather, wind } = data;
  const temp = Math.round(main.temp);
  const tempMin = Math.round(main.temp_min);
  const tempMax = Math.round(main.temp_max);
  const description = weather[0].description;
  const iconCode = weather[0].icon;

  // Capitalize first letter of each word
  const formattedDesc = description
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center text-white mb-2"
    >
      <div className="flex items-center justify-center gap-2 mb-1 opacity-80">
        <h2 className="text-2xl font-semibold tracking-wide">{name}</h2>
      </div>
      
      <div className="flex justify-center my-2">
        <img
          src={`https://openweathermap.org/img/wn/${iconCode}@4x.png`}
          alt={description}
          className="w-24 h-24 drop-shadow-xl"
        />
      </div>

      <div className="text-6xl font-thin mb-2 tracking-tighter drop-shadow-lg">
        {temp}°
      </div>

      <div className="flex justify-center gap-6 text-base font-medium opacity-90 mb-2">
        <span>H: {tempMax}°</span>
        <span>L: {tempMin}°</span>
      </div>

      <p className="text-lg font-light opacity-90 mb-4">{formattedDesc}</p>

      {/* Extra details grid */}
      <div className="grid grid-cols-2 gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-3 mx-2">
        <div className="flex items-center justify-center gap-2">
          <Wind className="w-4 h-4 text-blue-200" />
          <span className="text-sm">{Math.round(wind.speed * 3.6)} km/h</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Droplets className="w-4 h-4 text-blue-200" />
          <span className="text-sm">{main.humidity}%</span>
        </div>
      </div>
    </motion.div>
  );
};

export default CurrentWeather;
