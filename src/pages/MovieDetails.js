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
      Details: {
        x: 20,
        y: 720,
        w: 1880,
        h: 360,
        rect: true,
        colorTop: 0xaa111111,
        colorBottom: 0x00111111,
        // flex: {
        //   direction: 'row',
        //   padding: 20,
        // },
        // children: [
        //   {
        Title: {
          x: 20,
          y: 80,
          text: {
            text: this.bindProp('title')
          }
        },
        ReleaseDate: {
          x: 20,
          y: 140,
          text: {
            text: this.bindProp('releaseDate')
          }
        },
        Overview: {
          x: 20,
          y: 200,
          w: 1800,
          h: 380,
          text: {
            text: this.bindProp('overview')
          }
        }
      },
      MovieImage: {
        x: 20,
        y: 100,
        w: 500,
        h: 620,
        rect: true,
        color: 0xaa111111,
        Image: {
          x: 20,
          y: 20,
          w: 450,
          src: this.bindProp("movieImageURL")
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
    const moveImageURL = `https://image.tmdb.org/t/p/w440_and_h660_face${movieDetails.poster_path}`
    const backgroundPosterURL = `https://image.tmdb.org/t/p/w1066_and_h600_bestv2${movieDetails.backdrop_path}`
    this.tag("Background").patch({
      src: backgroundPosterURL
    });
    this.title = `${movieDetails.title}`;
    this.releaseDate = `Release Date: ${movieDetails.release_date}`;
    this.overview = movieDetails.overview;
    this.movieImageURL = moveImageURL;
  }
}