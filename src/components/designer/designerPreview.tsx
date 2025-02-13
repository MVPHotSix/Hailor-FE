import styled from 'styled-components'
import { StarIcon } from '../icon'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #FFFFFF;
    border: 0.05rem solid rgba(217, 217, 217, 0.6);
    border-radius: 0.4rem;
    padding: 0.8rem;
    gap: 0.8rem;
`

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const SubInfoContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`

const StarContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: end;
    width: 100%;
    gap: 0.18rem;
`

const Profile = styled.img`
    border-radius: 0.4rem;
    width: 8rem;
    height: 8rem;
`

const Title = styled.span`
    font-size: 1.4rem;
    color: #000000;
    text-align: start;
`

const Region = styled.span`
    font-size: 0.72rem;
    text-align: start;
    white-space: nowrap;
    color: rgba(41, 41, 41, 0.6);
`

const StartText = styled.span`
    font-size: 0.72rem;
    text-align: start;
    color: #000000;
`

// TODO: add get props
function DesignerPreview() {
    return (
        <Container>
            <Profile src={'https://placehold.co/80x80'} />
            <InfoContainer>
                <Title>OOO 헤어샵</Title>
                <SubInfoContainer>
                    <SubInfoContainer>
                        <Region>부산 북구</Region>
                        <StarContainer>
                            <StarIcon width={'0.96rem'} height={'0.96rem'} fill={'default'} />
                            <StartText>4/5</StartText>
                        </StarContainer>
                    </SubInfoContainer>
                </SubInfoContainer>
            </InfoContainer>
        </Container>
    )
}

export default DesignerPreview
