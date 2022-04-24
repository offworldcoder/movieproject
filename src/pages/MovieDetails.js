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
        y: 680,
        w: 1920 - 80,
        h: 330,
        rect: true,
        colorTop: 0xaa111111,
        colorBottom: 0x00111111,
        flex: {
          direction: 'column',
          padding: 20,
        },
        Title: {
          text: {
            text: this.bindProp('title')
          }
        },
        ReleaseDate: {
          text: {
            fontSize: 25,
            text: this.bindProp('releaseDate')
          }
        },
        Overview: {
          w: 1800,
          padding: 40,
          text: {
            fontSize: 30,
            lineHeight: 40,
            text: this.bindProp('overview')
          }
        }
      },
      MovieImage: {
        x: 20,
        y: 100,
        w: 395,
        h: 580,
        rect: true,
        color: 0xaa111111,
        Image: {
          x: 20,
          y: 20,
          w: 254 * 1.4,
          h: 381 * 1.4,
          src: this.bindProp("movieImageURL")
        }
      },
      Arrow: {
        x: 1860,
        y: 1050,
        w: 111,
        h: 111,
        mount: 1.0,
        src: Utils.asset("images/right-arrow.png")
      }
    }
  }

  _init() {
    this.arrow = this.tag("Arrow");
    this.tag('Background').on('txLoaded', () => {
      console.log('texture loaded: ' + this.tag('Image').src)
      this.tag('Background').patch({
        smooth: {
          alpha: [1, { duration: 0.1 }]
        }
      });
    })

    this.arrow.animation({
      duration: 2,
      repeat: -1,
      actions: [
        {
          p: 'x',
          v: { 0: 1860, 0.5: 1880, 1: 1860 },
        },
        {
          p: 'scale',
          v: { 0: 1.0, 0.5: 1.2, 1: 1.0 }
        }
      ]
    }).start();
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