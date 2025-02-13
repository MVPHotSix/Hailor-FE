import { useState } from 'react'
import styled from 'styled-components'
import { SearchIcon } from '../../components/icon'
import SubTitle from '../../components/subTitle.tsx'
import DesignerPreview from '../../components/designer/designerPreview.tsx'
import useGeolocation from '../../hook/geolocation.ts'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1.6rem;
`

const SearchResult = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 1.6rem;
    gap: 1rem;
`

const SearchBox = styled.form`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    background-color: #FFFFFF;
    border: 0.1rem solid rgba(217, 217, 217, 0.6);
    border-radius: 1.2rem;
    padding: 0.8rem;
    text-align: center;
`

const SearchInput = styled.input`
    font-size: 1.4rem;
    color: inherit;
    background-color: inherit;
    outline: none;
    border: 0;
    padding: 0;
    width: 100%;
`

function Search() {
    const [searchText, setSearchText] = useState<string>('')
    // TODO: use location date for search
    const result = useGeolocation()
    return (
        <div>
            <Container>
                {/* TODO: add logic to search when submit */}
                <SearchBox id="search" name="search">
                    <SearchInput placeholder={'디자이너, 헤어샵을 검색해 보세요.'} value={searchText} onChange={(event) => setSearchText(event.target.value)} />
                    <SearchIcon width={'2.4rem'} height={'2.4rem'} fill={'rgba(41, 41, 41, 0.6)'} />
                </SearchBox>
            </Container>
            {/*TODO: show search result*/}
            <SubTitle title={'근처의 헤어샵'} />
            {/* TODO: remove data */}
            <span>${JSON.stringify(result)}</span>
            <SearchResult>
                <DesignerPreview />
                <DesignerPreview />
                <DesignerPreview />
            </SearchResult>
        </div>
    )
}

export default Search
