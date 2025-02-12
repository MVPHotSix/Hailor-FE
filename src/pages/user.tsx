import { Outlet } from 'react-router-dom'
import Header from '../components/header'
import Navigation from '../components/navigation'
import styled from 'styled-components'

const MainLayout = styled.div`
    display: grid;
    width: 100vw;
    height: 100vh;
    /* 헤더, 컨텐츠, 네비게이션 영역: 상단, 중간, 하단 */
    grid-template-rows: auto 1fr auto;
`

const ContentLayout = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    padding: 16px;
`

function User() {
    return (
        <MainLayout>
            <Header />
            <ContentLayout>
                {/* 각 페이지 컴포넌트가 이 Outlet에 렌더링 됨 */}
                <Outlet />
            </ContentLayout>
            <Navigation />
        </MainLayout>
    )
}

export default User
