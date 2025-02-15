import { VITE_SERVER_URL } from '../config'
import { IGetDesignerList, IGetDesignerListFilter, IGetDesignerScheduleResponse, IRegion } from '../types/designer.ts'

export async function getRegions(token: string): Promise<IRegion[]> {
    const res = await fetch(`${VITE_SERVER_URL}/api/v1/designer/regions`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })

    if (!res.ok) {
        return
    }
    return res.json()
}

export async function getDesigners(filter: IGetDesignerListFilter, token: string): Promise<IGetDesignerList> {
    const query = new URLSearchParams(filter)
    const res = await fetch(`${VITE_SERVER_URL}/api/v1/designer?${query}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
    if (!res.ok) {
        return
    }
    return res.json()
}

export async function getDesignerSchedule(id: number, date: string, token: string): Promise<IGetDesignerScheduleResponse> {
    const res = await fetch(`${VITE_SERVER_URL}/api/v1/designer/${id}/schedule?date=${date}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
    if (!res.ok) {
        return
    }
    return res.json()
}
