import { useState } from 'react'

const useTrackLocation = () => {
  const [locationErrorMsg, setLocationErrorMsg] = useState('')
  const [LatLang, setLatLang] = useState('')
  const [isTrackLocation, setIsTrackLocation] = useState(false)

  const success = (position: GeolocationPosition) => {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    setLocationErrorMsg('')
    setLatLang(`${latitude},${longitude}`)
    setIsTrackLocation(false)
  }

  const error = () => {
    setLocationErrorMsg('Unable to retrieve your location')
    setIsTrackLocation(false)
  }

  const handleTrackLocation = () => {
    setIsTrackLocation(true)
    if (!navigator.geolocation) {
      setLocationErrorMsg('Geolocation is not supported by your browser')
      setIsTrackLocation(false)
    } else {
      navigator.geolocation.getCurrentPosition(success, error)
    }
  }

  return { locationErrorMsg, LatLang, handleTrackLocation, isTrackLocation }
}

export default useTrackLocation
