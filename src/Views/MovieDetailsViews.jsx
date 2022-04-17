
import { useState, useEffect } from 'react'
import { NavLink, useRouteMatch, Route } from 'react-router-dom'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { apiId } from '../AppBar/API/API'
import ReviewsView from './ReviewsView'
import image from '../Image/image.png'



export default function MovieDetailsViel() {
    const[movie, setMovie]=useState(null)
    const URL = useRouteMatch()
    

    const movId = useParams()
   

    useEffect(()=>{
      console.log(1);
        apiId(movId.movieId)
        .then(({data})=>{setMovie(data)})
    },[])

      return ( 
        movie && (<><section className='detais-section'>
          <img width="300" height="433" src={
            movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` 
            : image } alt={movie.title}/> 
          
          <div className='film-more-info'>  
            <div className="container-film">
              <h2>{movie.title}</h2>
              <p>Average: <span className='average-span'>{movie.vote_average} </span></p>
              <p>{movie.overview}</p>
            </div>
          
            <Route exact path={`${URL.url}`}>
              <NavLink exact to={`${URL.url}/review`}>
                <button>SHOW REVIEW</button>
              </NavLink>
            </Route>
          </div>

        
    </section>
            
            <Route path={`${URL.url}/review`}>
              <ReviewsView id={movId.movieId}/>
            </Route>
  </>)
  )
}
