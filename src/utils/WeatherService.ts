import axios, { AxiosInstance } from 'axios';
import type { WeatherData } from './types';
const apiKey = process.env.OPENWEATHER_API;

class WeatherService {
  private apiClient: AxiosInstance;
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.OPENWEATHER_API;
    this.apiClient = axios.create({
      baseURL: 'https://api.openweathermap.org/data/2.5',
      params: {
        appid: this.apiKey
      }
    });
  }

  async getWeatherData(city: string) {
    const response = await this.apiClient.get('/weather', {
      params: {
        q: city,
        units: 'metric'
      }
    });

    return response.data;
  }

  
}
export async function getWeatherData(latitude: number, longitude: number): Promise<WeatherData> {
  const API_KEY = process.env.OPENWEATHER_API;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;
  const response = await axios.get<WeatherData>(url);
  return response.data;
}

export default WeatherService;




