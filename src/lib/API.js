// https://api.themoviedb.org/3/movie/550?api_key=62e4fae7b0382a564334c5e8af61ea86

const API_KEY = "62e4fae7b0382a564334c5e8af61ea86"
const DETAILS_URL = `https://api.themoviedb.org/3/movie/`
const TRENDING_URL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`

// https://www.themoviedb.org/t/p/w1066_and_h600_bestv2/iQFcwSGbZXMkeyKrxbPnwnRo5fl.jpg
const getTrendingMovies = async () => {
  console.log(`Using trending url "${TRENDING_URL}"`);
  const results = await fetch(TRENDING_URL);
  console.log(`TRENDING RESULTS results ${JSON.stringify(results)}`);
  return results.json();
}

const buildMovieDetailsURL = (movieId) => {
  const url = DETAILS_URL + movieId + `?api_key=${API_KEY}`;
  return url;
}

const buildSimilarMoviesURL = (movieId) => {
  const url = DETAILS_URL + movieId + `/similar?api_key=${API_KEY}`;
  return url;
}

const getMovieDetails = async (movieId) => {
  const detailsURL = buildMovieDetailsURL(movieId);
  console.log(`getMovieDetails: Using movie details url "${detailsURL}"`);
  const results = await fetch(detailsURL);
  console.log(`getMovieDetails: results ${JSON.stringify(results)}`);
  return results.json();
}

const getSimilarMovies = async (movieId) => {
  const detailsURL = buildSimilarMoviesURL(movieId);
  console.log(`getSimilarMovies: Using similar movies url "${detailsURL}"`);
  const results = await fetch(detailsURL);
  console.log(`getSimilarMovies: results ${JSON.stringify(results)}`);
  return results.json();
}

export { getTrendingMovies, getMovieDetails, getSimilarMovies }