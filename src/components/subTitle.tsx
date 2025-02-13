import styled from 'styled-components'

interface Props {
    title: string
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1.6rem;
`

const Text = styled.span`
    
`

function SubTitle({ title }: Props ) {
    return (
        <Container>
            <Text>{title}</Text>
        </Container>
    )
}

export default SubTitle

