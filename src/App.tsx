import { useWeather } from './hooks/useWeather';
import Layout from './components/Layout';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import { Loader2 } from 'lucide-react';

function App() {
  const { weather, forecast, loading, error, searchCity } = useWeather();

  return (
    <Layout>
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-3xl p-6 text-white transition-all w-full relative overflow-hidden">
        <div className="mb-4">
           <SearchBar onSearch={searchCity} />
        </div>

        {error && (
          <div className="bg-red-500/50 backdrop-blur-md text-white p-2 rounded-lg my-2 text-center text-sm animate-pulse">
            {error}
          </div>
        )}

        {loading && (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
        )}

        {!loading && weather && (
          <div className="mt-2">
             <div className="md:hidden">
                <CurrentWeather data={weather} />
                {forecast && <Forecast data={forecast} />}
             </div>
             
             <div className="hidden md:grid md:grid-cols-2 gap-8 items-center">
                <div className="flex flex-col justify-center">
                  <CurrentWeather data={weather} />
                </div>
                <div className="md:border-l md:border-white/20 md:pl-8 flex flex-col justify-center">
                  <h3 className="text-lg font-medium mb-3 text-center md:text-left opacity-90">5-Day Forecast</h3>
                  {forecast && <Forecast data={forecast} />}
                </div>
             </div>
          </div>
        )}
        
        {!loading && !weather && !error && (
           <div className="text-white text-center py-10 opacity-80 font-light">
             Ketik nama kota untuk melihat cuaca
           </div>
        )}
      </div>
    </Layout>
  );
}

export default App;
