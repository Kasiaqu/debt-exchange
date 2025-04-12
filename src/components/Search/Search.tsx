import { Container } from '../Container/Container'
import './Search.less'

export const Search = () => {
    return <Container>
        <div className="search">
            <label htmlFor="search" className="search__label">Podaj NIP lub nazwę dłużnika</label>
            <div className='search__input-container'>
                <input type="search" id="search" className='search__input'/>
                <button className='search__button'>szukaj</button>
            </div>
        </div>
    </Container>
}