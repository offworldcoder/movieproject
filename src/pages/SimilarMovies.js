import { Lightning } from "@lightningjs/sdk";
import { getSimilarMovies } from "../lib/API";
import { CarouselItem } from "../components/CarouselItem";
import { WonkeyCarousel } from "../components/WonkeyCarousel";
export class SimilarMovies extends Lightning.Component {
  static _template() {
    return {
      Background: {
        rect: true,
        w: 1920,
        h: 1080,
        color: 0xffffff00
      },
      Carousel: {
        y: 100,
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