import { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import {Link} from 'react-router-dom'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import {apiSearchMov} from "../AppBar/API/API"
import image from '../Image/image.png'


export default function SearchMoviesView() {

    const [inputValue,setInputValue] = useState("")
    const [query, setQuery] = useState("")
    const [list, setList] = useState(null)
    const [page,setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(1)
    const prevQuery = useRef()
    const prevPage = useRef()

    const history = useHistory()
    const location = useLocation()  
    const sortQuery = new URLSearchParams(location.search).get('query')
    const sortPage = new URLSearchParams(location.search).get('page')
    

    useEffect(() => {
         if (sortQuery) {
             setQuery(sortQuery) 
            
        }
     }, [])

    useEffect(() => {
        if (query !== "" && page !== prevPage.current) {        
            apiSearchMov(query, page)
                .then(data => {                    
                    setList([...list, ...data.data.results])
                    setMaxPage(data.data.total_pages)
                    history.push({ ...location, search: `query=${query}&page=${page}` })
                    prevQuery.current = query
                }) 
        }            
    }, [page])

    useEffect(() => {
        if (query !== "" && prevQuery.current !== query) {
            
            if (sortPage) {prevPage.current = Number(sortPage)}

            apiSearchMov(query, (sortPage ? Number(sortPage) : 1))
                .then(data => {
                    
                    setList(data.data.results)
                    setPage(sortPage ? Number(sortPage) : 1)
                    
                    setMaxPage(data.data.total_pages)
                    
                    prevQuery.current = query
                })
            .then(history.push({ ...location, search: `query=${query}&page=${sortPage ? Number(sortPage) : page}` }))
        }
    }, [query])

    function onQuery (e) {
        setInputValue(e.target.value)

    }

    function onSubmit (e) {
        e.preventDefault()
        setQuery(inputValue)
        setInputValue("")
    }

    function onLoadMore (e) {
        setPage(page + 1)
    }
    

  return (
    <>
        <form action="" onSubmit={onSubmit}>
            <input value={inputValue} onChange={onQuery}>        
            </input>
            <button type='submit' >Search</button>
        </form>

          {list && <>
                <ul className='film-list'>
                    {list.map(item =>
                        <li className='film-item' key={item.id}>
                            <Link className='link-item' to={`/movies/${item.id}`} >
                                <img width="250" height="340" src={
                                    item.poster_path
                                    ? `https://image.tmdb.org/t/p/w500/${item.poster_path}` 
                                    : image } alt={item.title} />
                                <h3 className='film-item-header'>{item.title}</h3>
                            </Link>
                        </li>)}
                </ul>
                <div className='LoadMore'>
                    {(page<maxPage) && <button className='loadMore-btn' onClick={onLoadMore}>Load More</button>}
                </div>                    
            </>        
        }
    </>
  )
}
