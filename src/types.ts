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
