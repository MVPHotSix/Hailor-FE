import { useState } from 'react'
import { IGeoData } from '../types/geoData.ts'

export default function useGeolocation(): IGeoData {
    const [result, setResult] = useState<IGeoData>({
        latitude: 0,
        longitude: 0,
        accuracy: 0,
        status: 'none',
    })
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude, accuracy } = position.coords
                setResult({
                    latitude: latitude,
                    longitude: longitude,
                    accuracy: accuracy,
                    status: 'success',
                })
            },
            error => {
                setResult({
                    latitude: 0,
                    longitude: 0,
                    accuracy: 0,
                    status: `${error.message}`,
                })
            },
            {
                enableHighAccuracy: true,
                timeout: 1000,
                maximumAge: 30000,
            },
        )
    } else {
        setResult({
            latitude: 0,
            longitude: 0,
            accuracy: 0,
            status: 'not provided',
        })
    }
    return result
}
