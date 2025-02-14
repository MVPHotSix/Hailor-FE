import { useState, useEffect } from 'react';
import styled from 'styled-components';

interface LocationFilterProps {
  initialSelected: string[];
  onConfirm: (selected: string[]) => void;
}

const regionData: { [key: string]: string[] } = {
  서울: [
    '종로구', '중구', '용산구', '성동구', '광진구', '동대문구',
    '중랑구', '성북구', '강북구', '도봉구', '노원구', '은평구',
    '서대문구', '마포구', '양천구', '강서구', '구로구', '금천구',
    '영등포구', '동작구', '관악구', '서초구', '강남구', '송파구', '강동구',
  ],
  경기: [
    '수원시', '고양시', '용인시', '성남시', '부천시', '안양시',
    '안산시', '화성시', '평택시', '시흥시', '군포시', '의왕시',
  ],
  부산: [
    '중구', '서구', '동구', '영도구', '부산진구', '동래구',
    '남구', '북구', '해운대구', '사하구', '금정구', '강서구',
    '연제구', '수영구', '사상구',
  ],
};

const broadRegions = Object.keys(regionData);

const LocationFilter: React.FC<LocationFilterProps> = ({ initialSelected, onConfirm }) => {
  const [selectedBroad, setSelectedBroad] = useState<string>(broadRegions[0]);
  const [selectedSubs, setSelectedSubs] = useState<string[]>(initialSelected);

  useEffect(() => {
    setSelectedSubs(initialSelected);
  }, [initialSelected]);

  const handleBroadClick = (region: string) => {
    setSelectedBroad(region);
  };

  const handleSubClick = (sub: string) => {
    if (selectedSubs.includes(sub)) {
      setSelectedSubs(selectedSubs.filter(item => item !== sub));
    } else {
      setSelectedSubs([...selectedSubs, sub]);
    }
  };

  return (
    <Container>
      <ColumnContainer>
        <LeftColumn>
          {broadRegions.map(region => (
            <BroadRegionItem
              key={region}
              selected={region === selectedBroad}
              onClick={() => handleBroadClick(region)}
            >
              {region}
            </BroadRegionItem>
          ))}
        </LeftColumn>
        <RightColumn>
          {regionData[selectedBroad].map(sub => (
            <SubRegionItem
              key={sub}
              selected={selectedSubs.includes(sub)}
              onClick={() => handleSubClick(sub)}
            >
              {sub}
            </SubRegionItem>
          ))}
        </RightColumn>
      </ColumnContainer>
      <ConfirmButton onClick={() => onConfirm(selectedSubs)}>선택하기</ConfirmButton>
    </Container>
  );
};

export default LocationFilter;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const ColumnContainer = styled.div`
  height: 100%;
  display: flex;
  gap: 1rem;
  overflow-y: auto;
  padding-bottom: 4rem; /* 버튼 높이만큼 여백 추가 */
`;

const LeftColumn = styled.div`
  flex: 1;
  border-right: 0.1rem solid #ccc;
  padding-right: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const RightColumn = styled.div`
  flex: 2;
  padding-left: 1rem;
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const BroadRegionItem = styled.div<{ selected: boolean }>`
  padding: 0.8rem;
  cursor: pointer;
  background-color: ${({ selected }) => (selected ? '#35376e' : 'transparent')};
  color: ${({ selected }) => (selected ? '#fff' : '#292929')};
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
  &:hover {
    background-color: ${({ selected }) => (selected ? '#35376e' : '#eee')};
  }
`;

const SubRegionItem = styled.div<{ selected: boolean }>`
  padding: 0.6rem;
  cursor: pointer;
  border: 0.1rem solid #eee;
  border-radius: 0.5rem;
  background-color: ${({ selected }) => (selected ? '#35376e' : 'transparent')};
  color: ${({ selected }) => (selected ? '#fff' : '#292929')};
  &:hover {
    background-color: #f9f9f9;
  }
`;

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
`;
