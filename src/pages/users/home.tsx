import styled from 'styled-components';

const Body = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
    height: auto;
`;

const MainLayout = styled.div`
    display: flex;
    flex-direction: column;
    width: 375px;
    height: 100vh;
    background-color: white;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const ContentLayout = styled.div`
    flex: 1;
    overflow-y: scroll;
    padding: 20px;
`;

const SectionTitle = styled.div`
    font-size: 20px;
    font-weight: bold;
    color: #2D1B1E;
    margin-bottom: 15px;
`;

const UpcomingReservation = styled.div`
    display: flex;
    overflow-x: auto;
    gap: 10px;
    padding-bottom: 10px;
    white-space: nowrap;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const ReservationCard = styled.div`
    flex: 0 0 auto;
    background-color: #5D3562;
    color: white;
    padding: 16px;
    border-radius: 12px;
    text-align: center;
    min-width: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ReservationTitle = styled.p`
    font-size: 18px;
    font-weight: bold;
`;

const ReservationDetails = styled.p`
    font-size: 14px;
    margin-top: 5px;
`;

const CardContainer = styled.div`
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    white-space: nowrap;
    gap: 10px;
    padding-bottom: 10px;
    flex-wrap: nowrap;
    min-width: 100%;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);

    &::-webkit-scrollbar {
        display: none;
    }
`;

const Card = styled.div`
    flex: 0 0 auto;
    width: 120px;
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 10px;
    margin-left: 10px;
    text-align: center;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    font-size: 14px;
`;

const CardImage = styled.img`
    width: 100%;
    height: 80px;
    border-radius: 8px;
    object-fit: cover;
`;

const CardText = styled.p`
    font-size: 14px;
    margin-top: 5px;
`;
function Home() {
    const reservations = [
        { name: "박승철헤어스튜디오", date: "2024.06.11", type: "대면", time: "16:00" },
        { name: "박승철헤어스튜디오", date: "2024.06.11", type: "대면", time: "16:00" }
    ];

    const designers = [
        { id: 1, name: "리그오브레전드", location: "부산 북구", rating: "4.9/5", image: "https://example.com/image1.jpg" },
        { id: 2, name: "리그오브레전드", location: "부산 북구", rating: "4.9/5", image: "https://example.com/image2.jpg" },
    ];

    const hairShops = [
        { id: 1, name: "리그오브레전드", location: "부산 북구", rating: "4.9/5", image: "https://example.com/image3.jpg" },
        { id: 2, name: "리그오브레전드", location: "부산 북구", rating: "4.9/5", image: "https://example.com/image4.jpg" }
    ];

    return (
        <Body>
            <MainLayout>
                <ContentLayout>
                    <SectionTitle>다가오는 예약</SectionTitle>
                    <UpcomingReservation>
                        {reservations.map((reservation, index) => (
                            <ReservationCard key={index}>
                                <ReservationTitle>{reservation.name}</ReservationTitle>
                                <ReservationDetails>
                                    {reservation.date} | {reservation.type} | {reservation.time}
                                </ReservationDetails>
                            </ReservationCard>
                        ))}
                    </UpcomingReservation>

                    <SectionTitle>인기있는 디자이너</SectionTitle>
                    <CardContainer>
                        {designers.map((designer) => (
                            <Card key={designer.id}>
                                <CardImage src={designer.image} alt={designer.name} />
                                <CardText>{designer.name}</CardText>
                                <CardText>{designer.location}</CardText>
                                <CardText>★{designer.rating}</CardText>
                            </Card>
                        ))}
                    </CardContainer>

                    <SectionTitle>인기있는 헤어샵</SectionTitle>
                    <CardContainer>
                        {hairShops.map((shop) => (
                            <Card key={shop.id}>
                                <CardImage src={shop.image} alt={shop.name} />
                                <CardText>{shop.name}</CardText>
                                <CardText>{shop.location}</CardText>
                                <CardText>★{shop.rating}</CardText>
                            </Card>
                        ))}
                    </CardContainer>
                </ContentLayout>

            </MainLayout>
        </Body>
    );
}

export default Home;