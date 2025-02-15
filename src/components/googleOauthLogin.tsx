import { useMemo, useState } from 'react'
import styled from 'styled-components'
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google'
import { useSuspenseQuery } from '@tanstack/react-query'

import { GoogleLoginIcon } from './icon'
import { VITE_SERVER_URL } from '../config'
import { getRegisterTerm } from '../api/users.ts'

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

const Modal = styled.div`
    position: absolute;
    top: 5rem;
    left: 0;
    min-height: calc(var(--vh, 1vh) * 100 - 5rem - 7.3rem);
    width: 100%;
    padding: 0 0 calc(env(safe-area-inset-bottom, 0.8rem) + 7.3rem) 0;
    background-color: #f5f5f5;
    overflow-y: scroll;
`

const ContextBox = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    border: 0.1rem solid rgba(217, 217, 217, 0.6);
    border-radius: 1.2rem;
    padding: 1.6rem;
    margin: 1.6rem 1.6rem 0 1.6rem;
    gap: 1rem;
`

const Button = styled.div`
    background-color: #35376e;
    color: #ffffff;
    border: 0.1rem solid #292929;
    border-radius: 50rem;
    font-size: 1.6rem;
    font-weight: bold;
    padding: 1.2rem 2.4rem;
    margin: 1.6rem 16rem;
`

const CheckBoxContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.4rem;
    padding-top: 1rem;
`

const Content = styled.iframe`
    font-size: 1.6rem;
    text-align: left;
    color: #000000;
    border: none;
`

const Text = styled.span`
    font-size: 1.6rem;
    font-weight: bold;
    color: #292929;
`

const Title = styled.span`
    font-size: 2.4rem;
    font-weight: bold;
    text-align: left;
    color: #292929;
`

const InfoText = styled.span`
    font-size: 1.4rem;
    text-align: left;
    color: rgba(41, 41, 41, 0.6);
`

const CheckBox = styled.div<{ selected: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 0 0.2rem ${props => (props.selected ? '#62A87C' : '#292929')} inset;
    border-radius: 0.6rem;
    width: 2rem;
    height: 2rem;
    color: ${props => (props.selected ? '#62A87C' : '#FFFFFF')};
`

const CheckLabel = styled.label`
    font-size: 1.4rem;
    text-align: left;
`

const clientId = '286907731085-sakmukmthfcmb7f6t6s5el9ttkc968o4.apps.googleusercontent.com'

function LoginComponent() {
    const [showModal, setShowModal] = useState<boolean>(true)
    console.log(window.location.origin)
    const login = useGoogleLogin({
        redirect_uri: `${window.location.origin}`,
        onSuccess: tokenResponse => {
            console.log('Success:', tokenResponse)
            fetch(`${VITE_SERVER_URL}/api/v1/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: tokenResponse.code }),
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    setShowModal(false)
                })
        },
        onError: () => {
            console.log('login failed')
        },
    })
    const register = useGoogleLogin({
        onSuccess: tokenResponse => {
            console.log('Success:', tokenResponse)
            fetch(`${VITE_SERVER_URL}/api/v1/auth/sign-up`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: tokenResponse.access_token }),
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    setShowModal(false)
                })
        },
        onError: () => {
            console.log('register failed')
        },
    })

    return (
        <Container
            onClick={() => {
                if (!showModal) {
                    login()
                }
            }}
        >
            <GoogleLoginIcon width={'3.2rem'} height={'3.2rem'} fill={'none'} />
            <Text>구글로 로그인하기</Text>
            {showModal && (
                <Register onClick={() => register()} />
            )}
        </Container>
    )
}

function Register({ onClick }: { onClick: () => void }) {
    const [checks, setCheck] = useState<number>(0)
    const { data } = useSuspenseQuery({
        queryKey: ['registerTerm'],
        queryFn: () => getRegisterTerm(),
    })

    const minRule = useMemo(() => {
        let result = 0
        data.terms.map(t => (result |= t.isRequired ? 1 << t.id : 0))
        return result
    }, [data])

    const checkClick = (target: number) => {
        const bit = 1 << target
        if ((checks & bit) === bit) {
            setCheck(checks ^ bit)
        } else {
            setCheck(checks | bit)
        }
    }

    return (
        <Modal>
            <ContextBox>
                <Title>안녕하세요, 사용자님!</Title>
                <InfoText>Hailor에 오신 걸 환영해요!</InfoText>
            </ContextBox>
            {data.terms.map(term => (
                <ContextBox key={term.id}>
                    <Title>{term.title}</Title>
                    <Content src={term.contentUrl} />
                </ContextBox>
            ))}
            <ContextBox>
                {data.terms.map(term => (
                    <CheckBoxContainer>
                        <CheckBox id={`${term.id}`} selected={(checks & (1 << term.id)) === 1 << term.id} onClick={() => checkClick(term.id)}>
                            ✔
                        </CheckBox>
                        <CheckLabel htmlFor={`${term.id}`}>[{term.title}] 위 약관에 모두 동의합니다.</CheckLabel>
                    </CheckBoxContainer>
                ))}
            </ContextBox>
            <Button
                onClick={() => {
                    if ((checks & minRule) === minRule) {
                        onClick()
                    }
                }}
            >
                시작하기
            </Button>
        </Modal>
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
