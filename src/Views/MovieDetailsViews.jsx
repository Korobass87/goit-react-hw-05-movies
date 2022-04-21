
import { useState, useEffect, lazy, Suspense } from 'react'
import { NavLink, useRouteMatch, Route, useLocation, useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { apiId } from '../AppBar/API/API'
// import ReviewsView from './ReviewsView'
import image from '../Image/image.png'
const ReviewsView =lazy(()=>import('../Views/ReviewsView'))



export default function MovieDetailsViel() {
  const[movie, setMovie]=useState(null)
  const URL = useRouteMatch()
  const location = useLocation()
  const history = useHistory()
  console.log(location);  

    const movId = useParams()
   

    useEffect(()=>{
      apiId(movId.movieId)
        .then(({data})=>{setMovie(data)})
    }, [movId.movieId])
  
  function onBack() {
    
      history.push(location?.state?.from ?? '/')
      
    }
    
  

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
          
          </div>

          <div>
          <button type='button' onClick={onBack}>BACK</button>
            <Route exact path={`${URL.url}`}>

              <NavLink exact to={{
                pathname: `${URL.url}/review`,
                state: {...location.state}
              }}>
              
                <button>SHOW REVIEW</button>
              </NavLink>
          </Route>
          </div>
          

        
    </section>
            
          <Route path={`${URL.url}/review`}>
            <Suspense fallback={<h2>LOADING</h2>}>
              <ReviewsView id={movId.movieId}/>
            </Suspense>  
          </Route>
  </>)
  )
}
