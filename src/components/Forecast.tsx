import React from 'react';
import type { ForecastData } from '../types';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { motion } from 'framer-motion';

interface ForecastProps {
  data: ForecastData;
}

const Forecast: React.FC<ForecastProps> = ({ data }) => {
  // Maps unique dates and finds item closest to noon for each.
  
  // Revised Strategy: Map unique dates, find item closest to noon for each.
  const uniqueDates = Array.from(new Set(data.list.map(item => new Date(item.dt * 1000).toDateString())));
  const processedData = uniqueDates.slice(0, 5).map(dateStr => {
      // Find all items for this date
      const itemsForDate = data.list.filter(item => new Date(item.dt * 1000).toDateString() === dateStr);
      // Find the one closest to 12:00
      return itemsForDate.reduce((closest, current) => {
          const closeTime = Math.abs(new Date(closest.dt * 1000).getHours() - 12);
          const currTime = Math.abs(new Date(current.dt * 1000).getHours() - 12);
          return currTime < closeTime ? current : closest;
      });
  });


  return (
    <div className="w-full">
      <div className="h-px bg-white/30 my-6 md:hidden" /> {/* Divider only on mobile */}
      <div className="grid grid-cols-5 md:grid-cols-2 lg:grid-cols-5 gap-2 text-center text-white">
        {processedData.map((item, index) => (
          <motion.div
            key={item.dt}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col items-center p-2 rounded-xl hover:bg-white/10 transition-colors"
          >
            <span className="text-sm font-medium mb-1">
              {format(new Date(item.dt * 1000), 'EEE', { locale: id })}
            </span>
            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
              alt={item.weather[0].description}
              className="w-10 h-10 drop-shadow-md"
            />
            <div className="text-sm font-semibold mt-1">
               {Math.round(item.main.temp_max)}°
            </div>
             <div className="text-xs opacity-70">
               {Math.round(item.main.temp_min)}°
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
