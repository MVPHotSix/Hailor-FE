import * as jwt from 'jsonwebtoken'
import { create } from 'zustand/react'
import { VITE_SERVER_URL } from '../config'
import { IToken, IUser } from '../types/users.ts'

interface UserStore {
    user: IUser
    setToken: (token: IToken) => void
    getToken: () => string
    getUser: () => IUser
}

export const userStore = create<UserStore>(set => ({
    user: {
        email: '',
        userId: '',
        name: '',
        role: '',
        exp: 0,
    },
    setToken: token => {
        const user: IUser = jwt.decode(token.accessToken) as IUser
        set({ user })

        sessionStorage.setItem('accessToken', token.accessToken)
        sessionStorage.setItem('refreshToken', token.refreshToken)
        sessionStorage.setItem('exp', `${user.exp}`)
    },
    getToken: () => {
        const exp = parseInt(sessionStorage.getItem('exp'))
        if (exp - Math.floor(Date.now() / 1000) < 1000) {
            fetch(`${VITE_SERVER_URL}/api/v1/auth/refresh?token=${sessionStorage.getItem('refreshToken')}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: sessionStorage.getItem('accessToken'),
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    sessionStorage.setItem('accessToken', data.accessToken)
                    sessionStorage.setItem('refreshToken', data.refreshToken)
                })
        }
        return sessionStorage.getItem('accessToken') || ''
    },
    getUser: () => (jwt.decode(sessionStorage.getItem('accessToken') || '') || {}) as IUser,
}))
