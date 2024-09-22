import axios, { AxiosInstance } from 'axios'

export type EventCategoryName =
  | 'atelier'
  | 'brocante'
  | 'cinema'
  | 'conference'
  | 'enfants'
  | 'expo'
  | 'festival'
  | 'gastronomie'
  | 'livres'
  | 'loisirs'
  | 'meeting'
  | 'musique'
  | 'nature'
  | 'pro'
  | 'salon'
  | 'sciences'
  | 'soiree'
  | 'solidarite'
  | 'spectacle'
  | 'sport'
  | 'visite'

export class Wander {
  private api: AxiosInstance

  clientId: string
  clientSecret: string
  accessToken: string | null = null
  refreshToken: string | null = null

  constructor({ clientId, clientSecret }: { clientId: string; clientSecret: string }) {
    this.clientId = clientId
    this.clientSecret = clientSecret

    this.api = axios.create({
      baseURL: 'https://www.wander-service.fr/api/clients',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!clientId || !clientSecret) {
      console.error(`Invalid credentials: clientId='${clientId}' clientSecret='${clientSecret}'`)
    }
  }

  async login(): Promise<boolean> {
    try {
      const response = await this.api.post('/login', {
        grant_access: 'client_secret',
        client_id: this.clientId,
        client_secret: this.clientSecret,
      })

      if (response.status === 201) {
        // login success
        this.accessToken = response.data.access_token
        this.refreshToken = response.data.refresh_token

        this.api.defaults.headers.common['Authorization'] = `Bearer ${this.accessToken}`

        return true
      } else {
        console.error(response.data)
        return false
      }
    } catch (error: unknown) {
      console.error(`Error in login: ${error}`)
      return false
    }
  }

  async getEvents({
    eventCategoryNames,
    placeProximity,
    lowestPrice,
    highestPrice,
    afterDate,
    beforeDate,
    limit,
    pageNb,
    orderBy,
  }: {
    eventCategoryNames: EventCategoryName[]
    placeProximity: {
      lng: number
      lat: number
      maxDistanceInKm: number
    }
    lowestPrice?: number
    highestPrice?: number
    afterDate?: string
    beforeDate?: string
    limit?: number
    pageNb?: number
    orderBy?: 'date' | 'updatedAt'
  }) {
    try {
      const response = await this.api.post('/get/events', {
        eventCategoryNames,
        placeProximity,
        lowestPrice: lowestPrice || 0,
        highestPrice: highestPrice || 9999,
        afterDate: afterDate || new Date().toISOString(),
        beforeDate:
          beforeDate || new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
        limit: limit || 100,
        pageNb: pageNb || 1,
        orderBy: orderBy || 'date',
      })

      console.log(response.status)
      console.log(response.data)

      return []
    } catch (e) {
      console.error(e)
      return []
    }
  }

  getEvent() {}
}
