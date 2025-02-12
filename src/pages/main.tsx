import Header from '../components/header.tsx'
import Navigation from '../components/navigation.tsx'
import styled from 'styled-components'

const Body = styled.div`
    display: flex;
    justify-content: center;  
    align-items: center;      
    width: 100vw;
    height: 100vh;

`

const MainLayout = styled.div`
    display: flex;
    flex-direction: column;
    width: 375px;
    height: 100vh;
    background-color: white;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`

const ContentLayout = styled.div`
    flex: 1; 
    overflow-y: scroll;
`

function Main() {
    return (
        <Body>
            <MainLayout>
                <Header />
                <ContentLayout>content</ContentLayout>
                <Navigation />
            </MainLayout>
        </Body>
    )
}

export default Main
