import styled from 'styled-components'
import GoogleOauthLogin from '../../components/googleOauthLogin.tsx'
import { userStore } from '../../store/user.ts'

const MyPageLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`

const InfoContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    background-color: #ffffff;
    border: 0.1rem solid rgba(217, 217, 217, 0.6);
    border-radius: 1.2rem;
    padding: 1.2rem 1.6rem;
    gap: 0.8rem;
    width: 85%;
`

const Profile = styled.img`
    border-radius: 50rem;
    width: 3.2rem;
    height: 3.2rem;
`
const Text = styled.span`
    font-size: 1.6rem;
    font-weight: bold;
    color: #292929;
`

function MyPage() {
    const { getUser } = userStore()
    const user = getUser()

    return (
        <MyPageLayout>
            {!user.name && <GoogleOauthLogin />}
            {/*TODO: get user info*/}
            {user.name && (
                <InfoContainer>
                    <Profile src={'/윈터 사진.webp'} />
                    <Text>{user.name}</Text>
                </InfoContainer>
            )}
        </MyPageLayout>
    )
}

export default MyPage
