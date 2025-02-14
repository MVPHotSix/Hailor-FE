import { Outlet, useNavigate } from 'react-router-dom'

function Search() {
    const navigator = useNavigate()
    return (
        <div>
            <div>검색 페이지 내용</div>
            {/*TODO: remove navigate to payment*/}
            <div onClick={() => navigator('payment')}>go</div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default Search
