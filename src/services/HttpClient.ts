import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosResponse
} from "axios"

const UNAUTHORIZED = 401

export abstract class HttpClient {
  protected readonly instance: AxiosInstance
  public constructor(baseURL?: string) {
    this.instance = axios.create({
      baseURL
    })
    this._initializeResponseInterceptor()
  }

  private _initializeResponseInterceptor = () => {
    this.instance.interceptors?.response.use(
      this._handleResponse,
      this._handleError
    )
    this.instance.defaults.headers.common["Authorization"] =
      window.localStorage.getItem("access_token") || ""
  }

  private _handleResponse = (response: AxiosResponse) => response

  protected _handleError = async (error: AxiosError) => {
    if (this._hasToRefreshToken(error)) {
      const refreshToken = window.localStorage.getItem("refresh_token") || ""
      this.instance.defaults.headers.common["Authorization"] = refreshToken
      // refresh and retry request
      const { config: originalRequest } = error
      try {
        const newToken = await this._refreshToken()
        if (originalRequest?.headers) {
          originalRequest.headers["Authorization"] = newToken
        }
        return await this.instance.request(originalRequest)
      } catch {
        if (error.response && error.response.status === UNAUTHORIZED) {
          window.location.href = "/logout"
        }
        throw error
      }
    }
    return Promise.reject(error)
  }

  private _hasToRefreshToken(error: AxiosError): boolean {
    const status: number | undefined = error.response?.status
    return (
      status === UNAUTHORIZED &&
      error.config.url !== "/refresh" &&
      error.config.url !== "/login"
    )
  }

  private _refreshToken = async () => {
    try {
      const response = await this.instance.post("/refresh")
      const newAccessToken = response.data.access_token
      window.localStorage.setItem("access_token", newAccessToken)
      this.instance.defaults.headers.common["Authorization"] = newAccessToken
      return newAccessToken
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
