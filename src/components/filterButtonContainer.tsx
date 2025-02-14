import React from 'react'
import styled from 'styled-components'
import Button from '../components/button'
import { ButtonTypes } from '../types/button'
import ResetButton from '../components/resetButton'

export type FilterType = '대면여부' | '위치' | '날짜' | '가격' | null

interface FilterButtonContainerProps {
    faceFilterOption: string | null
    locationFilterSelection: string[]
    dateFilterSelected: Date | null
    priceFilterSelected: { min: number; max: number } | null
    onReset: () => void
    onOpenFilter: (filter: FilterType) => void
}

const FilterButtonContainer: React.FC<FilterButtonContainerProps> = ({
    faceFilterOption,
    locationFilterSelection,
    dateFilterSelected,
    priceFilterSelected,
    onReset,
    onOpenFilter,
}) => {
    // 위치 버튼 텍스트 결정
    const getLocationButtonText = () => {
        if (locationFilterSelection.length === 0) return '위치'
        if (locationFilterSelection.length === 1) return locationFilterSelection[0]
        return `${locationFilterSelection[0]} 외 ${locationFilterSelection.length - 1}곳`
    }

    // 날짜 버튼 텍스트: 선택된 날짜가 있으면 "12월 24일", 없으면 "날짜"
    const getDateButtonText = () => {
        if (!dateFilterSelected) return '날짜'
        const d = new Date(dateFilterSelected)
        return `${d.getMonth() + 1}월 ${d.getDate()}일`
    }

    // 가격 버튼 텍스트: 선택된 가격 범위가 있으면 "최소원 ~ 최대원", 없으면 "가격"
    const getPriceButtonText = (): string => {
        return priceFilterSelected ? `${priceFilterSelected.min.toLocaleString()}원 ~ ${priceFilterSelected.max.toLocaleString()}원` : '가격'
    }

    return (
        <Container>
            <ResetButton onClick={onReset} />
            <Button
                text={faceFilterOption || '대면여부'}
                type={faceFilterOption ? ButtonTypes.selected : ButtonTypes.default}
                onClick={() => onOpenFilter('대면여부')}
            />
            <Button
                text={getLocationButtonText()}
                type={locationFilterSelection.length > 0 ? ButtonTypes.selected : ButtonTypes.default}
                onClick={() => onOpenFilter('위치')}
            />
            <Button
                text={getDateButtonText()}
                type={dateFilterSelected ? ButtonTypes.selected : ButtonTypes.default}
                onClick={() => onOpenFilter('날짜')}
            />
            <Button
                text={getPriceButtonText()}
                type={priceFilterSelected ? ButtonTypes.selected : ButtonTypes.default}
                onClick={() => onOpenFilter('가격')}
            />
        </Container>
    )
}

export default FilterButtonContainer

const Container = styled.div`
    display: flex;
    justify-content: flex-start;
    margin: 2rem 0;
    gap: 1rem;
    overflow-x: auto;
    white-space: nowrap;
`
