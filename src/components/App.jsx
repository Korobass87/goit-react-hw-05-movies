import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import MovieDetailsViel from "Views/MovieDetailsViews";
import SearchMoviesView from "Views/SearchMoviesView";
import AppBar from "../AppBar/AppBar";
import HomeVievs from "../Views/HomeViews";

export const App = () => {



  return (
    <>
    <AppBar/>

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
    </>
  )
};
