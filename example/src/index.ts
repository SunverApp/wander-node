import { Wander } from '../../src'
import 'dotenv/config'

;(async () => {
  const wander = new Wander({
    clientId: process.env.WANDER_CLIENT_ID,
    clientSecret: process.env.WANDER_CLIENT_SECRET,
  })

  const success = await wander.login()

  if (!success) {
    return
  }

  const places = await wander.getEvents({
    eventCategoryNames: ['musique'],
    placeProximity: {
      lng: 2,
      lat: 48,
      maxDistanceInKm: 5,
    },
  })
  console.log(places)
})()
