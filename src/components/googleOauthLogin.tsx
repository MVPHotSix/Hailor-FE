import { GoogleLoginIcon } from './icon'
import styled from 'styled-components'
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google'
import { VITE_SERVER_URL } from '../config'

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    border: 0.1rem solid rgba(217, 217, 217, 0.6);
    border-radius: 1.2rem;
    padding: 1.2rem;
    gap: 0.8rem;
`

const Text = styled.span`
    font-size: 1.6rem;
    font-weight: bold;
    color: #292929;
`

const clientId = '286907731085-sakmukmthfcmb7f6t6s5el9ttkc968o4.apps.googleusercontent.com'

function LoginComponent() {
    const login = useGoogleLogin({
        onSuccess: tokenResponse => {
            console.log('Success:', tokenResponse)
            fetch(`${VITE_SERVER_URL}/api/v1/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: tokenResponse.access_token }),
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                })
        },
        onError: () => {
            console.log('login failed')
        },
    })
    return (
        <Container onClick={() => login()}>
            <GoogleLoginIcon width={'3.2rem'} height={'3.2rem'} fill={'none'} />
            <Text>구글로 로그인하기</Text>
        </Container>
    )
}

function GoogleOauthLogin() {
    return (
        <GoogleOAuthProvider clientId={clientId}>
            <LoginComponent />
        </GoogleOAuthProvider>
    )
}

export default GoogleOauthLogin
