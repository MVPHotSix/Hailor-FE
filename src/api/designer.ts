import { VITE_SERVER_URL } from '../config'
import { userStore } from '../store/user.ts'
import { IRegion } from '../types/designer.ts'

export async function getRegions(): Promise<IRegion[]> {
    const { getToken, refresh } = userStore()
    const { accessToken } = getToken()
    const res = await fetch(`${VITE_SERVER_URL}/api/v1/designer/regions`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
    })
    if (res.status === 403) {
        refresh()
    } else if (!res.ok) {
        throw new Error(`code: ${res.status}`)
    }
    return res.json()
}
