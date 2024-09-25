import { Wander } from '../../src'
import 'dotenv/config'

async function main(): Promise<void> {
  const wander = new Wander({
    accessToken: process.env.WANDER_ACCESS_TOKEN,
  })

  const places = await wander.getEvents({
    eventCategoryNames: ['expo'],
    locationFilter: {
      circle: {
        centerLat: 48.866667,
        centerLng: 2.333333,
        maxDistanceInKm: 50,
      },
    },
  })

  for (const place of places) {
    console.log('\n')
    console.log(place.id)
    console.log(place.name)
    console.log(place.image)
  }

  if (places.length) {
    const event = await wander.getEvent(places[0].id)
    console.log('event', event.name)
  }

  const searchResult = await wander.search("Musee d'Orsay", {
    lat: 48.859961,
    lng: 2.326561,
  })

  console.log('searchResult', searchResult)
}

void main()
