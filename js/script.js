const global = {
  currentPage: window.location.pathname,
  search: {
    type: "",
    term: "",
    page: 1,
    totalPages: 1,
  },
  api: {
    apiKey: "621cfb335fa28cf9d3189a4e71af2ef0",
    apiUrl: "https://api.themoviedb.org/3/",
  },
};

/*
    MOVIES PAGE
*/

//List Popular Movies
async function listPopularMovies() {
  const res = await fetchData("movie/popular");
  const result = res.results;
  result.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
      <a href="movie-details.html?id=${movie.id}">
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

//MOVIE DETAIL
async function showMovieDetail() {
  const movieId = window.location.search.split("=")[1];
  const movieDetails = await fetchData(`movie/${movieId}`);
  const detailsDiv = document.querySelector("#movie-details");

  detailsDiv.innerHTML = `
  <div class="details-top">
          <div>
          ${
            movieDetails.poster_path
              ? `<img
                  src="https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}"
                  class="card-img-top"
                  alt="${movieDetails.title}"
                />`
              : `<img
                  src="images/no-image.jpg"
                  class="card-img-top"
                  alt="Movie Title"
              />`
          }
          </div>
          <div>
            <h2>${movieDetails.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movieDetails.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${movieDetails.release_date}</p>
            <p>
             ${movieDetails.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${movieDetails.genres
                .map((genre) => `<li>${genre.name}</li>`)
                .join("")}
            </ul>
            <a href="${
              movieDetails.homepage
            }" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $${addCommas(
              movieDetails.budget
            )}</li>
            <li><span class="text-secondary">Revenue:</span> $${addCommas(
              movieDetails.revenue
            )}</li>
            <li><span class="text-secondary">Runtime:</span> ${
              movieDetails.runtime
            } minutes</li>
            <li><span class="text-secondary">Status:</span> ${
              movieDetails.status
            }</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">
          ${movieDetails.production_companies
            .map((company) => company.name)
            .join(", ")}
          </div>
        </div>
  `;
  backdropImage(movieDetails.backdrop_path, "movie");
}

// NOW PLAYING MOVIES
async function displayNowPlaying() {
  const res = await fetchData("movie/now_playing");
  const nowPlaying = res.results;
  const div = document.querySelector(".swiper-wrapper");

  nowPlaying.forEach((movie) => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("swiper-slide");
    cardDiv.innerHTML = `
    
            
              <a href="movie-details.html?id=${movie.id}">
                 ${
                   movie.poster_path
                     ? `<img
                        src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
                        alt="${movie.title}"
                        />`
                     : `<img
                        src="images/no-image.jpg"
                        alt="Movie Title"
                        />`
                 }
              </a>
              <h4 class="swiper-rating">
                <i class="fas fa-star text-secondary"></i> ${
                  movie.vote_average
                } / 10
              </h4>
            
          
    `;
    div.appendChild(cardDiv);
    initSlider();
  });
}

/*
   TV SHOWS
*/
//List Populat TV Shows
async function listPopularShows() {
  const res = await fetchData("tv/popular");
  const result = res.results;
  result.forEach((show) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
      <a href="tv-details.html?id=${show.id}">
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

//SHOW DETAIL
async function showTVDetail() {
  const showId = window.location.search.split("=")[1];
  const showDetails = await fetchData(`tv/${showId}`);
  const detailsDiv = document.querySelector("#show-details");

  detailsDiv.innerHTML = `
    <div class="details-top">
            <div>
            ${
              showDetails.poster_path
                ? `<img
                    src="https://image.tmdb.org/t/p/w500/${showDetails.poster_path}"
                    class="card-img-top"
                    alt="${showDetails.name}"
                  />`
                : `<img
                    src="images/no-image.jpg"
                    class="card-img-top"
                    alt="${showDetails.name}"
                />`
            }
            </div>
            <div>
              <h2>${showDetails.name}</h2>
              <p>
                <i class="fas fa-star text-primary"></i>
                ${showDetails.vote_average.toFixed(1)} / 10
              </p>
              <p class="text-muted">First Air Date: ${
                showDetails.first_air_date
              }</p>
              <p>
               ${showDetails.overview} 
              </p>
              <h5>Genres</h5>
              <ul class="list-group">
                ${showDetails.genres
                  .map((genre) => `<li>${genre.name}</li>`)
                  .join("")}
              </ul>
              <a href="${
                showDetails.homepage
              }" target="_blank" class="btn">Visit Show Homepage</a>
            </div>
          </div>
          <div class="details-bottom">
            <h2>Show Info</h2>
            <ul>
              <li><span class="text-secondary">Episodes:</span> ${
                showDetails.number_of_episodes
              }</li>
              <li><span class="text-secondary">Seasons:</span> ${
                showDetails.number_of_seasons
              }</li>
              <li><span class="text-secondary">Runtime:</span> ${
                showDetails.episode_run_time
              } minutes</li>
              <li><span class="text-secondary">Status:</span> ${
                showDetails.status
              }</li>
            </ul>
            <h4>Production Companies</h4>
            <div class="list-group">
            ${showDetails.production_companies
              .map((company) => company.name)
              .join(", ")}
            </div>
          </div>
    `;
  backdropImage(showDetails.backdrop_path, "show");
}

/*
  GENERAL FUNCTIONS
*/

//Fetch data via endpoint
async function fetchData(endpoint) {
  const API_KEY = global.api.apiKey;
  const API_URL = global.api.apiUrl;
  showSpinner();

  const res = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}`);
  const results = await res.json();
  hideeSpinner();
  return results;
}

//Set search Params
function setSearchParams() {
  const querrystr = window.location.search;
  const urlParams = new URLSearchParams(querrystr);
  global.search.term = urlParams.get("search-term");
  global.search.type = urlParams.get("type");

  if (global.search.term !== "" && global.search.term !== null) {
    searchResults();
  } else {
    showAlert("Enter Search Item");
  }
}

//Search data request
async function searchData() {
  const API_KEY = global.api.apiKey;
  const API_URL = global.api.apiUrl;

  const res = await fetch(
    `${API_URL}search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}&page=${global.search.page}`
  );
  const results = await res.json();
  hideeSpinner();
  return results;
}

//Search
async function searchResults() {
  const { results, total_pages, total_results, page } = await searchData();
  if (results.length === 0) {
    showAlert("No Items Found", "error");
    return;
  } else {
    results.forEach((item) => {
      const div = document.createElement("div");
      div.classList.add("card");
      div.innerHTML = `
      
            <a href="tv-details.html?id=${item.id}">
            ${
              item.poster_path
                ? `<img
                    src="https://image.tmdb.org/t/p/w500/${item.poster_path}"
                    class="card-img-top"
                    alt="${
                      global.search.type === "movie" ? item.title : item.name
                    }"
                  />`
                : `<img
                    src="images/no-image.jpg"
                    class="card-img-top"
                    alt="${
                      global.search.type === "movie" ? item.title : item.name
                    }"
                />`
            }
            </a>
            <div class="card-body">
              <h5 class="card-title">${
                global.search.type === "movie" ? item.title : item.name
              }</h5>
              <p class="card-text">
                <small class="text-muted">Release:  ${
                  global.search.type === "movie"
                    ? item.release_date
                    : item.first_air_date
                }</small>
              </p>
            </div>
          
      `;
      document.querySelector("#search-results").appendChild(div);
    });
  }

  global.search.page = page;
  global.search.totalPages = total_pages;

  document.getElementById("search-results-heading").innerHTML = `
  <h2>Showing ${results.length} of ${total_results} Results for ${global.search.term}</h2>
  `;
  document.querySelector("#pagination").innerHTML = `
  <div class="pagination">
   <button class="btn btn-primary" id="prev">Prev</button>
   <button class="btn btn-primary" id="next">Next</button>
   <div class="page-counter">Page ${global.search.page} of ${global.search.totalPages}</div>
   </div>
   `;

  if (global.search.page === 1) {
    document.querySelector("#prev").disabled = true;
  }

  if (global.search.page === global.search.totalPages) {
    document.querySelector("#next").disabled = true;
  }

  document.querySelector("#next").addEventListener("click", () => {
    global.search.page++;
    document.querySelector("#search-results").innerHTML = "";
    searchResults();
  });

  document.querySelector("#prev").addEventListener("click", () => {
    global.search.page--;
    document.querySelector("#search-results").innerHTML = "";
    searchResults();
  });
}

//Back Drop Image
function backdropImage(url, type) {
  const div = document.createElement("div");
  div.classList.add("background-styles");
  div.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${url})`;
  if (type === "movie") {
    document.getElementById("movie-details").appendChild(div);
  } else {
    document.getElementById("show-details").appendChild(div);
  }
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

//Show Alert
function showAlert(message, className) {
  const div = document.createElement("div");
  div.classList.add("alert", className);
  div.appendChild(document.createTextNode(message));

  document.getElementById("alert").appendChild(div);
  setTimeout(() => div.remove(), 3000);
}

//Initialize slider
function initSlider() {
  const swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
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

//Add Commas
function addCommas(number) {
  return number.toString().replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, "$&,");
}

//Initialize function
function init() {
  switch (global.currentPage) {
    case "/":
    case "/index.html":
      listPopularMovies();
      displayNowPlaying();
      break;

    case "/shows.html":
    case "/shows":
      listPopularShows();
      break;

    case "/movie-details.html":
      showMovieDetail();
      break;

    case "/tv-details.html":
      showTVDetail();
      break;

    case "/search.html":
      setSearchParams();

      break;
  }
  highlightActive();
}

document.addEventListener("DOMContentLoaded", init);
