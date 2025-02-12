import styled from 'styled-components'

const HeaderLayout = styled.header`
    width: 100%;
`

const HeaderContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px 0; /* 텍스트 여백 */
`

const GradientText = styled.span`
    font-weight: 700; /* 두꺼운 글씨 */
    font-size: 24px;
    background: linear-gradient(45deg, #292959, #5e58bf);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
`

const HeaderDivider = styled.div`
    width: 100%;
    height: 1px;
    background: linear-gradient(45deg, #292959, #5e58bf);
`

function Header() {
    return (
        <HeaderLayout>
            <HeaderContent>
                <GradientText>Hailor</GradientText>
            </HeaderContent>
            <HeaderDivider />
        </HeaderLayout>
    )
}

export default Header
