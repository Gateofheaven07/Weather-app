import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { useDebounce } from 'use-debounce';
import { searchCities } from '../api/weather';
import type { GeoSuggestion, WeatherQuery } from '../types';

interface SearchBarProps {
  onSearch: (query: WeatherQuery) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<GeoSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [debouncedValue] = useDebounce(input, 500);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedValue.length > 2) {
        const cities = await searchCities(debouncedValue);
        setSuggestions(cities);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    fetchSuggestions();
  }, [debouncedValue]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
      setShowSuggestions(false);
      setInput('');
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (city: GeoSuggestion) => {
    onSearch({ lat: city.lat, lon: city.lon });
    setInput('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div ref={wrapperRef} className="relative z-50">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          placeholder="Cari Kota..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-3 pl-10 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg transition-all text-sm"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/80 w-4 h-4" />
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute w-full mt-2 bg-white/30 backdrop-blur-xl border border-white/30 rounded-xl shadow-2xl max-h-60 overflow-y-auto text-white z-50 scrollbar-thin scrollbar-thumb-white/50">
          {suggestions.map((city, index) => (
            <li
              key={`${city.lat}-${city.lon}-${index}`}
              onClick={() => handleSelectSuggestion(city)}
              className="px-4 py-3 hover:bg-white/20 cursor-pointer border-b border-white/10 last:border-b-0 text-sm flex flex-col"
            >
              <span className="font-medium">{city.name}</span>
              <span className="text-xs opacity-70">
                {city.state ? `${city.state}, ` : ''}{city.country}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
