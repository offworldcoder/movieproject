// https://api.themoviedb.org/3/movie/550?api_key=62e4fae7b0382a564334c5e8af61ea86

const API_KEY = "62e4fae7b0382a564334c5e8af61ea86"
const URL = "https://api.themoviedb.org/3/movie/550?api_key=62e4fae7b0382a564334c5e8af61ea86"
const TRENDING_URL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
const POSTER_URL = `/74xTEgt7R36Fpooo50r9T25onhq.jpg`

// https://api.themoviedb.org/t/p/w440_and_h660_face/74xTEgt7R36Fpooo50r9T25onhq.jpg

// https://www.themoviedb.org/t/p/w440_and_h660_face/okNgwtxIWzGsNlR3GsOS0i0Qgbn.jpg


// batman https://www.themoviedb.org/t/p/w440_and_h660_face/74xTEgt7R36Fpooo50r9T25onhq.jpg

const getTrendingMovies = async () => {
  console.log(`Using trending url "${TRENDING_URL}"`);
  const results = await fetch(TRENDING_URL);

  console.log(`TRENDING RESULTS results ${JSON.stringify(results)}`);

  return results.json();
}

export { getTrendingMovies }

/*
async _init() {
    let data = await getPerson();
    let people = [];

    data.results.map(person => {
      people.push({
        text: {
          text: person.name,
        }
      });
    })

    this.tag('Results').patch({
      children: people
    });
  }*/