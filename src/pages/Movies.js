import { Lightning, Utils } from "@lightningjs/sdk";
import { getTrendingMovies } from "../lib/API";
import { Carousel } from "../components/Carousel";

export class Movies extends Lightning.Component {
  static _template() {
    return {
      Background: {
        w: 1920,
        h: 1080,
        color: Utils.asset("images/background.jpeg")
      },
      Carousel: {
        type: Carousel
      }
    }
  }

  async _init() {
    let data = await getTrendingMovies();
    let movies = [];

    data.results.map(movie => {
      movies.push({
        text: {
          text: movie.title,
        }
      });
    })

    console.log(`movies ${JSON.stringify(movies)}`);

    this.tag("Carousel").patch({
      movies: movies
    });
  }
}