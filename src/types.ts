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
  categories: EventCategory[]
  score: number
  createdAt: string
  updatedAt: string
  sources: Source[]
}

type Coordinate = [number, number]

export type Address = {
  coordinates: Coordinate[]
  street: string | null
  city: string | null
  postalCode: string | null
  country: string | null
}

type FirstOccurence = {
  startDate: string
  endDate: string
  endDateIsNotReliable: boolean
}

type EventCategory = {
  id: number
  name: string | null
  mainCategory: string
  traductionFR: string
  traductionEN: string
  icon: string
}

type EventForPlace = {
  id: number
  name: string
  lowestPrice: number | null
  highestPrice: number | null
  hasGoodDeal: boolean
  image: string | null
  squareImage: string | null
  rectangleImage: string | null
  trendingimage: string | null
  partnerName: string
  placeId: number
  lng: number
  lat: number
  placeName: string
  firstOccurrence: FirstOccurence
  nbOfOccurrencesInDates: number
  cantRetrieveOccurrences: boolean
  categories: EventCategory[]
  score: number
  additionalScore: number
}

export type Place = {
  id: number
  name: string
  address: Address
  events: EventForPlace[]
}

export type EventOnMap = {
  id: number
  name: string
  lowestPrice: number | null
  highestPrice: number | null
  hasGoodDeal: boolean
  image: string | null
  squareImage: string | null
  rectangleImage: string | null
  trendingimage: string | null
  partnerName: string
  placeId: number
  lng: number
  lat: number
  placeName: string
  firstOccurrence: object
  nbOfOccurrencesInDates: number
  cantRetrieveOccurrences: boolean
  categories: EventCategory[]
  score: number
  additionalScore: number
}

type Source = {
  id: number
  partner: Partner
  startDate: string
  endDate: string
  lowestPrice: number | null
  highestPrice: number | null
  isGoodDeal: boolean
  hasCommission: boolean
  link: string
  bookable: string
  availableDates: AvailableDate[]
  cantRetrieveOccurrences: boolean
  notAvailable: string | null
}

export type CompleteEvent = {
  id: number
  name: string
  startDate: string
  endDate: string
  endDateIsNotReliable: boolean
  lowestPrice: number | null
  highestPrice: number | null
  description: string
  image: string | null
  squareImage: string | null
  rectangleImage: string | null
  webImage: string | null
  notAvailable: string | null
  cancelled: string | null
  place: object
  sources: Source[]
  categories: EventCategory[]
  commentaries: object
  averageGrade: number | null
  nbOfGrades: number
  performers: Performer[]
}

type PlaceWithoutEvents = {
  id: number
  name: string
  address: Address
}

export type EventForSearch = {
  id: number
  name: string
  startDate: string
  endDate: string
  endDateIsNotReliable: boolean
  notAvailable: string | null
  lowestPrice: number | null
  highestPrice: number | null
  description: string
  image: string | null
  squareImage: string | null
  rectangleImage: string | null
  place: PlaceWithoutEvents
  averageGrade: number | null
  nbOfGrades: number
  categories: EventCategory[]
  score: number
}

export type PlaceForSearch = {
  id: number
  name: string
  address: Address
  image: string | null
  squareImage: string | null
  rectangleImage: string | null
  isCertified: boolean
  score: number
}

type Partner = {
  name: string
  logo: string
  backColor: string
  textColor: string
  shadowColor: string
}

type AvailableDate = {
  startDate: string
  endDate: string
  endDateIsNotReliable: boolean
}

export type EventSource = {
  id: number
  partner: Partner
  startDate: string
  endDate: string
  lowestPrice: number | null
  highestPrice: number | null
  isGoodDeal: boolean
  hasCommission: boolean
  link: string
  bookable: string
  availableDates: AvailableDate[]
  cantRetrieveOccurrences: boolean
  notAvailable: string | null
}

export type Performer = {
  id: number
  name: string
  description: string | null
  image: string | null
  squareImage: string | null
  rectangleImage: string | null
  webImage: string | null
}

export type GetEventsOptions = {
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
}

export type SearchEventsResult = {
  events: EventForSearch[]
  place: Place
}[]
