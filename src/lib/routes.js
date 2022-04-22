import { Boot } from '../pages/Boot'
import { NotFound } from '../pages/NotFound'
import { Movies } from '../pages/Movies'
import { MovieDetails } from '../pages/MovieDetails'

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
    // {
    //   path: 'about/:someData',
    //   component: About
    // }
  ],
}