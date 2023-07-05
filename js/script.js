const global = {
  currentPage: window.location.pathname,
};

/*
    HOME PAGE
*/

//List Popular Movies
async function listPopularMovies() {
  const results = await fetchData("movie/popular");

  results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
    <a href="movie-details.html?${movie.id}">
    ${
      movie.poster_path
        ? `<img
            src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
            class="card-img-top"
            alt="${movie.title}"
          />`
        : `<img
            src="images/no-image.jpg"
            class="card-img-top"
            alt="Movie Title"
        />`
    }
    </a>
    <div class="card-body">
        <h5 class="card-title">${movie.title}</h5>
        <p class="card-text">
        <small class="text-muted">Release: ${movie.release_date}</small>
        </p>
    </div>
    `;
    document.querySelector("#popular-movies").appendChild(div);
  });
}

/*
   TV SHOWS
*/
//List Populat TV Shows
async function listPopularShows() {
  const results = await fetchData("tv/popular");

  results.forEach((show) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
      <a href="movie-details.html?${show.id}">
      ${
        show.poster_path
          ? `<img
              src="https://image.tmdb.org/t/p/w500/${show.poster_path}"
              class="card-img-top"
              alt="${show.name}"
            />`
          : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="Movie Title"
          />`
      }
      </a>
      <div class="card-body">
          <h5 class="card-title">${show.name}</h5>
          <p class="card-text">
          <small class="text-muted">Release: ${show.first_air_date}</small>
          </p>
      </div>
      `;
    document.querySelector("#popular-shows").appendChild(div);
  });
}

/*
  GENERAL FUNCTIONS
*/

//Fetch data via endpoint
async function fetchData(endpoint) {
  const API_KEY = "621cfb335fa28cf9d3189a4e71af2ef0";
  const API_URL = "https://api.themoviedb.org/3/";
  showSpinner();

  const res = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}`);
  const { results } = await res.json();
  hideeSpinner();
  return results;
}

//Focus navbar elements
function highlightActive() {
  const lists = document.querySelectorAll(".nav-link");
  lists.forEach((list) => {
    if (list.getAttribute("href") === global.currentPage) {
      list.classList.add("active");
    }
  });
}

//Show spinner
function showSpinner() {
  document.querySelector(".spinner").classList.add("show");
}

//Hide Spinner

function hideeSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}

//Initialize function
function init() {
  switch (global.currentPage) {
    case "/":
    case "/index.html":
      listPopularMovies();
      break;

    case "/shows.html":
      listPopularShows();
      break;

    case "/movie-details.html":
      console.log("Movie-Details");
      break;

    case "/tv-details.html":
      console.log("TV-Details");
      break;

    case "/search.html":
      console.log("Search");
      break;
  }
  highlightActive();
}

document.addEventListener("DOMContentLoaded", init);
