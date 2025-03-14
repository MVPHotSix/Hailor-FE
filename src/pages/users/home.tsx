import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { userStore } from '../../store/user.ts'
import { IReservationFull } from '../../types/reservation.ts'
import { VITE_SERVER_URL } from '../../config'
import { getHotDesigners } from '../../api/designer.ts'
import { Designer } from '../../types/designer.ts'
import { designerStore } from '../../store/designer.ts'
import NeedLogin from '../../components/needLogin.tsx'

function Upcoming() {
    const [reservations, setReservations] = useState<IReservationFull[]>([])
    const [isLoading, setLoading] = useState<boolean>(true)
    const { getToken } = userStore()
    const navigate = useNavigate()
    const token = getToken()

    const getCountdownString = (date: string): string => {
        const now = new Date()
        const diffTime = new Date(date).getTime() - now.getTime()
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        if (diffDays > 0) return `D-${diffDays}`
        if (diffDays === 0) return 'D-Day'
        return ''
    }

    useEffect(() => {
        setLoading(true)
        fetch(`${VITE_SERVER_URL}/api/v1/reservation?size=20`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                const res = data as {
                    reservations: IReservationFull[]
                }
                console.log(res)
                const today = new Date()
                const date = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getDate()}`
                const time = today.getHours() * 60 + today.getMinutes()

                const result = res.reservations
                    .filter(
                        reservation =>
                            (reservation.status === 'RESERVED' || reservation.status === 'CONFIRMED') &&
                            (date !== reservation.date ||
                                (date === reservation.date && time <= (reservation.slot / 2 + 10) * 60 + (reservation.slot % 2 === 0 ? 0 : 30))),
                    )
                    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime() || a.slot - b.slot)
                console.log(result)
                setReservations(result)
                setTimeout(() => setLoading(false), 500)
            })
    }, [token])

    if (isLoading) {
        return (
            <UpcomingReservationSection>
                <SectionTitle>다가오는 예약</SectionTitle>
                <ReservationCardSkeleton />
            </UpcomingReservationSection>
        )
    }
    if (reservations.length === 0) {
        return (
            <UpcomingReservationSection>
                <SectionTitle>다가오는 예약</SectionTitle>
                <InfoText>예약하신 일정이 없습니다</InfoText>
            </UpcomingReservationSection>
        )
    }

    return (
        <UpcomingReservationSection>
            <SectionTitle>다가오는 예약</SectionTitle>
            <ReservationInfo onClick={() => navigate('reservation')}>
                <ReservationCard>
                    <TitleLine>{reservations[0].designer.name}</TitleLine>
                    <InfoBox>
                        {reservations[0].date.replace(/- /g, '.')} <InfoLine>|</InfoLine>
                        {`${reservations[0].meetingType === 'ONLINE' ? '비대면' : '대면'}`} <InfoLine>|</InfoLine>
                        {`${10 + Math.floor(reservations[0].slot / 2)}:${String(reservations[0].slot % 2 === 0 ? 0 : 30).padStart(2, '0')}`}
                    </InfoBox>
                    <CountdownBadge>{getCountdownString(reservations[0].date)}</CountdownBadge>
                </ReservationCard>
            </ReservationInfo>
        </UpcomingReservationSection>
    )
}

function HotDesigner() {
    const { getToken } = userStore()
    const token = getToken()
    const navigate = useNavigate()
    const { setDesigner, setDate } = designerStore()
    const { data, isLoading } = useQuery({
        queryKey: ['hotDesigner'],
        queryFn: () => getHotDesigners(token),
    })

    const onClick = (name: string) => {
        fetch(`${VITE_SERVER_URL}/api/v1/designer?size=1&name=${name}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                const result = data as { designers: Designer[] }
                setDesigner(result.designers[0])
                setDate(new Date())
            })
        navigate('direct-reservation/payment')
    }

    if (isLoading) {
        return (
            <HorizontalScrollContainer>
                <Card>
                    <CardImageSkeleton />
                </Card>
                <Card>
                    <CardImageSkeleton />
                </Card>
                <Card>
                    <CardImageSkeleton />
                </Card>
                <Card>
                    <CardImageSkeleton />
                </Card>
            </HorizontalScrollContainer>
        )
    }

    return (
        <HorizontalScrollContainer>
            {data &&
                data.designers.map(
                    (designer): React.ReactNode => (
                        <Card key={designer.id} onClick={() => onClick(designer.name)}>
                            <CardImage src={designer.profileImageURL} alt={designer.name} />
                            <CardInfo>
                                <CardName>{designer.name}</CardName>
                            </CardInfo>
                            <CardInfo>
                                <CardDetail>{designer.region}</CardDetail>
                                <CardDetail>{designer.specialization}</CardDetail>
                            </CardInfo>
                        </Card>
                    ),
                )}
        </HorizontalScrollContainer>
    )
}

function RecentDesigner() {
    const { getToken } = userStore()
    const { setDesigner, setDate } = designerStore()
    const navigate = useNavigate()
    const [designers, setDesigners] = useState<Designer[]>([])
    const [isLoading, setLoading] = useState(true)
    const token = getToken()
    useEffect(() => {
        setLoading(true)
        fetch(`${VITE_SERVER_URL}/api/v1/reservation/recently-finished?size=50`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                const result = data as { reservations: IReservationFull[] }
                console.log(result)
                const acc: Designer[] = []
                result.reservations.map(r => {
                    if (acc.length === 0 || !acc.some(d => d.id === r.designer.id)) {
                        acc.push(r.designer)
                    }
                })
                setDesigners(acc)
                setTimeout(() => setLoading(false), 500)
            })
    }, [token, setLoading])

    const onClick = (name: string) => {
        fetch(`${VITE_SERVER_URL}/api/v1/designer?size=1&name=${name}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                const result = data as { designers: Designer[] }
                setDesigner(result.designers[0])
                setDate(new Date())
            })
        navigate('direct-reservation/payment')
    }

    if (isLoading) {
        return (
            <HorizontalScrollContainer>
                <Card>
                    <CardImageSkeleton />
                </Card>
                <Card>
                    <CardImageSkeleton />
                </Card>
                <Card>
                    <CardImageSkeleton />
                </Card>
                <Card>
                    <CardImageSkeleton />
                </Card>
            </HorizontalScrollContainer>
        )
    }

    if (designers.length === 0) {
        return <InfoText>과거에 예약한 디자이너가 없습니다</InfoText>
    }

    return (
        <HorizontalScrollContainer>
            {designers.map(
                (designer): React.ReactNode => (
                    <Card key={designer.id} onClick={() => onClick(designer.name)}>
                        <CardImage src={designer.profileImageURL} alt={designer.name} />
                        <CardInfo>
                            <CardName>{designer.name}</CardName>
                        </CardInfo>
                        <CardInfo>
                            <CardDetail>{designer.region}</CardDetail>
                            <CardDetail>{designer.specialization}</CardDetail>
                        </CardInfo>
                    </Card>
                ),
            )}
        </HorizontalScrollContainer>
    )
}

function Home() {
    const { getUser } = userStore()
    const user = getUser()

    if (!user.name) {
        return <NeedLogin />
    }

    return (
        <HomeContainer>
            {/* 다가오는 예약 섹션 */}
            <Upcoming />
            <FamousContainer>
                {/* 인기있는 디자이너 섹션 */}
                <SectionTitle>인기있는 디자이너</SectionTitle>
                <HotDesigner />

                {/* 과거에 컨설팅 예약을 했던 디자이너 리스트 */}
                <SectionTitle>최근 디자이너</SectionTitle>
                <RecentDesigner />
            </FamousContainer>
        </HomeContainer>
    )
}

export default Home

const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

const SectionTitle = styled.div`
    font-size: 2.4rem;
    font-weight: bold;
    color: #292929;
    width: 100%;
    display: flex;
`

const UpcomingReservationSection = styled.div`
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    gap: 2rem;
`

const ReservationInfo = styled.div`
    display: flex;
    justify-content: center;
`

const ReservationCard = styled.div`
    position: relative;
    background-color: #35376e;
    color: white;
    border-radius: 1rem;
    padding: 3.2rem 2.4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    min-width: 24rem;
    min-height: 7rem;
`

const ReservationCardSkeleton = styled.div`
    position: relative;
    background-color: #35376e;
    color: white;
    border-radius: 1rem;
    padding: 3.2rem 2.8rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    min-width: 24rem;
    height: 7rem;
    animation: pulse 1.5s infinite ease-in-out;

    @keyframes pulse {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 0.9;
        }
        100% {
            opacity: 1;
        }
    }
`

const TitleLine = styled.div`
    font-size: 2.4rem;
    font-weight: bold;
`

const InfoBox = styled.div`
    font-size: 1.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 3rem;
`

const InfoLine = styled.div`
    font-size: 1.4rem;
    padding: 0 1rem;
`

const CountdownBadge = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    background-color: transparent;
    color: #fff;
    font-size: 1.4rem;
    font-weight: bold;
    padding: 1rem 2rem;
    border-radius: 1rem;
`

const FamousContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    margin-top: 3rem;
    padding: 2rem;
    gap: 2rem;
`

const HorizontalScrollContainer = styled.div`
    display: flex;
    gap: 1rem;
    overflow-x: scroll;
    padding: 0 1rem;
    width: 100%;
    margin-bottom: 1rem;

    &::-webkit-scrollbar {
        display: none;
    }
`

const Card = styled.div`
    flex: 0 0 auto;
    width: 15rem;
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 1.5rem 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`

const CardImage = styled.img`
    width: 14rem;
    height: 14rem;
    border-radius: 8px;
    object-fit: cover;
`

const CardImageSkeleton = styled.div`
    width: 14rem;
    height: 14rem;
    border-radius: 8px;
    background-color: #e6e6e6;
    margin-bottom: 3rem;
    animation: pulse 1.5s infinite ease-in-out;

    @keyframes pulse {
        0% {
            opacity: 1;
        }
        25% {
            opacity: 0.8;
        }
        50% {
            opacity: 0.6;
        }
        75% {
            opacity: 0.8;
        }
        100% {
            opacity: 1;
        }
    }
`

const CardName = styled.div`
    font-size: 1.6rem;
    font-weight: bold;
    margin-top: 0.5rem;
`

const CardInfo = styled.div`
    display: grid;
    width: 90%;
    grid-template-columns: auto 1fr;
    align-items: baseline;
    justify-items: end;
`

const CardDetail = styled.div`
    font-size: 1.2rem;
    color: rgba(0, 0, 0, 0.6);
`

const InfoText = styled.span`
    font-size: 1.6rem;
    color: rgba(53, 55, 110, 1);
    border-radius: 0.8rem;
    padding: 3.2rem 2.8rem;
`
