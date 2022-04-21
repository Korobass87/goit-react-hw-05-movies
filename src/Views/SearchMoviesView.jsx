import ListFilm from 'components/Listfilm/ListFilm'
import { useState, useEffect, useRef} from 'react'
import { useHistory } from 'react-router-dom'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import {apiSearchMov} from "../AppBar/API/API"



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
             setPage(Number(sortPage))
        }

       
     // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [])

    useEffect(() => {
        if (query !== "" && prevQuery.current !== query) {
            
            console.log(prevQuery.current);
            
           apiSearchMov(query, sortPage && !prevQuery.current ? sortPage : 1)
            .then(data => {
                setList(data.data.results)
                if(!!prevQuery.current) {setPage(1)}
                 setMaxPage(data.data.total_pages)
                    history.push({ ...location, search: `query=${query}&page=${sortPage && !prevQuery.current ? sortPage : 1}` })
                    prevQuery.current = query
                    prevPage.current = location.search
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query])


    useEffect(() => {
        if (prevQuery.current === query) {
            console.log(page)
            apiSearchMov(query, page)
                .then(data => {
                    setList([...list, ...data.data.results])
                    history.push({ ...location, search: `query=${query}&page=${page}` })
                    
                })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]) 
    

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
              <ListFilm movies={list}/>               
                <div className='LoadMore'>
                    {(page<maxPage) && <button className='loadMore-btn' onClick={onLoadMore}>Load More</button>}
                </div>                    
            </>        
        }
    </>
  )
}
