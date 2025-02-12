import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import User from './pages/user.tsx'
import Admin from './pages/admin.tsx'
import Home from './components/home.tsx'
import Search from './components/search.tsx'
import Reservation from './components/reservation.tsx'
import Chat from './components/chat.tsx'
import MyPage from './components/mypage.tsx'
import styled from 'styled-components'

const Layout = styled.div`
    width: 100vw;
    height: 100vh;
`

function App() {
    return (
        <Layout>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<User />}>
                        <Route path="" element={<Home />} />
                        <Route path="search" element={<Search />} />
                        <Route path="reservation" element={<Reservation />} />
                        <Route path="chat" element={<Chat />} />
                        <Route path="mypage" element={<MyPage />} />
                    </Route>
                    <Route path="/admin" element={<Admin />} />
                </Routes>
            </BrowserRouter>
        </Layout>
    )
}

export default App
