import { defineStore } from "pinia"
import type { WeatherData } from "@/types/weather"
import { WeatherService } from "@/services/weather-api-service"
import uselocation from "@/composables/uselocation"

export const useUserProfiles = defineStore("user-profile", {
  state: () => {
    return {
      data: [
      
      ] as WeatherData[],
      errorMessage: "",
      response: {},
      api: WeatherService
    }
  },
  actions: {
    async getCurrentWeather() {
      const { payload } = uselocation()

      try {
        const response = await this.api.getInstance().getWeatherData(payload)
        this.data = response.data.profiles
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
        const errorsDetails = error.response.data.detail
    
        this.errorMessage = errorsDetails
        return error
      }
    }
  }
})
