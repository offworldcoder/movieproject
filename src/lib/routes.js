import { Boot } from '../pages/Boot'
import { NotFound } from '../pages/NotFound'
import { Movies } from '../pages/Movies'
import { MovieDetails } from '../pages/MovieDetails'
import { SimilarMovies } from '../pages/SimilarMovies'

export default {
  routes: [
    {
      path: '$',
      component: Boot
    },
    {
      path: '*',
      component: NotFound
    },
    {
      path: 'home',
      component: Movies
    },
    {
      path: 'details/:movieId',
      component: MovieDetails
    },
    {
      path: 'similarmovies/:movieId',
      component: SimilarMovies
    }
    // {
    //   path: 'about/:someData',
    //   component: About
    // }
  ],
}