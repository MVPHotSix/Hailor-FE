import { IPostReservation } from '../types/reservation.ts'
import { VITE_SERVER_URL } from '../config'

export async function postReservation(request: IPostReservation): Promise<void> {
    const query = new URLSearchParams(request.uri)
    await fetch(`${VITE_SERVER_URL}/api/v1/reservation?${query}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${request.secret.token}`,
        },
    })
    return
}
