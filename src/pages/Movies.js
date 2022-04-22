import { Lightning, Utils } from "@lightningjs/sdk";
import { getTrendingMovies } from "../lib/API";
import { Carousel } from "../components/Carousel";
import { CarouselItem } from "../components/CarouselItem";

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
      Carousel: {
        y: 300,
        type: Carousel
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
        title: movie.title,
        imageUrl: `https://image.tmdb.org/t/p/w440_and_h660_face${movie.poster_path}`
      });
    })

    console.log(`movies ${JSON.stringify(movies)}`);

    this.tag("Carousel").patch({
      movies: movies
    });
  }
}