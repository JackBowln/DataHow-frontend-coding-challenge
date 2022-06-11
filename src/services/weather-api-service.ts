import type { AxiosResponse } from "axios"
import { HttpClient } from "@/services/HttpClient"
import type { WeatherData } from "@/types/index"

export class WeatherService extends HttpClient {
  private static classInstance: any

  public constructor(url?: string) {
    super(url)
  }
  static getInstance(): any {
    if (!this.classInstance) {
      this.classInstance = new WeatherService()
    }
    return this.classInstance
  }

  public getWeatherData = () =>
    this.instance.get<AxiosResponse>("/")

}
