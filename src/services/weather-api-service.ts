import type { AxiosResponse } from "axios"
import { HttpClient } from "@/services/HttpClient"
import type { WeatherData } from "@/types/weather"
import type geolocation from "@/types/geolocation"

export class WeatherService extends HttpClient {
  private static classInstance: any

  public constructor(url = import.meta.env.VITE_API_URL) {
    super(url)
  }
  static getInstance(): any {
    if (!this.classInstance) {
      this.classInstance = new WeatherService()
    }
    return this.classInstance
  }

  public getWeatherData = (UserPosition: geolocation) =>
    this.instance.get<AxiosResponse>(`forecast?latitude=${UserPosition.latitude}&longitude=${UserPosition.longitude}&hourly=temperature_2m,precipitation&current_weather=true&past_days=2`)

}
