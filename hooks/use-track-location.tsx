import { ACTION_TYPES } from '@/store/actions'
import { StoreContext } from '@/store/store-context'
import { useContext, useState } from 'react'

const useTrackLocation = () => {
  const [locationErrorMsg, setLocationErrorMsg] = useState('')
  // const [latLang, setLatLang] = useState('')
  const [isTrackLocation, setIsTrackLocation] = useState(false)

  const { state,dispatch } = useContext(StoreContext)

  const success = (position: GeolocationPosition) => {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    setLocationErrorMsg('')
    // setLatLang(`${latitude},${longitude}`)
    dispatch({
      type: ACTION_TYPES.SET_LAT_LANG,
      payload: { ...state,latLang: `${latitude},${longitude}` },
    })
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
      dispatch({
        type: ACTION_TYPES.SET_LAT_LANG,
        payload: { ...state,latLang: '51.51039880064006,-0.12227748822612572' },
      })  
      // setLatLang('51.51039880064006,-0.12227748822612572')
    }
  }

  return { locationErrorMsg, handleTrackLocation, isTrackLocation }
}

export default useTrackLocation
