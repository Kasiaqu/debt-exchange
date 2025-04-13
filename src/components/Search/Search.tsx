import { Dispatch, SetStateAction, useState } from 'react'
import { useDebts } from '../../hooks/useDebts'
import { Container } from '../Container/Container'
import { Debt } from '../../types/Debt'
import './Search.less'

type Props = {
    setDebts: Dispatch<SetStateAction<Debt[]>>
    setLoading: Dispatch<SetStateAction<boolean>>
    loading: boolean;
}

export const Search: React.FC<Props> = ({ setDebts, setLoading, loading }) => {
    const [phrase, setPhrase] = useState("")
    const [error, setError] = useState("")
    const { getFilteredDebts } = useDebts();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPhrase(value);
        if(error && value.length > 2) {
            setError("")
        }
    }

    const search = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if(phrase.length < 3) {      
            setError("Minimalna długość to 3")
        } else {
            setLoading(true)
            const data = await getFilteredDebts(phrase);
            setDebts(data)
            setLoading(false)
        }
        
    }

    return <Container>
        <form className="search">
            <label htmlFor="search" className="search__label">Podaj NIP lub nazwę dłużnika</label>
            <div className='search__input-container'>
                <input type="search" id="search" className='search__input' value={phrase} onChange={onChange} disabled={loading} />
                <button type="submit" className='search__button' onClick={search} disabled={loading}>szukaj</button>
            </div>
            <p className='search__error'>{error}</p>
        </form>
    </Container>
}