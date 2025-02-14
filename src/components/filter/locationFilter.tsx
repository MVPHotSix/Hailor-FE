import { useState, useEffect } from 'react'
import styled from 'styled-components'
import regionData from '../../data/regionData'

interface LocationFilterProps {
    initialSelected: string[]
    onConfirm: (selected: string[]) => void
}

const broadRegions = Object.keys(regionData)

const LocationFilter: React.FC<LocationFilterProps> = ({ initialSelected, onConfirm }) => {
    const [selectedBroad, setSelectedBroad] = useState<string>(broadRegions[0])
    const [selectedSubs, setSelectedSubs] = useState<string[]>(initialSelected)

    useEffect(() => {
        setSelectedSubs(initialSelected)
    }, [initialSelected])

    const handleBroadClick = (region: string) => {
        setSelectedBroad(region)
    }

    const handleSubClick = (sub: string) => {
        if (selectedSubs.includes(sub)) {
            setSelectedSubs(selectedSubs.filter(item => item !== sub))
        } else {
            setSelectedSubs([...selectedSubs, sub])
        }
    }

    return (
        <Container>
            <ColumnContainer>
                <LeftColumn>
                    {broadRegions.map(region => (
                        <BroadRegionItem key={region} selected={region === selectedBroad} onClick={() => handleBroadClick(region)}>
                            {region}
                        </BroadRegionItem>
                    ))}
                </LeftColumn>
                <RightColumn>
                    {regionData[selectedBroad].map(sub => (
                        <SubRegionItem key={sub} selected={selectedSubs.includes(sub)} onClick={() => handleSubClick(sub)}>
                            {sub}
                        </SubRegionItem>
                    ))}
                </RightColumn>
            </ColumnContainer>
            {selectedSubs.length > 0 && <ConfirmButton onClick={() => onConfirm(selectedSubs)}>선택하기</ConfirmButton>}
        </Container>
    )
}

export default LocationFilter

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`

const ColumnContainer = styled.div`
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 2fr;
    padding-bottom: 4rem; /* 버튼 높이만큼 여백 추가 */
    font-size: 1.7rem;
    text-decoration: none;
    user-select: none;
`

const LeftColumn = styled.div`
    border-right: 0.1rem solid #ccc;
    padding-right: 1rem;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    height: 30vh;
`

const RightColumn = styled.div`
    padding-left: 1rem;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    height: 30vh;
`

const BroadRegionItem = styled.div<{ selected: boolean }>`
    padding: 1.5rem;
    cursor: pointer;
    border-bottom: 0.1rem solid #eee;
    background-color: ${({ selected }) => (selected ? '#D9D9D9' : 'transparent')};
    color: #292929;
    margin-bottom: 0.5rem;
`

const SubRegionItem = styled.div<{ selected: boolean }>`
    padding: 0.9rem;
    cursor: pointer;
    border-bottom: 0.1rem solid #eee;
    background-color: ${({ selected }) => (selected ? '#D9D9D9' : 'transparent')};
    color: #292929;
`

const ConfirmButton = styled.button`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    padding: 0.8rem 1.2rem;
    background-color: #35376e;
    color: #fafcfe;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    z-index: 2;
`
