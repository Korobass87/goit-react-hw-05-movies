import React from 'react'
import { apiFavMov } from 'AppBar/API/API'
import { useEffect, useState } from 'react'



import ListFilm from 'components/Listfilm/ListFilm'



export default function HomeVievs() {
    
    

    const [movies, setMovies] = useState(null)
    
    useEffect(()=>{
        apiFavMov()
        .then(({data})=>setMovies(data.results))
    },[])

    useEffect(()=>{
        if (movies){
            console.log(movies);
        }
    },[movies])

  return (
    <>
    
          <h2 className='home-header'>HITS TODAY</h2>
          {movies && <ListFilm movies={movies} />}
            {/* <ul className='film-list'>

                { movies && movies.map((mov)=>(
                    <li className='film-item' key={mov.id}>
                        <Link className='link-item' to={{
                                pathname: `/movies/${mov.id}`,
                                state: {from: location}
                            }}>
                        <img width="250" src={`https://image.tmdb.org/t/p/w200/${mov.poster_path}`} alt={mov.title} />
                        <h3 className='film-item-header'>{mov.title}</h3>
                        </Link>
                    </li>
                ))
                
                
            }
            </ul> */}
    </>
  )
}
