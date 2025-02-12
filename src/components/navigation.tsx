import styled from 'styled-components'

import calender from '../assets/calender.svg'
import chat from '../assets/chat.svg'
import home from '../assets/home.svg'
import search from '../assets/search.svg'
import profile from '../assets/profile.svg'

function Navigation() {
    return (
        <NavigationLayout>
            <Tie><Img src={home} alt="홈" />홈</Tie>
            <Tie><Img src={search} alt="검색" />검색</Tie>
            <Tie><Img src={calender} alt="예약" />예약</Tie>
            <Tie><Img src={chat} alt="채팅" />채팅</Tie>
            <Tie><Img src={profile} alt="마이" />마이</Tie>
        </NavigationLayout>
    )
}

const NavigationLayout = styled.div`
    display: flex;

    width: 100%;
    align-items: center;
    justify-content: center;
    gap: 49.5px;
    margin-bottom: 34px;
`


const Img = styled.img`
    width: 24px;
    height: 24px;

`
const Tie = styled.div`
    width: 24px;
    height: 49px;
    font-size:12px;


`
export default Navigation
