import { Lightning, Router, Utils } from "@lightningjs/sdk";
import { getMovieDetails } from "../lib/API";

export class MovieDetails extends Lightning.Component {
  static _template() {
    return {
      Background: {
        w: 1920,
        h: 1080,
      },
      Details: {
        x: 20,
        y: 720,
        w: 1880,
        h: 350,
        rect: true,
        colorTop: 0xaa111111,
        colorBottom: 0x00111111,
        Title: {
          x: 500,
          y: 20,
          text: {
            text: this.bindProp('title')
          }
        },
        ReleaseDate: {
          x: 1860,
          y: 20,
          mountX: 1.0,
          text: {
            text: this.bindProp('releaseDate')
          }
        },
        Overview: {
          x: 20,
          y: 80,
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
      },
      Arrow: {
        x: 1860,
        y: 1000,
        mount: 1.0,
        src: Utils.asset("images/right-arrow.png")
      }
    }
  }

  _init() {
    this.tag('Background').on('txLoaded', () => {
      console.log('texture loaded: ' + this.tag('Image').src)
      this.tag('Background').patch({
        smooth: {
          alpha: [1, { duration: 0.1 }]
        }
      });
    })
  }

  _disable() {
    this.tag("Background").patch({
      src: '',
      alpha: 0.000001
    });
  }

  set params(args) {
    console.log(`MovieDetails: movieId is ${JSON.stringify(args)}`);
    console.log(`MovieDetails: movieId is ${args.movieId}`);
    this.movieId = args.movieId;

    // this.tag("Background").alpha = 0.000001;
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

  _handleRight() {
    console.log("_handleRight");
    Router.navigate(`similarmovies/${this.movieId}`);
  }
}