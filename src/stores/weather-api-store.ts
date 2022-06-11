import { defineStore } from "pinia"
import type { WeatherData } from "@/types/weather"
import { WeatherService } from "@/services/weather-api-service"
import type geolocation from "@/types/geolocation"

export const useWeatherApi = defineStore("weather-api", {
  state: () => {
    return {
      data: {} as WeatherData,
      errorMessage: "",
      response: {},
      api: WeatherService,
      payload: {}
    }
  },
  actions: {
    async getCurrentWeather(location: geolocation) {
   
        try {
          
          const response = await this.api.getInstance().getWeatherData(location)
          console.log(response)
          this.data = response.data
          this.response = response
          return response
        } catch (error) {
          this.errorMessage = this.handleErrors(error)
          this.handleErrors(error)
          return this.handleErrors(error)
        }
    },
    handleErrors(error: any) {
      if (error) {
        const errorsDetails = error.response
    
        this.errorMessage = errorsDetails
        return error
      }
    }
  }
})
