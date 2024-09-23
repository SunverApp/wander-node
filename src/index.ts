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

export type Event = {
  id: number
  name: string
  description: string
  lowestPrice: number
  highestPrice: number
  hasGoodDeal: boolean
  hasBestPrice: boolean
  image: string
  imageHeight: number
  imageWidth: number
  squareImage: string
  rectangleImage: string
  webImage: string
  placeId: number
  placeName: string
  lng: number
  lat: number
  averageGrade: number | null
  nbOfGrades: number | null
  categories: {
    id: number
    name: string
    mainCategory: string
    traductionFr: string
    traductionEn: string
    icon: string
  }[]
  score: number
  createdAt: string
  updatedAt: string
  sources: {
    id: number
    notAvailable: null | string
    partner: {
      name: string
      logo: string
      backColor: string
    }
    lowestPrice: number
    highestPrice: number
    isGoodDeal: boolean
    link: string
    bookable: boolean
    hasCommission: boolean
    startDate: string
    endDate: string
    cantRetrieveOccurrences: boolean
    availableDates: {
      id: number
      startDate: string
      endDate: string
      endDateIsNotReliable: boolean
    }[]
  }[]
}

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
  }: {
    eventCategoryNames: EventCategoryName[]
    locationFilter: {
      circle: {
        centerLng: number
        centerLat: number
        maxDistanceInKm: number
      }
    }
    datesFilter?: {
      minDate: string
      maxDate: string
    }
    lowestPrice?: number
    highestPrice?: number
    limit?: number
    pageNb?: number
    orderBy?: 'date' | 'updatedAt' | 'price' | 'distanceToPlace'
    orderByDistanceToPlace?: {
      centerLng: number
      centerLat: number
    }
  }): Promise<Event[]> {
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
}
