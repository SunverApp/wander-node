import axios, { AxiosInstance } from 'axios'

import { CompleteEvent, Event, GetEventsOptions, SearchEventsResult } from './types'

export * from './types'

export class Wander {
  private api: AxiosInstance

  authMethod: 'accessToken' | 'clientId/clientSecret' = 'accessToken'
  clientId: string | undefined = undefined
  clientSecret: string | undefined = undefined
  accessToken: string | undefined = undefined
  refreshToken: string | undefined = undefined

  constructor({
    clientId,
    clientSecret,
    accessToken,
  }: {
    clientId?: string
    clientSecret?: string
    accessToken?: string
  }) {
    this.clientId = clientId
    this.clientSecret = clientSecret
    this.accessToken = accessToken

    this.api = axios.create({
      baseURL: 'https://www.wander-service.fr/api/clients',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (accessToken) {
      console.log('Auth method: accessToken')
      this.authMethod = 'accessToken'
      this.api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
    } else if (clientId && clientSecret) {
      console.log('Auth method: clientId/clientSecret')
      this.authMethod = 'clientId/clientSecret'
    } else {
      console.error(
        `Invalid credentials: clientId='${clientId}' clientSecret='${clientSecret}' accessToken='${accessToken}'`
      )
    }
  }

  async login(): Promise<boolean> {
    if (this.authMethod === 'accessToken') {
      console.error("calling login() in not necessary with 'accessToken' auth method")
      return true
    }

    try {
      const response = await this.api.post('/login', {
        grantAccess: 'client_secret',
        clientId: this.clientId,
        clientSecret: this.clientSecret,
      })

      if (response.status === 201) {
        this.accessToken = response.data.access_token
        this.refreshToken = response.data.refresh_token

        this.api.defaults.headers.common['Authorization'] = `Bearer ${this.accessToken}`

        return true
      } else {
        console.error(`Error in login: ${response.data}`)
        return false
      }
    } catch (error: unknown) {
      console.error(`Error in login: ${error}`)
      return false
    }
  }

  async getEvents({
    eventCategoryNames,
    locationFilter,
    lowestPrice,
    highestPrice,
    datesFilter,
    limit,
    pageNb,
    orderBy,
    orderByDistanceToPlace,
  }: GetEventsOptions): Promise<Event[]> {
    try {
      const response = await this.api.post('/get/events', {
        eventCategoryNames,
        locationFilter,
        lowestPrice: lowestPrice || 0,
        highestPrice: highestPrice || 9999,
        datesFilter: {
          minDate: datesFilter?.minDate || new Date().toISOString(),
          maxDate:
            datesFilter?.maxDate ||
            new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
        },
        limit: limit || 100,
        pageNb: pageNb || 1,
        orderBy: orderBy || 'date',
        orderByDistanceToPlace,
      })

      return response.data
    } catch (e) {
      console.error(e)
      return []
    }
  }

  async getEvent(id: number): Promise<CompleteEvent | null> {
    try {
      const response = await this.api.get(`/event/${id}`)

      return response.data
    } catch (e) {
      console.error(e)
      return null
    }
  }

  async search(
    searchInput: string,
    coordinates: { lat: number; lng: number }
  ): Promise<SearchEventsResult[]> {
    try {
      const response = await this.api.get(
        `/search?searchInput=${searchInput}&coordinates=${coordinates.lat}&coordinates=${coordinates.lng}`
      )
      return response.data
    } catch (e) {
      console.error(e)
      return []
    }
  }
}
