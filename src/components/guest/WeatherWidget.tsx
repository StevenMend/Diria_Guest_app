// src/components/guest/WeatherWidget.tsx - LUXURY RESORT COMPLETE VERSION
import React from 'react';
import { Sun, CloudRain, Wind, LucideIcon, Droplets, Eye, Thermometer } from 'lucide-react';

interface WeatherForecastItem {
  time: string;
  temp: number;
  icon: LucideIcon;
  condition: string;
}

interface WeatherData {
  current: {
    temp: number;
    condition: string;
    icon: LucideIcon;
    humidity: number;
    windSpeed: number;
    uvIndex: number;
  };
  forecast: WeatherForecastItem[];
}

interface WeatherWidgetProps {
  weatherData?: WeatherData;
}

export default function WeatherWidget({ weatherData }: WeatherWidgetProps) {
  // Default weather data with Tamarindo conditions
  const defaultWeatherData: WeatherData = {
    current: {
      temp: 28,
      condition: 'Perfect Beach Day',
      icon: Sun,
      humidity: 65,
      windSpeed: 12,
      uvIndex: 8
    },
    forecast: [
      { time: '2PM', temp: 30, icon: Sun, condition: 'Sunny' },
      { time: '4PM', temp: 29, icon: CloudRain, condition: 'Light Rain' },
      { time: '6PM', temp: 26, icon: CloudRain, condition: 'Rain' },
      { time: '8PM', temp: 24, icon: Wind, condition: 'Breezy' }
    ]
  };

  const data = weatherData || defaultWeatherData;

  return (
    <div className="bg-gradient-to-br from-white/95 to-diria-cream-light/80 backdrop-blur-xl rounded-3xl p-8 border border-diria-cream shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden relative">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-diria-gold/10 to-transparent rounded-bl-3xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-diria-teal/10 to-transparent rounded-tr-3xl"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-bold text-diria-brown font-display mb-1">Tamarindo Weather</h3>
            <p className="text-diria-brown/70">Perfect for your beach day</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-diria-brown/60">Today</div>
            <div className="text-xs text-diria-brown/50">December 28</div>
          </div>
        </div>

        {/* Current Weather */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-diria-gold to-diria-gold-dark rounded-3xl flex items-center justify-center shadow-xl animate-float-subtle">
                <data.current.icon className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-diria-gold/30 to-diria-gold-dark/30 rounded-3xl blur opacity-60 animate-pulse"></div>
            </div>
            <div>
              <div className="text-4xl font-bold text-diria-brown mb-1">{data.current.temp}°C</div>
              <div className="text-lg text-diria-brown/80 font-medium">{data.current.condition}</div>
              <div className="text-sm text-diria-brown/60">Feels perfect for beach activities</div>
            </div>
          </div>
        </div>
        
        {/* Weather Details */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-diria-cream-dark hover:scale-105 transition-all duration-200 text-center group">
            <div className="w-10 h-10 bg-diria-teal/10 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-diria-teal/20 transition-colors">
              <Droplets className="w-5 h-5 text-diria-teal" />
            </div>
            <div className="text-sm text-diria-brown/60 mb-1">Humidity</div>
            <div className="text-lg font-bold text-diria-brown">{data.current.humidity}%</div>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-diria-cream-dark hover:scale-105 transition-all duration-200 text-center group">
            <div className="w-10 h-10 bg-diria-brown/10 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-diria-brown/20 transition-colors">
              <Wind className="w-5 h-5 text-diria-brown" />
            </div>
            <div className="text-sm text-diria-brown/60 mb-1">Wind</div>
            <div className="text-lg font-bold text-diria-brown">{data.current.windSpeed} km/h</div>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-diria-cream-dark hover:scale-105 transition-all duration-200 text-center group">
            <div className="w-10 h-10 bg-diria-gold/10 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-diria-gold/20 transition-colors">
              <Eye className="w-5 h-5 text-diria-gold" />
            </div>
            <div className="text-sm text-diria-brown/60 mb-1">UV Index</div>
            <div className="text-lg font-bold text-diria-brown">{data.current.uvIndex}</div>
          </div>
        </div>
        
        {/* Hourly Forecast */}
        <div>
          <h4 className="text-lg font-semibold text-diria-brown mb-4 font-display">Today's Forecast</h4>
          <div className="grid grid-cols-4 gap-3">
            {data.forecast.map((item, index) => (
              <div key={index} className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 text-center border border-diria-cream hover:bg-white/70 transition-all duration-300 hover:scale-105 group">
                <div className="text-sm text-diria-brown/60 mb-2 font-medium">{item.time}</div>
                <div className="w-8 h-8 mx-auto mb-3 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-diria-teal group-hover:text-diria-teal-dark transition-colors icon-bounce" />
                </div>
                <div className="text-sm font-bold text-diria-brown">{item.temp}°</div>
                <div className="text-xs text-diria-brown/50 mt-1">{item.condition}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Beach Activity Suggestion */}
        <div className="mt-6 p-4 bg-gradient-to-r from-diria-teal/10 to-diria-gold/10 rounded-2xl border border-diria-cream-dark">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-diria-teal rounded-full flex items-center justify-center">
              <Sun className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-sm font-semibold text-diria-brown">Perfect Beach Conditions</div>
              <div className="text-xs text-diria-brown/70">Ideal for catamaran tours and water activities</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}