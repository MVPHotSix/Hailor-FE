import styled from 'styled-components'

interface Props {
    title: string
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    padding: 1.6rem;
`

const Text = styled.span`
    font-size: 2.4rem;
    font-weight: bold;
    text-align: start;
`

function SubTitle({ title }: Props ) {
    return (
        <Container>
            <Text>{title}</Text>
        </Container>
    )
}

export default SubTitle

