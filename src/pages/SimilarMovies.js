import { Lightning } from "@lightningjs/sdk";
import { getSimilarMovies } from "../lib/API";
import { CarouselItem } from "../components/CarouselItem";
import { WonkeyCarousel } from "../components/WonkeyCarousel";
import { getMovieDetails } from "../lib/API";

export class SimilarMovies extends Lightning.Component {
  static _template() {
    return {
      Background: {
        w: 1920,
        h: 1080,
      },
      Details: {
        w: 600,
        h: 800,
      },
      Label: {
        x: 20,
        y: 20,
        text: {
          fontSize: 80,
          textColor: 0xff000000,
          highlightOffset: 1,
          shadow: true,
          shadowColor: 0xffffffff,
          text: this.bindProp("title")
        }
      },
      Carousel: {
        y: 150,
        type: WonkeyCarousel
      }
    }
  }

  _getFocused() {
    return this.tag("Carousel");
  }

  set params(args) {
    console.log(`SimilarMovies: movieId is ${JSON.stringify(args)}`);
    console.log(`SimilarMovies: movieId is ${args.movieId}`);
    this.movieId = args.movieId;
    this.useTheDetails(args.movieId);
  }

  async useTheDetails(movieId) {
    console.log
    let data = await getSimilarMovies(movieId);
    let movies = [];

    data.results.map(movie => {
      movies.push({
        type: CarouselItem,
        title: this.truncatedTitle(movie.title, 18),
        imageUrl: `https://image.tmdb.org/t/p/w440_and_h660_face${movie.poster_path}`,
        movieId: movie.id
      });
    })

    console.log(`movies ${JSON.stringify(movies)}`);

    const movieDetails = await getMovieDetails(movieId);
    console.log(`MovieDetails: movieDetails ${JSON.stringify(movieDetails)}`)
    const backgroundPosterURL = `https://image.tmdb.org/t/p/w1066_and_h600_bestv2${movieDetails.backdrop_path}`
    this.tag("Background").patch({
      src: backgroundPosterURL
    });
    this.title = `Movies similar to ${movieDetails.title}`;

    this.tag("Carousel").patch({
      movies: movies
    });

    this.tag("Carousel").setupItemPositionsAdvanced();
    this.tag("Carousel").updateItemFocusAfterMovingRight();
  }

  truncatedTitle(title, max) {
    if (title.length <= max) {
      return title;
    }
    return title.substring(0, max);
  }
}