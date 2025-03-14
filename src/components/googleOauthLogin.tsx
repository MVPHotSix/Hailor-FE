import { useMemo, useState } from 'react'
import styled from 'styled-components'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import { useSuspenseQuery } from '@tanstack/react-query'

import { googleClientId, VITE_SERVER_URL } from '../config'
import { getRegisterTerm } from '../api/users.ts'
import { userStore } from '../store/user.ts'
import { CheckIcon } from './icon'
import { useNavigate } from 'react-router-dom'

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

const Button = styled.button`
    background-color: #35376e;
    color: #ffffff;
    border: 0.1rem solid #292929;
    border-radius: 50rem;
    font-size: 1.6rem;
    font-weight: bold;
    padding: 1.2rem 3rem;
    margin: 1.6rem 0;
    cursor: pointer;

    &:disabled {
        background: #ccc;
        border: 0.1rem solid #e6e6e6;
        cursor: not-allowed;
    }
    &:hover:enabled {
        background: rgba(41, 41, 89, 1);
    }
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
`

const CheckLabel = styled.label`
    font-size: 1.4rem;
    text-align: left;
`

const Wrapper = styled.div`
    display: flex;
    width: 90%;
    align-items: center;
    justify-content: center;
`

const Status = styled.span<{ need: boolean }>`
    font-size: 1.4rem;
    text-align: left;
    color: ${props => (props.need ? 'rgba(255, 77, 77, 1)' : 'rgba(41, 41, 41, 0.6)')};
`

function Register({ onClick, credential }: { onClick: () => void; credential: string }) {
    const [checks, setCheck] = useState<number>(0)
    const { setToken } = userStore()
    const navigate = useNavigate()
    const { data } = useSuspenseQuery({
        queryKey: ['registerTerm'],
        queryFn: async () => {
            const data = await getRegisterTerm()
            data.terms.sort((a, b) => Number(b.isRequired) - Number(a.isRequired))
            return data
        },
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
                    <CheckBoxContainer onClick={() => checkClick(term.id)}>
                        <CheckBox id={`${term.id}`} selected={(checks & (1 << term.id)) === 1 << term.id}>
                            <CheckIcon
                                width="1.2rem"
                                height="1.2rem"
                                fill={`${(checks & (1 << term.id)) === 1 << term.id ? '#62A87C' : '#FFFFFF'}`}
                            />
                        </CheckBox>
                        <CheckLabel htmlFor={`${term.id}`}>
                            [{term.title}]에 동의합니다. <Status need={term.isRequired}>{`(${term.isRequired ? '필수' : '선택'})`}</Status>
                        </CheckLabel>
                    </CheckBoxContainer>
                ))}
            </ContextBox>
            <Button
                type="button"
                disabled={(checks & minRule) !== minRule}
                onClick={() => {
                    if ((checks & minRule) === minRule) {
                        const agreedTerms = checks
                            .toString(2)
                            .split('')
                            .reverse()
                            .map((bit, index) => (bit === '1' ? index : -1))
                            .filter(index => index !== -1)
                        console.log(credential, agreedTerms)
                        fetch(`${VITE_SERVER_URL}/api/v1/auth/sign-up`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ token: credential, agreedTerms: agreedTerms }),
                        })
                            .then(response => response.json())
                            .then(() => {
                                fetch(`${VITE_SERVER_URL}/api/v1/auth/login`, {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({ token: credential }),
                                })
                                    .then(response => response.json())
                                    .then(data => {
                                        setToken(data)
                                        onClick()
                                        navigate('/user/mypage')
                                    })
                            })
                    }
                }}
            >
                시작하기
            </Button>
        </Modal>
    )
}

function GoogleOauthLogin() {
    const [showModal, setShowModal] = useState<boolean>(false)
    const [credential, setCredential] = useState<string>('')
    const { setToken } = userStore()

    return (
        <Wrapper>
            <GoogleOAuthProvider clientId={googleClientId}>
                <GoogleLogin
                    theme={'outline'}
                    onSuccess={credentialResponse => {
                        fetch(`${VITE_SERVER_URL}/api/v1/auth/login`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ token: credentialResponse.credential }),
                        })
                            .then(response => response.json())
                            .then(data => {
                                if (data.accessToken) {
                                    setToken(data)
                                } else {
                                    setShowModal(true)
                                    setCredential(credentialResponse.credential as string)
                                }
                            })
                    }}
                    onError={() => {
                        console.log('Login Failed')
                    }}
                />
                {showModal && <Register onClick={() => setShowModal(false)} credential={credential} />}
            </GoogleOAuthProvider>
        </Wrapper>
    )
}

export default GoogleOauthLogin
