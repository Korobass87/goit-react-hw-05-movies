import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import "../style/HomeVievs.css"

// import MovieDetailsViel from "Views/MovieDetailsViews";
// import SearchMoviesView from "Views/SearchMoviesView";
import AppBar from "../AppBar/AppBar";
// import HomeVievs from "../Views/HomeViews";
const MovieDetailsViel = lazy(() => import('../Views/MovieDetailsViews.jsx'))
const SearchMoviesView = lazy(() => import('../Views/SearchMoviesView'))
const HomeVievs =lazy(()=>import('../Views/HomeViews'))

export const App = () => {



  return (
    <>
    <AppBar/>
      <Suspense fallback={<h2>LOADING....</h2>}>

      <Switch>

    <Route exact path="/">
        <HomeVievs/>
    </Route>
    
    <Route exact path="/movies">
        <SearchMoviesView/>
    </Route>

   

    <Route path="/movies/:movieId">
        <MovieDetailsViel/>
    </Route>



        </Switch>
        </Suspense>
    </>
  )
};
