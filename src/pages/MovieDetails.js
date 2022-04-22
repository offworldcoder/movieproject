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
      }
    }
  }

  set params(args) {
    console.log(`MovieDetails: movieId is ${JSON.stringify(args)}`);
    console.log(`MovieDetails: movieId is ${args.movieId}`);

    const movieDetails = getMovieDetails(args.movieId);
    console.log(`MovieDetails: movieDetails ${JSON.stringify(movieDetails)}`)
    const backgroundPosterURL = `https://www.themoviedb.org/t/p/w1066_and_h600_bestv2${movieDetails.backdrop_path}`
    // this.tag("Background").patch({
    //   src: backgroundPosterURL
    // })
  }
  //  https://www.themoviedb.org/t/p/w1066_and_h600_bestv2/egoyMDLqCxzjnSrWOz50uLlJWmD.jpg
}