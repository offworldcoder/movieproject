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
      Results: {
        rect: true,
        color: 0xff111111,
        flex: {
          direction: 'column',
          padding: 20,
        },
        children: []
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

    this.tag("Results").patch({
      children: movies
    });

    // this.tag('Results').patch({
    //   children: movies
    // });
  }
}