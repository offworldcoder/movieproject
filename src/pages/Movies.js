import { Lightning, Utils } from "@lightningjs/sdk";
import { getTrendingMovies } from "../lib/API";
import { Carousel } from "../components/Carousel";
import { WonkeyCarousel } from "../components/WonkeyCarousel";
import { CarouselItem } from "../components/CarouselItem";
import { MovieDetails } from "./MovieDetails";

export class Movies extends Lightning.Component {
  static _template() {
    return {
      w: 1920,
      h: 1080,
      Background: {
        w: 1920,
        h: 1080,
        src: Utils.asset("images/background.jpeg")
      },
      // Carousel: {
      //   y: 300,
      //   type: Carousel
      // },
      Carousel: {
        y: 300,
        type: WonkeyCarousel
      }
    }
  }

  _getFocused() {
    return this.tag("Carousel");
  }

  async _init() {
    let data = await getTrendingMovies();
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

    this.tag("Carousel").setupItemPositions();
    this.tag("Carousel").updateItemFocusAfterMovingRight();
  }

  truncatedTitle(title, max) {
    if (title.length <= max) {
      return title;
    }
    return title.substring(0, max);
  }
}