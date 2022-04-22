import { Lightning } from "@lightningjs/sdk";
import { getMovieDetails } from "../lib/API";

export class MovieDetails extends Lightning.Component {
  static _template() {
    return {
      Background: {
        rect: true,
        w: 1920,
        h: 1080,
        color: 0xffffff00
      },
      Title: {
        x: 50,
        y: 50,
        text: {
          text: ''
        }
      }
    }
  }

  set params(args) {
    console.log(`MovieDetails: movieId is ${JSON.stringify(args)}`);
    console.log(`MovieDetails: movieId is ${args.movieId}`);

    this.useTheDetails(args.movieId);
  }

  async useTheDetails(movieId) {
    const movieDetails = await getMovieDetails(movieId);
    console.log(`MovieDetails: movieDetails ${JSON.stringify(movieDetails)}`)
    const backgroundPosterURL = `https://image.tmdb.org/t/p/w1066_and_h600_bestv2${movieDetails.backdrop_path}`
    this.tag("Background").patch({
      Title: {
        text: {
          text: movieDetails.title,
        }
      },
      src: backgroundPosterURL
    })
  }
}